// MyCircle.js
import { CGFobject, CGFappearance, CGFtexture } from '../../lib/CGF.js';

export class MyCircle extends CGFobject {
    constructor(scene, slices, radius, color, texture) {
        super(scene);
        this.slices = slices;
        this.radius = radius;
        this.color = color;
        this.texture = texture;
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
        this.normals = [];
        this.indices = [];
        this.texCoords = [];

        for (let i = 0; i <= this.slices; i++) {
            let angle = (i * 2 * Math.PI) / this.slices;

            let x = this.radius * Math.cos(angle);
            let y = this.radius * Math.sin(angle);

            // Vertices for both sides
            this.vertices.push(x, y, 0);
            this.vertices.push(x, y, 0);

            // Normals for both sides
            this.normals.push(0, 0, 1);
            this.normals.push(0, 0, -1);
            
            // Texture coordinates for both sides
            let u = 0.5 + 0.5 * Math.cos(angle);
            let v = 0.5 + 0.5 * Math.sin(angle);
            this.texCoords.push(u, v);
            this.texCoords.push(u, v);

            if (i > 0) {
                // Indices for both sides
                let current = i * 2;
                let previous = current - 2;

                this.indices.push(0, current, previous);
                this.indices.push(1, previous + 1, current + 1);
            }
        }

        // Close the circle for both sides
        this.indices.push(0, 2, this.slices * 2);
        this.indices.push(1, this.slices * 2 + 1, 3);

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}