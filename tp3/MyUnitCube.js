import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
            0.5, -0.5, 0.5, //0 vértice inferior direito da face frontal
            0.5, -0.5, -0.5, //1 vértice inferior direito da face traseira
            -0.5, -0.5, -0.5, //2 vértice inferior esquerdo da face traseira
            -0.5, -0.5, 0.5, //3 vértice inferior esquerdo da face frontal

            0.5, 0.5, 0.5, //4 vértice superior direito da face frontal
            0.5, 0.5, -0.5, //5 vértice superior direito da face traseira
            -0.5, 0.5, -0.5, //6 vértice superior esquerdo da face traseira
            -0.5, 0.5, 0.5, //7 vértice superior esquerdo da face frontal
            
            0.5, -0.5, 0.5, //0 vértice inferior direito da face frontal - 8
            0.5, -0.5, -0.5, //1 vértice inferior direito da face traseira - 9
            0.5, 0.5, -0.5, //5 vértice superior direito da face traseira - 10
            0.5, 0.5, 0.5, //4 vértice superior direito da face frontal - 11
            
            -0.5, -0.5, 0.5, //3 vértice inferior esquerdo da face frontal -12
            -0.5, -0.5, -0.5, //2 vértice inferior esquerdo da face traseira -13
            -0.5, 0.5, -0.5, //6 vértice superior esquerdo da face traseira -14
            -0.5, 0.5, 0.5, //7 vértice superior esquerdo da face frontal -15
            
            0.5, -0.5, 0.5, //0 vértice inferior direito da face frontal - 16
            0.5, 0.5, 0.5, //4 vértice superior direito da face frontal - 17
            -0.5, 0.5, 0.5, //7 vértice superior esquerdo da face frontal - 18
            -0.5, -0.5, 0.5, //3 vértice inferior esquerdo da face frontal - 19
            
            0.5, -0.5, -0.5, //1 vértice inferior direito da face traseira - 20
            0.5, 0.5, -0.5, //5 vértice superior direito da face traseira - 21
            -0.5, 0.5, -0.5, //6 vértice superior esquerdo da face traseira - 22
            -0.5, -0.5, -0.5 //2 vértice inferior esquerdo da face traseira -23
		];

		//Counter-clockwise reference of vertices
		this.indices = [
            19, 16, 17, //face frontal
            17, 18, 19,
            8, 9, 10, //face direita
            10, 11, 8,
            20, 23, 22, //face traseira
            22, 21, 20,
            13, 12, 15, //face esquerda    
            15, 14, 13,
            7, 4, 5, //face superior
            5, 6, 7,
            2, 1, 0, //face inferior
            0, 3, 2
		];

            this.normals = [

                  0, -1, 0,
                  0, -1, 0,
                  0, -1, 0,
                  0, -1, 0,

                  0, 1, 0,
                  0, 1, 0,
                  0, 1, 0,
                  0, 1, 0,

                  1, 0, 0,
                  1, 0, 0,
                  1, 0, 0,
                  1, 0, 0,

                  -1, 0, 0,
                  -1, 0, 0,
                  -1, 0, 0,
                  -1, 0, 0,

                  0, 0, 1,
                  0, 0, 1,
                  0, 0, 1,
                  0, 0, 1,

                  0, 0, -1,
                  0, 0, -1,
                  0, 0, -1,
                  0, 0, -1
                  
            ];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

