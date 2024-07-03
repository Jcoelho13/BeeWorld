import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MyCylinder } from "../geometrics/MyCylinder.js";
import { MyLeaf } from "./MyLeaf.js";

export class MyStem extends CGFobject {
    constructor(scene, stemRadius, stemHeight, stemColor, leafColor, stemTexture, leafTexture, petalColor) {
        super(scene);
        this.stemRadius = stemRadius;
        this.stemHeight = stemHeight;
        this.cylinders = [];
        this.leaves = [];
        this.offsetsX = [];
        this.offsetsZ = [];
        this.heights = [];
        this.stemTexture = stemTexture;
        this.leafTexture = leafTexture;
        this.petalColor = petalColor;
        this.initMaterials(petalColor);
        this.leafRotations = []; 
        this.totalHeight = 0; 
        // Create the cylinders and leaves for the stem 
        for (let i = 0; i < this.stemHeight; i++) {
            this.cylinders.push(new MyCylinder(this.scene, 20, 1, stemColor)); // 20 slices, 1 stack
            this.leaves.push(new MyLeaf(this.scene, 10, 10, 1, leafColor)); // Create a leaf for each cylinder
            this.offsetsX.push((Math.random() - 0.5) * this.stemRadius*2); // Random offset for x-axis
            this.offsetsZ.push((Math.random() - 0.5) * this.stemRadius*2); // Random offset for z-axis
            this.heights.push(Math.random() * 2 + 0.5); // Random height for each cylinder, at least 0.5 to avoid very short cylinders
            this.totalHeight += this.heights[i]; // Update totalHeight
            this.leafRotations.push(Math.random() * 2 * Math.PI); // Store a random rotation angle for each leaf
        }
    }

    initMaterials(petalColor) {
        this.stemMaterial = new CGFappearance(this.scene);
        this.stemMaterial.setAmbient(0.7, 0.7, 0.7, 1);
        this.stemMaterial.setDiffuse(0.6, 0.6, 0.6, 1);
        this.stemMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.stemMaterial.setShininess(10.0);
        this.stemMaterial.setTexture(this.stemTexture);
        this.stemMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.leafStealMaterial = new CGFappearance(this.scene);
        this.leafStealMaterial.setAmbient(petalColor[0], petalColor[1], petalColor[2], 1);
        this.leafStealMaterial.setDiffuse(petalColor[0], petalColor[1], petalColor[2], 1);
        this.leafStealMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.leafStealMaterial.setShininess(4.0);
        this.leafStealMaterial.setTexture(this.leafTexture);
        this.leafStealMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }
    
    display() {
        // Display the stem and leaves for each cylinder in the stem 
        let cumulativeHeight = 0;
        for (let i = 0; i < this.stemHeight; i++) {
            this.scene.pushMatrix();
            this.scene.translate(this.offsetsX[i], cumulativeHeight, this.offsetsZ[i]); 
            this.scene.scale(this.stemRadius, this.heights[i], this.stemRadius); 
            this.scene.rotate(-Math.PI / 2, 1, 0, 0); 
            this.stemMaterial.apply();
            this.cylinders[i].display();
            this.scene.popMatrix();
            cumulativeHeight += this.heights[i];
    
            // Display the leaf at the junction of the cylinders
            if (i < this.stemHeight - 1) { // No leaf for the last cylinder
                this.scene.pushMatrix();
                this.scene.rotate(this.leafRotations[i], 0, 1, 0); 
                this.scene.translate(this.offsetsX[i], cumulativeHeight, this.offsetsZ[i]); 
                this.scene.rotate(Math.PI / 2, 1, 0, 0); 
                this.scene.scale(0.4, 0.4, 0.4);
                this.leafStealMaterial.apply();
                this.leaves[i].display();
                this.scene.popMatrix();
            }
        }
    }
}