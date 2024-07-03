import { CGFobject } from '../../lib/CGF.js';

export class MyQuad extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            -0.5, -0.5, 0,  // Vertex 0
             0.5, -0.5, 0,  // Vertex 1
            -0.5,  0.5, 0,  // Vertex 2
             0.5,  0.5, 0,  // Vertex 3
            -0.5, -0.5, 0,  // Vertex 0 again for the other side
             0.5, -0.5, 0,  // Vertex 1 again for the other side
            -0.5,  0.5, 0,  // Vertex 2 again for the other side
             0.5,  0.5, 0   // Vertex 3 again for the other side
        ];

        this.indices = [
            0, 1, 2,  // First triangle, one side
            1, 3, 2,  // Second triangle, one side
            4, 6, 5,  // First triangle, other side
            5, 6, 7   // Second triangle, other side
        ];

        this.normals = [
            0, 0, 1,  // Normal of Vertex 0
            0, 0, 1,  // Normal of Vertex 1
            0, 0, 1,  // Normal of Vertex 2
            0, 0, 1,  // Normal of Vertex 3
            0, 0, -1, // Normal of Vertex 0 for the other side
            0, 0, -1, // Normal of Vertex 1 for the other side
            0, 0, -1, // Normal of Vertex 2 for the other side
            0, 0, -1  // Normal of Vertex 3 for the other side
        ];

        this.texCoords = [
            0, 1,  // Texture Coordinate of Vertex 0
            1, 1,  // Texture Coordinate of Vertex 1
            0, 0,  // Texture Coordinate of Vertex 2
            1, 0,  // Texture Coordinate of Vertex 3
            0, 1,  // Texture Coordinate of Vertex 0 for the other side
            1, 1,  // Texture Coordinate of Vertex 1 for the other side
            0, 0,  // Texture Coordinate of Vertex 2 for the other side
            1, 0   // Texture Coordinate of Vertex 3 for the other side
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}