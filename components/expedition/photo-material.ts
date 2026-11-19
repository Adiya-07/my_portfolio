import * as THREE from 'three'

const vertexShader = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragmentShader = /* glsl */ `
uniform sampler2D map;
uniform vec3 hazeColor;
uniform float haze;
uniform float opacity;
uniform vec3 tint;
uniform float tintAmt;
uniform float sideFeather;
uniform float bottomFade;
uniform float topFeather;
uniform float exposure;
varying vec2 vUv;

void main() {
  vec4 c = texture2D(map, vUv);
  float side = smoothstep(0.0, sideFeather, vUv.x) * smoothstep(1.0, 1.0 - sideFeather, vUv.x);
  float bottom = smoothstep(0.0, bottomFade, vUv.y);
  float top = smoothstep(1.0, 1.0 - topFeather, vUv.y);
  vec3 col = c.rgb * exposure;
  float h = clamp(haze * (0.55 + 0.45 * (1.0 - vUv.y)), 0.0, 1.0);
  col = mix(col, hazeColor, h);
  col = mix(col, col * tint, tintAmt);
  float a = c.a * side * bottom * top * opacity;
  if (a < 0.003) discard;
  gl_FragColor = vec4(col, a);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`

export type PhotoUniforms = {
  map: { value: THREE.Texture }
  hazeColor: { value: THREE.Color }
  haze: { value: number }
  opacity: { value: number }
  tint: { value: THREE.Color }
  tintAmt: { value: number }
  sideFeather: { value: number }
  bottomFade: { value: number }
  topFeather: { value: number }
  exposure: { value: number }
}

export function createPhotoMaterial(
  map: THREE.Texture,
  opts: { sideFeather?: number; bottomFade?: number; topFeather?: number } = {},
) {
  const uniforms: PhotoUniforms = {
    map: { value: map },
    hazeColor: { value: new THREE.Color('#bed4ea') },
    haze: { value: 0 },
    opacity: { value: 1 },
    tint: { value: new THREE.Color(1, 0.6, 0.45) },
    tintAmt: { value: 0 },
    sideFeather: { value: opts.sideFeather ?? 0.07 },
    bottomFade: { value: opts.bottomFade ?? 0.24 },
    topFeather: { value: opts.topFeather ?? 0.015 },
    exposure: { value: 1 },
  }
  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    toneMapped: false,
  })
  return { material, uniforms }
}

export function prepareTexture(tex: THREE.Texture, gl: THREE.WebGLRenderer) {
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy())
  tex.minFilter = THREE.LinearMipmapLinearFilter
  tex.generateMipmaps = true
  tex.needsUpdate = true
  return tex
}
