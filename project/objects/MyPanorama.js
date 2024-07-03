import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MySphere } from "./MySphere.js";

export class MyPanorama extends CGFobject {

    constructor(scene, slices, stacks, texture, inverted = false) {
        super(scene);
        this.sphere = new MySphere(scene, slices, stacks, inverted);
        this.material = new CGFappearance(scene);
        this.material.setTexture(texture);
    }


    display() {
        this.scene.pushMatrix();
        this.scene.scale(200, 200, 200);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.material.apply();
        this.sphere.display();
        this.scene.popMatrix();
    }
}
