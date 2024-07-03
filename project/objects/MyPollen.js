import { CGFappearance, CGFtexture } from '../../lib/CGF.js';
import { MySphere } from '../geometrics/MySphere.js';

export class MyPollen extends MySphere {
    constructor(scene, slices, stacks) {
        super(scene, slices, stacks, [0, 0, 0]); 
        this.initAppearance();
    }

    initAppearance() {
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(0.8, 0.8, 0.8, 0.0);
        this.appearance.setDiffuse(0.95, 0.95, 0.95, 0.0);
        this.appearance.setSpecular(0.5, 0.5, 0.5, 0.0);
        this.appearance.setTexture(new CGFtexture(this.scene, "./images/pollenTex.jpg")); 
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
    }

    initBuffers() {
        super.initBuffers();

        // Increase the size of the pollen
        for (let i = 0; i < this.vertices.length; i += 3) {
            if (this.vertices[i + 1] > 0) {
                this.vertices[i + 1] *= 1.5;
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display() {
        this.appearance.apply();
        super.display();
    }
}