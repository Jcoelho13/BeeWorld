import {CGFobject} from '../lib/CGF.js';

export class MyTriangle extends CGFobject{
    constructor(scene) {
		super(scene);
		this.initBuffers();
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

        this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();

    }
}