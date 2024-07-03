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
            -0.5, 0.5, 0.5 //7 vértice superior esquerdo da face frontal
		];

		//Counter-clockwise reference of vertices
		this.indices = [
            3, 0, 4, //face frontal
            4, 7, 3,
            0, 1, 5, //face direita
            5, 4, 0,
            1, 2, 6, //face traseira
            6, 5, 1,
            2, 3, 7, //face esquerda    
            7, 6, 2,
            7, 4, 5, //face superior
            5, 6, 7,
            2, 1, 0, //face inferior
            0, 3, 2
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

