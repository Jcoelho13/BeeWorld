import {CGFobject} from '../lib/CGF.js';
import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture } from "../lib/CGF.js";

export class MyTriangle extends CGFobject{
    constructor(scene) {
		super(scene);
		this.initBuffers();
        this.initMaterials();
	}

    initMaterials() {
        this.triangleMaterial = new CGFappearance(this.scene);
        this.triangleMaterial.setAmbient(1, 0.6, 0.8, 1);
        this.triangleMaterial.setDiffuse(1, 0.6, 0.8, 1);
        this.triangleMaterial.loadTexture('images/tangram.png');
		this.triangleMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

    initBuffers() {
		this.vertices = [
			-1, 1, 0,	//0
			-1, -1, 0,	//1
			1, -1, 0,	//2
			-1, 1, 0,	//3
			-1, -1, 0,	//4
			1, -1, 0,	//5
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
            0, 0.5,
            0, 1,
            0.5, 1,
            0, 0.5,
            0, 1,
            0.5, 1
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();

    }
}