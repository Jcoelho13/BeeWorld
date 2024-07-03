import {CGFobject} from '../lib/CGF.js';
import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture } from "../lib/CGF.js";

export class MyTriangleSmall extends CGFobject{
    constructor(scene) {
		super(scene);
		this.initBuffers();
        this.initMaterials();
	}

    initMaterials() {
        // red triangle
        this.redTriangleMaterial = new CGFappearance(this.scene);
        this.redTriangleMaterial.setAmbient(1, 0, 0, 1);
        this.redTriangleMaterial.setDiffuse(1, 0, 0, 1);
        this.redTriangleMaterial.setShininess(10.0);
		this.redTriangleMaterial.loadTexture('images/tangram.png');
		this.redTriangleMaterial.setTextureWrap('REPEAT', 'REPEAT');

        // pink triangle
        this.pinkTriangleMaterial = new CGFappearance(this.scene);
        this.pinkTriangleMaterial.setAmbient(0.7, 0.4, 1, 1);
        this.pinkTriangleMaterial.setDiffuse(0.7, 0.4, 1, 1);
        this.pinkTriangleMaterial.loadTexture('images/tangram.png');
        this.pinkTriangleMaterial.setTextureWrap('REPEAT', 'REPEAT');
	}

    initBuffers() {
		this.vertices = [
			-1, 0, 0,	//0
			0, 1, 0,	//1
			1, 0, 0,	//2
			-1, 0, 0,	//3
			0, 1, 0,	//4
			1, 0, 0,	//5
		];

        this.indices = [
            0, 2, 1,
			3, 4, 5
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

        this.redTexCoords = [
            0.5, 0.5,
            0.25, 0.75,
            0.75, 0.75,
            0.5, 0.5,
            0.25, 0.75,
            0.75, 0.75
        ];

        this.pinkTexCoords = [
                0, 0.5,
                0, 1,
                0.5, 1,
                0, 0.5,
                0, 1,
                0.5, 1
        ];
		
        this.texCoords = this.redTexCoords;
        this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();

    }
    setRedTexCoords() {
        this.texCoords = this.redTexCoords;
        this.updateTexCoordsGLBuffers();
    }

    setPinkTexCoords() {
        this.texCoords = this.pinkTexCoords;
        this.updateTexCoordsGLBuffers();
    }
}