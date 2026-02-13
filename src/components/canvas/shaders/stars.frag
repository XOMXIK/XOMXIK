varying float vBrightness;

void main() {
  float dist = length(gl_PointCoord - vec2(0.5));
  if (dist > 0.5) discard;

  float alpha = smoothstep(0.5, 0.05, dist) * vBrightness;

  // Slight blue-white tint, brighter stars are whiter
  vec3 color = mix(vec3(0.75, 0.8, 1.0), vec3(1.0, 1.0, 1.0), vBrightness);

  gl_FragColor = vec4(color, alpha);
}
