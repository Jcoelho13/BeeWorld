import { CGFobject } from '../../lib/CGF.js';
import { MySphere } from '../geometrics/MySphere.js';
import { MyCylinder } from '../geometrics/MyCylinder.js';

export class MyLeg extends CGFobject {
    constructor(scene) {
        super(scene);

        this.upperLeg = new MyCylinder(scene, 10, 10, [0, 0, 0]);
        this.lowerLeg = new MyCylinder(scene, 10, 10, [0, 0, 0]);
        this.joint = new MySphere(scene, 10, 10, [0, 0, 0]);
    }

    display() {
        // Display the upper leg
        this.scene.pushMatrix();
        this.scene.translate(0, 3, 0);
        this.scene.scale(0.05, 0.05, 0.3); 
        this.upperLeg.display();
        this.scene.popMatrix();

        // Display the joint
        this.scene.pushMatrix();
        this.scene.translate(0, 3, 0);
        this.scene.translate(0, 0, 0.33); 
        this.scene.scale(0.05, 0.05, 0.05); 
        this.joint.display();
        this.scene.popMatrix();

        // Display the lower leg
        this.scene.pushMatrix();
        this.scene.translate(0, 3, 0);
        this.scene.translate(0, 0, 0.35); 
        this.scene.rotate(Math.PI / 6, 1, 0, 0); 
        this.scene.scale(0.05, 0.05, 0.4); 
        this.lowerLeg.display();
        this.scene.popMatrix();
    }
}