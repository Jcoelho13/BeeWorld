import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MyCircle } from '../geometrics/MyCircle.js';
import { MyPetal } from '../objects/MyPetal.js';

export class MyReceptacle extends CGFobject {
    constructor(scene, flowerOuterRadius, petalCount, petalColor, heartRadius, heartColor, leafColor, petalRotationAngle, receptacleTexture, petalTexture) {
        super(scene);
        this.flowerOuterRadius = flowerOuterRadius;
        this.receptacleTexture = receptacleTexture;
        this.petalTexture = petalTexture;
        this.circle = new MyCircle(this.scene, 30, heartRadius, heartColor, this.receptacleTexture); 
        this.petals = [];
        this.petalColor = petalColor;
        this.initMaterials(petalColor);
        for (let i = 0; i < petalCount; i++) {
            // Generate a random angle between 110 and 180 degrees (1.91986 to 3.14159 radians)
            let rotationAngle = Math.random() * (3.14159 - 1.91986) + 1.91986;
            rotationAngle = 2 * Math.PI - rotationAngle;
            this.petals.push(new MyPetal(this.scene, flowerOuterRadius, petalColor, rotationAngle, this.petalTexture));
        }
    }

    initMaterials(petalColor) {
        this.receptacleMaterial = new CGFappearance(this.scene);
        this.receptacleMaterial.setAmbient(0.7, 0.7, 0.7, 1);
        this.receptacleMaterial.setDiffuse(0.6, 0.6, 0.6, 1);
        this.receptacleMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.receptacleMaterial.setShininess(10.0);
        this.receptacleMaterial.setTexture(this.receptacleTexture);
        this.receptacleMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.petalMaterial = new CGFappearance(this.scene);
        this.petalMaterial.setAmbient(petalColor[0], petalColor[1], petalColor[2], 1);
        this.petalMaterial.setDiffuse(petalColor[0], petalColor[1], petalColor[2], 1);
        this.petalMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.petalMaterial.setShininess(4.0);
        this.petalMaterial.setTexture(this.petalTexture);
        this.petalMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {
        // Display the circle in the center of the flower
        this.scene.pushMatrix();
        this.scene.scale(0.5, 0.5, 0.5); 
        this.receptacleMaterial.apply();
        this.circle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.5, 0.5, 0.5);
        // Display the petals around the circle
        for (let i = 0; i < this.petals.length; i++) {
            this.scene.pushMatrix();
            this.scene.rotate((2 * Math.PI * i) / this.petals.length, 0, 0, 1); 
            this.scene.translate(0, -(this.circle.radius + this.flowerOuterRadius), 0); 
            this.petalMaterial.apply();
            this.petals[i].display();
            this.scene.popMatrix();
        }
        this.scene.popMatrix();
    }
}