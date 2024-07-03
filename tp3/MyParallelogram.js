import {CGFobject} from '../lib/CGF.js';

export class MyParallelogram extends CGFobject{
    constructor(scene) {
		super(scene);
		this.initBuffers();
	}

    initBuffers() {
		this.vertices = [
			0, 0, 0,	//0
			1, 1, 0,	//1
			2, 0, 0,    //2
            3, 1, 0,    //3
            0, 0, 0,	//4
			1, 1, 0,	//5
			2, 0, 0,    //6
            3, 1, 0,    //7
		];

        this.indices = [
            // front face
            0, 2, 1,
            2, 3, 1,
            // back face
            4, 5, 6,
            6, 5, 7,
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