import { CGFobject, CGFappearance } from '../../lib/CGF.js';

export class MyCylinder extends CGFobject {
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
    
    
                let x = Math.cos(angle);
                let y = Math.sin(angle);
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
    
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}