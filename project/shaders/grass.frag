#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D uSampler; // new
varying vec2 vTextureCoord; // new
varying vec3 vNormal;
varying vec3 vLightWeighting;

void main(void) {
    vec4 grassColor = vec4(0.0, 0.5, 0.0, 1.0);
    vec4 textureColor = texture2D(uSampler, vTextureCoord); // new
    gl_FragColor = vec4(grassColor.rgb * vLightWeighting * textureColor.rgb, grassColor.a); // modified
}