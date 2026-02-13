attribute float aSize;
attribute float aBrightness;
attribute float aTwinkleSpeed;
uniform float uTime;
uniform vec2 uMouse;
uniform float uScrollY;
varying float vBrightness;

void main() {
  vBrightness = aBrightness;

  vec3 pos = position;

  // Parallax: offset based on mouse position, depth-dependent
  float depthFactor = (pos.z + 50.0) / 100.0;
  pos.x += uMouse.x * depthFactor * 0.4;
  pos.y += uMouse.y * depthFactor * 0.4;

  // Gentle floating motion
  pos.y += sin(uTime * 0.15 + pos.x * 0.5) * 0.08;
  pos.x += cos(uTime * 0.12 + pos.z * 0.3) * 0.05;

  // Scroll: move into scene
  pos.z += uScrollY * 3.0;

  // Twinkle: modulate size over time
  float twinkle = sin(uTime * aTwinkleSpeed + pos.x * 10.0) * 0.5 + 0.5;
  float finalSize = aSize * (0.6 + twinkle * 0.4);

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = finalSize * (300.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
