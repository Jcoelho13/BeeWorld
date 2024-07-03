import { CGFobject, CGFappearance } from "../../lib/CGF.js";

export class MyTriangle extends CGFobject{
    constructor(scene, radius, color, petalTexture) {
        super(scene);
        this.radius = radius;
        this.color = color;
        this.petalTexture = petalTexture;
        this.initBuffers();
        this.initAppearance();
    }

    initAppearance() {
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(this.color[0], this.color[1], this.color[2], 1);
        this.appearance.setDiffuse(this.color[0], this.color[1], this.color[2], 1);
        this.appearance.setSpecular(1, 1, 1, 1);
        this.appearance.setShininess(10.0);
    }

    display() {
        super.display();
    }

    initBuffers() {
        let widthFactor = 0.65; // Adjust this value to change the width of the triangles
        this.vertices = [
            0, this.radius, 0,    //0
            -this.radius * widthFactor, -this.radius, 0,  //1
            this.radius * widthFactor, -this.radius, 0,   //2
            0, this.radius, 0,    //3
            -this.radius * widthFactor, -this.radius, 0,  //4
            this.radius * widthFactor, -this.radius, 0,   //5
        ];

        this.indices = [
            0, 1, 2,
            3, 5, 4
        ];

        this.normals = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,

            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1
        ];

        this.texCoords = [
            0.5, 1,
            0, 0,
            1, 0,
            0.5, 1,
            0, 0,
            1, 0
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}