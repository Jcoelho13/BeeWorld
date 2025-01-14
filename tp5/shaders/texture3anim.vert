attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;
uniform float scaleFactor;

varying vec2 vTextureCoord;
uniform sampler2D uSampler2;

uniform float normScale;

void main() {
    vec3 offset = vec3(0.0, 0.0, 0.0);
    
    vTextureCoord = aTextureCoord;

    if (texture2D(uSampler2, vec2(0.0, 0.1) + vTextureCoord).b > 0.5)
        offset = aVertexNormal * normScale * 0.1 * sin(timeFactor);

    float xOffset = scaleFactor * sin(timeFactor);
    vec3 position = vec3(aVertexPosition.x + xOffset, aVertexPosition.y, aVertexPosition.z);

    gl_Position = uPMatrix * uMVMatrix * vec4(position + offset, 1.0);
}