import { CGFobject, CGFappearance } from '../../lib/CGF.js';

export class MyCone extends CGFobject {
    constructor(scene, slices, stacks, color) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.color = color;
        this.initBuffers();
        this.initAppearance();
    }

    initAppearance() {
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(this.color[0], this.color[1], this.color[2], 1);
        this.appearance.setDiffuse(this.color[0], this.color[1], this.color[2], 1);
        this.appearance.setSpecular(1, 1, 1, 1);
        this.appearance.setShininess(10.0);
    }

    display() {
        super.display();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = []; 
    
        for (let i = 0; i <= this.stacks; i++) {
            for (let j = 0; j <= this.slices; j++) {
                let angle = (j * 2 * Math.PI) / this.slices;
    
                let x = Math.cos(angle) * (1 - i / this.stacks);
                let y = Math.sin(angle) * (1 - i / this.stacks);
                let z = i / this.stacks;
    
                // Vertices
                this.vertices.push(x, y, z);
    
                // Normals
                let normal = [x, y, 0];
                this.normals.push(...normal);
    
                // Texture Coords
                let u = j / this.slices;
                let v = i / this.stacks;
                this.texCoords.push(u, v); 

                if (i > 0 && j > 0) {
                    // Indices
                    let current = i * (this.slices + 1) + j;
                    let previous = current - 1;
                    let above = (i - 1) * (this.slices + 1) + j;
                    let abovePrevious = above - 1;

                    this.indices.push(abovePrevious, above, current);
                    this.indices.push(abovePrevious, current, previous);
                }
            }
        }

        // Add the top face
        for (let i = 0; i < this.slices; i++) {
            let current = this.stacks * (this.slices + 1) + i;
            let next = current + 1;
            this.indices.push(current, next, this.vertices.length / 3);
        }

        // Add the bottom face
        for (let i = 0; i < this.slices; i++) {
            let current = i;
            let next = current + 1;
            this.indices.push(current, this.vertices.length / 3, next);
        }

        // Add the center of the top and bottom faces
        this.vertices.push(0, 0, 0);
        this.vertices.push(0, 0, 1);
        this.normals.push(0, 0, -1);
        this.normals.push(0, 0, 1);

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}