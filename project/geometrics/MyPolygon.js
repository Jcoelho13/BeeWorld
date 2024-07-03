import { CGFobject, CGFappearance } from '../../lib/CGF.js';

export class MyPolygon extends CGFobject {
    constructor(scene, slices, color) {
        super(scene);
        this.slices = slices;
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

        // Center vertex
        this.vertices.push(0, 0, 0, 0, 0, 0); 
        this.normals.push(0, 0, 1, 0, 0, -1); 
        this.texCoords.push(0.5, 0.5, 0.5, 0.5); 

        // Outer vertices
        for(let i = 0; i <= this.slices; i++) {
            let theta = i * 2 * Math.PI / this.slices;
            let x = 0.5 * Math.cos(theta);
            let y = 0.5 * Math.sin(theta);

            // Adjust y to create wing shape
            if(i > this.slices / 2) {
                y *= 2;
            }

            // Vertices for both sides
            this.vertices.push(x, y, 0, x, y, 0); 

            // Normals for both sides
            this.normals.push(0, 0, 1, 0, 0, -1); 

            // Texture coordinates for both sides
            this.texCoords.push(0.5 + x / 2, 0.5 - y / 2, 0.5 + x / 2, 0.5 - y / 2); 

            if (i > 0) {
                // Indices for both sides
                let current = i * 2;
                let previous = current - 2;

                this.indices.push(0, current, previous);
                this.indices.push(1, previous + 1, current + 1);
            }
        }

        // Close the polygon for both sides
        this.indices.push(0, 2, this.slices * 2);
        this.indices.push(1, this.slices * 2 + 1, 3);

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}