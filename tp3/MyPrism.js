import { CGFobject } from '../lib/CGF.js';

export class MyPrism extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        for (let i = 0; i < this.stacks; i++) {
            for (let j = 0; j < this.slices; j++) {
                let angle1 = (j * 2 * Math.PI) / this.slices;
                let angle2 = ((j + 1) * 2 * Math.PI) / this.slices;

                let x1 = Math.cos(angle1);
                let y1 = Math.sin(angle1);
                let x2 = Math.cos(angle2);
                let y2 = Math.sin(angle2);

                let z1 = i / this.stacks;
                let z2 = (i + 1) / this.stacks;

                // Vertices
                this.vertices.push(x1, y1, z1);
                this.vertices.push(x1, y1, z2);
                this.vertices.push(x2, y2, z2);
                this.vertices.push(x2, y2, z1);
                
                // Duplicate vertices for double-sided rendering
                this.vertices.push(x2, y2, z1); 
                this.vertices.push(x2, y2, z2);
                this.vertices.push(x1, y1, z2);
                this.vertices.push(x1, y1, z1);

                // Indices
                let index = i * this.slices * 8 + j * 8;
                this.indices.push(index, index + 1, index + 2);
                this.indices.push(index + 2, index + 3, index);
                this.indices.push(index + 4, index + 5, index + 6);
                this.indices.push(index + 6, index + 7, index + 4);

                // Normals
                let normal = [x1 + x2, y1 + y2, 0];
                this.normals.push(...normal, ...normal, ...normal, ...normal);
                this.normals.push(...normal, ...normal, ...normal, ...normal);
            }
        }

        // Normalize normals
        for (let i = 0; i < this.normals.length; i += 3) {
            let normal = [this.normals[i], this.normals[i + 1], this.normals[i + 2]];
            let length = Math.sqrt(normal[0] ** 2 + normal[1] ** 2 + normal[2] ** 2);
            this.normals[i] /= length;
            this.normals[i + 1] /= length;
            this.normals[i + 2] /= length;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
