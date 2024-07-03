import {CGFobject} from '../../lib/CGF.js';
import { MyTriangle } from "../geometrics/MyTriangle.js";
import { MyCylinder } from '../geometrics/MyCylinder.js';

export class MyLeaf extends CGFobject {
    constructor(scene, slices, stacks, radius, color) {
        super(scene);
        this.cylinder = new MyCylinder(scene, slices, stacks, [0, 0.5, 0]);
        this.triangle1 = new MyTriangle(scene, radius, color);
        this.triangle2 = new MyTriangle(scene, radius, color);
    }
    display() {
        // Display the leaf
        // Cylinder representing the leaf's stem
        this.scene.pushMatrix();
        this.scene.translate(0, 1.4, 0); 
        this.scene.scale(0.1, 1.5, 0.1); 
        this.cylinder.display();
        this.scene.popMatrix();

        // Two triangles representing the leaf's blade
        this.scene.pushMatrix();
        this.scene.translate(0.35, 1.9, 0); 
        this.scene.rotate(0.314159, 0, 0, 1);
        this.triangle1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.35, 1.9, 0); 
        this.scene.rotate(-0.314159, 0, 0, 1);
        this.scene.rotate(Math.PI, 0, 1, 0); 
        this.triangle2.display();
        this.scene.popMatrix();
    }
}