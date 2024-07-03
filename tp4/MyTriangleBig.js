import {CGFobject} from '../lib/CGF.js';
import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture } from "../lib/CGF.js";


export class MyTriangleBig extends CGFobject{
    constructor(scene) {
		super(scene);
		this.initBuffers();
        this.initMaterials();
	}

    initMaterials() {
        // orange triangle
        this.orangeTriangleMaterial = new CGFappearance(this.scene);
        this.orangeTriangleMaterial.setAmbient(1, 0.6, 0.2, 5);
        this.orangeTriangleMaterial.setDiffuse(1, 0.6, 0.2, 5);
        this.orangeTriangleMaterial.setShininess(10.0);
		this.orangeTriangleMaterial.loadTexture('images/tangram.png');
		this.orangeTriangleMaterial.setTextureWrap('REPEAT', 'REPEAT');

        // blue triangle
        this.blueTriangleMaterial = new CGFappearance(this.scene);
        this.blueTriangleMaterial.setAmbient(0.2, 0.6, 1, 1);
        this.blueTriangleMaterial.setDiffuse(0.2, 0.6, 1, 1);
        this.blueTriangleMaterial.setShininess(10.0);
        this.blueTriangleMaterial.loadTexture('images/tangram.png');
        this.blueTriangleMaterial.setTextureWrap('REPEAT', 'REPEAT');
	}

    initBuffers() {
		this.vertices = [
			-2, 0, 0,	//0
			2, 0, 0,	//1
			0, 2, 0,	//2
			-2, 0, 0,	//3
			2, 0, 0,	//4
			0, 2, 0,	//5
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

        this.orangeTexCoords = [
			1, 0,
			0.5, 0.5,
			1, 1,
            1, 0,
			0.5, 0.5,
			1, 1
		];

        this.blueTexCoords = [
            1, 0,
            0, 0,
            0.5, 0.5,
            1, 0,
            0, 0,
            0.5, 0.5
        ];

        this.texCoords = this.orangeTexCoords;
        this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();

    }

    setOrangeTexCoords() {
        this.texCoords = this.orangeTexCoords;
        this.updateTexCoordsGLBuffers();
    }

    setBlueTexCoords() {
        this.texCoords = this.blueTexCoords;
        this.updateTexCoordsGLBuffers();
    }
}