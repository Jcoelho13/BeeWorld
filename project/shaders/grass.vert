attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float uTime;

varying vec3 vNormal;
varying vec3 vLightWeighting;
varying vec2 vTextureCoord;

void main(void) {
    vec3 displacedPosition = aVertexPosition;
    float windStrength = 0.3;  // Intensidade do balanço
    float windFrequency = 1.0;  // Frequência do balanço

    if (aVertexPosition.y > 0.0) {  // Apenas afeta a parte superior (folhas) do triângulo
        displacedPosition.x += windStrength * sin(windFrequency * uTime + aVertexPosition.z);
        displacedPosition.z += windStrength * cos(windFrequency * uTime + aVertexPosition.x);
    }

    vec4 mvPosition = uMVMatrix * vec4(displacedPosition, 1.0);
    gl_Position = uPMatrix * mvPosition;

    vNormal = vec3(uNMatrix * vec4(aVertexNormal, 1.0));
    vec3 lightDirection = normalize(vec3(0.0, 1.0, 1.0));
    float directionalLightWeighting = max(dot(normalize(vNormal), lightDirection), 0.0);
    vLightWeighting = vec3(0.1) + vec3(0.9) * directionalLightWeighting;  // ambient + diffuse
    vTextureCoord = aTextureCoord;
}
