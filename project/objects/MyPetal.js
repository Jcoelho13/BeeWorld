import {CGFobject} from '../../lib/CGF.js';
import { MyTriangle } from "../geometrics/MyTriangle.js";

export class MyPetal extends CGFobject {
    constructor(scene, flowerOuterRadius, petalColor, rotationAngle, petalTexture) {
        super(scene);
        this.flowerOuterRadius = flowerOuterRadius;
        this.petalColor = petalColor;
        this.rotationAngle = rotationAngle;
        this.petalTexture = petalTexture;
        this.triangle1 = new MyTriangle(this.scene, this.flowerOuterRadius, this.petalColor, this.petalTexture);
        this.triangle2 = new MyTriangle(this.scene, this.flowerOuterRadius, this.petalColor, this.petalTexture);
    }
    display() {
        // Display the petal (two triangles)
        this.scene.pushMatrix();
        this.triangle1.display();
        this.scene.translate(0, -this.flowerOuterRadius, 0); 
        this.scene.rotate(this.rotationAngle, 1, 0, 0); 
        this.scene.translate(0, this.flowerOuterRadius, 0); 
        this.triangle2.display();
        this.scene.popMatrix();
    }
}