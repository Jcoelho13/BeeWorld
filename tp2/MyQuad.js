import { CGFobject } from '../lib/CGF.js';

export class MyQuad extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {

        this.vertices = [
            0.5, -0.5, 0,	//0 
            0.5, 0.5, 0,	    //1
            -0.5, 0.5, 0,	    //2
            -0.5, -0.5, 0,	    //3
        ];

        this.indices = [
            3, 0, 1,
            3, 1, 2
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}