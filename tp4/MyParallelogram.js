import {CGFobject} from '../lib/CGF.js';
import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture } from "../lib/CGF.js";

export class MyParallelogram extends CGFobject{
    constructor(scene) {
		super(scene);
		this.initBuffers();
        this.initMaterials();
	}

    initMaterials() {
        this.parallelogramMaterial = new CGFappearance(this.scene);
        this.parallelogramMaterial.setAmbient(1, 1, 0, 1);
        this.parallelogramMaterial.setDiffuse(1, 1, 0, 1);
        this.parallelogramMaterial.setSpecular(1, 1, 1, 1);
        this.parallelogramMaterial.setShininess(10.0);
        this.parallelogramMaterial.loadTexture('images/tangram.png');
        this.parallelogramMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

    initBuffers() {
		this.vertices = [
            0, 0, 0,	//0
            2, 0, 0,	//1
            3, 1, 0,	//2
            1, 1, 0,	//3
            0, 0, 0,	//4
            2, 0, 0,	//5
            3, 1, 0,	//6
            1, 1, 0,	//7
        ];

        this.indices = [
            0, 2, 1,
            2, 0, 3,
            4, 5, 6,
            4, 6, 7
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
            0.25, 0.75,
            0.5, 1,
            1, 1,
            0.75, 0.75,
            0.25, 0.75,
            0.5, 1,
            1, 1,
            0.75, 0.75,
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();

    }
}