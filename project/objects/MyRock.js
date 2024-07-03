import { CGFobject } from '../../lib/CGF.js';

export class MyRock extends CGFobject {

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
        this.texCoords = [];

        for (let stack = 0; stack <= this.stacks; stack++) {
            let theta = stack * Math.PI / this.stacks;
            let sinTheta = Math.sin(theta);
            let cosTheta = Math.cos(theta);

            for (let slice = 0; slice <= this.slices; slice++) {
                let phi = slice * 2 * Math.PI / this.slices;
                let sinPhi = Math.sin(phi);
                let cosPhi = Math.cos(phi);

                // Define the basic sphere vertices
                let x = cosPhi * sinTheta;
                let y = -cosTheta;
                let z = sinPhi * sinTheta;

                // Modify the vertices to create irregularities
                let scale = 0.2; // Adjust the scale of the irregularities
                x += (Math.random() - 0.5) * scale;
                y += (Math.random() - 0.5) * scale;
                z += (Math.random() - 0.5) * scale;

                this.vertices.push(x, y, z);

                // Normals remain the same as sphere normals
                this.normals.push(x, y, z);

                // Texture coordinates remain the same
                let u = 1 - (slice / this.slices);
                let v = 1 - (stack / this.stacks);
                this.texCoords.push(u, v);
            }
        }

        for (let stack = 0; stack < this.stacks; stack++) {
            for (let slice = 0; slice < this.slices; slice++) {
                let first = (stack * (this.slices + 1)) + slice;
                let second = first + this.slices + 1;

                this.indices.push(first, second, first + 1);
                this.indices.push(second, second + 1, first + 1);
            }
        }

        for(let stack = 0; stack < this.stacks; stack++){
            let first = (stack * (this.slices + 1));
            let second = first + this.slices + 1;

            this.indices.push(first, first + this.slices, second);
            this.indices.push(second, first + this.slices, second + this.slices);
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

}
