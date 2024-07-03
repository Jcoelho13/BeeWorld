#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform float timeFactor;

void main() {
    vec4 color = texture2D(uSampler, vTextureCoord+vec2(timeFactor*0.005, timeFactor*0.005));
    vec4 filter = texture2D(uSampler2, vec2(0.0,0.1) + vTextureCoord);
    vec4 tint = vec4(0.8, 0.9, 1.0, 1.0); // Adjust this to change the hue of the blue color
    gl_FragColor = mix(color * tint, filter, 0.5);
}