import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MyStem } from '../objects/MyStem.js';
import { MyReceptacle } from '../objects/MyReceptacle.js';
import { MyPollen } from '../objects/MyPollen.js';

export class MyFlower extends CGFobject {
    constructor(scene, flowerOuterRadius, petalCount, petalColor, heartRadius, heartColor, stemRadius, stemHeight, stemColor, leafColor, petalRotationAngle, receptacleTexture, petalTexture, stemTexture, position) {
        super(scene);
        this.stemHeight = stemHeight;
        this.receptacleTexture = receptacleTexture;
        this.petalTexture = petalTexture;
        this.stemTexture = stemTexture;
        this.stem = new MyStem(this.scene, stemRadius, stemHeight, stemColor, leafColor, this.stemTexture, this.petalTexture, petalColor);
        this.receptacle = new MyReceptacle(this.scene, flowerOuterRadius, petalCount, petalColor, heartRadius, heartColor, leafColor, petalRotationAngle, this.receptacleTexture, this.petalTexture);
        this.pollen = new MyPollen(this.scene, 14, 14); // Create a new MyPollen object
        this.position = position; // Add the position property
    }

    display() {
        // Display the stem
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -this.stem.stemRadius * 1);
        this.stem.display();
        this.scene.popMatrix();
    
        // Display the receptacle
        this.scene.pushMatrix();
        this.scene.translate(0, this.stem.totalHeight, 0); 
        this.scene.rotate(-Math.PI / 2, 1, 0, 0); 
        this.receptacle.display();
        this.scene.popMatrix();

        // Display the pollen if it exists
        if (this.hasPollen()) {
            this.scene.pushMatrix();
            this.scene.translate(0, this.stem.totalHeight + 0.2, 0);
            this.scene.scale(0.3, 0.3, 0.3);
            this.pollen.display();
            this.scene.popMatrix();
        }
    }

    getStemHeight() {
        return this.stem.totalHeight;
    }

    // Check if the flower has pollen
    hasPollen() {
        return this.pollen !== null;
    }

    // Pick the pollen from the flower
    pickPollen() {
        let pollen = this.pollen;
        this.pollen = null; // Remove the pollen from the flower
        return pollen; // Return the pollen
    }
}