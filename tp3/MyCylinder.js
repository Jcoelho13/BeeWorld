import { CGFobject } from '../lib/CGF.js';

export class MyCylinder extends CGFobject {
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
        
        for (let i = 0; i <= this.stacks; i++) {
            for (let j = 0; j <= this.slices; j++) {
                let angle = (j * 2 * Math.PI) / this.slices;
        
                let x = Math.cos(angle);
                let y = Math.sin(angle);
                let z = i / this.stacks;
        
                // Vertices
                this.vertices.push(x, y, z);
        
                // Normals
                let normal = [x, y, 0];
                this.normals.push(...normal);
        
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
        

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
