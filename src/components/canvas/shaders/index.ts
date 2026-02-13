export const starsVertexShader = /* glsl */ `
attribute float aSize;
attribute float aBrightness;
attribute float aTwinkleSpeed;
uniform float uTime;
uniform vec2 uMouse;
uniform float uScrollY;
uniform float uReveal;
varying float vBrightness;
varying float vReveal;

void main() {
  vBrightness = aBrightness;
  vReveal = uReveal;

  vec3 pos = position;

  float depthFactor = clamp((-pos.z) / 50.0, 0.0, 1.0);
  pos.x += uMouse.x * depthFactor * 1.5 * uReveal;
  pos.y += uMouse.y * depthFactor * 1.5 * uReveal;

  // Radial spread from mouse position
  vec2 screenPos = pos.xy;
  vec2 mouseWorld = uMouse * vec2(20.0, 12.0);
  vec2 diff = screenPos - mouseWorld;
  float dist = length(diff);
  float spread = smoothstep(6.0, 0.0, dist) * 0.25 * uReveal;
  vec2 pushDir = dist > 0.001 ? normalize(diff) : vec2(0.0);
  pos.xy += pushDir * spread * depthFactor;

  pos.y += sin(uTime * 0.15 + pos.x * 0.5) * 0.08;
  pos.x += cos(uTime * 0.12 + pos.z * 0.3) * 0.05;

  pos.z += uScrollY * 3.0;

  float twinkle = sin(uTime * aTwinkleSpeed + pos.x * 10.0) * 0.5 + 0.5;
  float finalSize = aSize * (0.6 + twinkle * 0.4) * uReveal;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = finalSize * (300.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
`;

export const starsFragmentShader = /* glsl */ `
varying float vBrightness;
varying float vReveal;

void main() {
  float dist = length(gl_PointCoord - vec2(0.5));
  if (dist > 0.5) discard;

  float alpha = smoothstep(0.5, 0.05, dist) * vBrightness * vReveal * 0.9;
  vec3 color = mix(vec3(0.7, 0.75, 1.0), vec3(0.95, 0.95, 1.0), vBrightness);

  gl_FragColor = vec4(color, alpha);
}
`;

export const nebulaVertexShader = /* glsl */ `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const nebulaFragmentShader = /* glsl */ `
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;
uniform float uReveal;
varying vec2 vUv;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p) {
  float f = 0.0;
  float w = 0.5;
  for (int i = 0; i < 5; i++) {
    f += w * snoise(p);
    p *= 2.0;
    w *= 0.5;
  }
  return f;
}

void main() {
  vec2 uv = vUv;

  // Cosmic colors
  float n1 = fbm(uv * 2.5 + uTime * 0.02);
  vec3 purple = vec3(0.22, 0.03, 0.35) * (n1 * 0.5 + 0.5);

  float n2 = fbm(uv * 2.0 + vec2(100.0) + uTime * 0.015);
  vec3 navy = vec3(0.03, 0.08, 0.28) * (n2 * 0.5 + 0.5);

  float n3 = fbm(uv * 3.0 + vec2(200.0) + uTime * 0.01);
  vec3 accent = vec3(0.15, 0.03, 0.28) * n3 * 0.4;

  // Radial vignette glow from center
  float centerDist = length(uv - vec2(0.5));
  float vignette = smoothstep(0.9, 0.1, centerDist);

  vec2 mouseUv = uMouse * 0.5 + 0.5;
  float mouseDist = length(uv - mouseUv);
  float mouseGlow = smoothstep(0.5, 0.0, mouseDist) * 0.06;

  vec3 cosmicColor = vec3(0.03, 0.02, 0.08);
  cosmicColor += purple * 0.8 * vignette;
  cosmicColor += navy * 0.5;
  cosmicColor += accent * vignette;
  cosmicColor += mouseGlow * vec3(0.25, 0.1, 0.4) * uReveal;

  // Mix from pure black to cosmic based on reveal
  vec3 color = mix(vec3(0.0), cosmicColor, uReveal);

  gl_FragColor = vec4(color, 1.0);
}
`;
