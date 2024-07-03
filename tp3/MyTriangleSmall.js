import {CGFobject} from '../lib/CGF.js';

export class MyTriangleSmall extends CGFobject{
    constructor(scene) {
		super(scene);
		this.initBuffers();
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

		//dummy comment to add tag

        this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();

    }
}