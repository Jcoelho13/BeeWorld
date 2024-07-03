import { CGFobject, CGFappearance, CGFtexture } from '../../lib/CGF.js';
import { MyCube } from '../geometrics/MyCube.js';

export class MyHiveTop extends CGFobject{
    constructor(scene) {
        super(scene);

        this.hiveStack = new MyCube(scene, [0, 0, 0]);

        this.pollen = null;
        // Initialize the materials and textures
        this.initMaterials();
    }

    initMaterials() {
        // Initialize the materials and textures for the different parts of the bee

        // Wood material 
        this.woodMaterial = new CGFappearance(this.scene);
        this.woodMaterial.setAmbient(0.8, 0.8, 0.8, 0.0);
        this.woodMaterial.setDiffuse(0.95, 0.95, 0.95, 0.0);
        this.woodMaterial.setSpecular(0.5, 0.5, 0.5, 0.0);
        this.woodMaterial.setTexture(new CGFtexture(this.scene, "./images/woodTex2.jpg"));
        this.woodMaterial.setTextureWrap('REPEAT', 'REPEAT');

        //Metal material
        this.metalMaterial = new CGFappearance(this.scene);
        this.metalMaterial.setAmbient(0.8, 0.8, 0.8, 0.0);
        this.metalMaterial.setDiffuse(0.95, 0.95, 0.95, 0.0);
        this.metalMaterial.setSpecular(0.5, 0.5, 0.5, 0.0);
        this.metalMaterial.setTexture(new CGFtexture(this.scene, "./images/metalTex.jpg"));
        this.metalMaterial.setTextureWrap('REPEAT', 'REPEAT');

        // Honney material
        this.honneyMaterial = new CGFappearance(this.scene);
        this.honneyMaterial.setAmbient(0.8, 0.8, 0.8, 0.0);
        this.honneyMaterial.setDiffuse(0.95, 0.95, 0.95, 0.0);
        this.honneyMaterial.setSpecular(0.5, 0.5, 0.5, 0.0);
        this.honneyMaterial.setTexture(new CGFtexture(this.scene, "./images/honneyTex.jpg"));
        this.honneyMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {
        // Display the different parts of the bee

        // Wooden slats
        // First slate
        this.scene.pushMatrix();
        this.scene.translate(-0.55, 0.075, 0);
        this.scene.scale(0.1, 0.05, 1.2);
        this.woodMaterial.apply();
        this.hiveStack.display();
        this.scene.popMatrix();
        // Second slate
        this.scene.pushMatrix();
        this.scene.translate(-0.33, 0.075, 0);
        this.scene.scale(0.1, 0.05, 1.2);
        this.woodMaterial.apply();
        this.hiveStack.display();
        this.scene.popMatrix();
        // Third slate
        this.scene.pushMatrix();
        this.scene.translate(-0.11, 0.075, 0);
        this.scene.scale(0.1, 0.05, 1.2);
        this.woodMaterial.apply();
        this.hiveStack.display();
        this.scene.popMatrix();
        // Fourth slate
        this.scene.pushMatrix();
        this.scene.translate(0.11, 0.075, 0);
        this.scene.scale(0.1, 0.05, 1.2);
        this.woodMaterial.apply();
        this.hiveStack.display();
        this.scene.popMatrix();
        // Fifth slate
        this.scene.pushMatrix();
        this.scene.translate(0.33, 0.075, 0);
        this.scene.scale(0.1, 0.05, 1.2);
        this.woodMaterial.apply();
        this.hiveStack.display();
        this.scene.popMatrix();
        // Sixth slate
        this.scene.pushMatrix();
        this.scene.translate(0.55, 0.075, 0);
        this.scene.scale(0.1, 0.05, 1.2);
        this.woodMaterial.apply();
        this.hiveStack.display();
        this.scene.popMatrix();

        // Hive stack
        this.scene.pushMatrix();
        this.scene.scale(1.2, 0.1, 1.2);
        this.honneyMaterial.apply();
        this.hiveStack.display();
        this.scene.popMatrix();
        
        if (this.hasPollen()) {
            this.scene.pushMatrix();
            // translate to the top of the hive
            this.scene.translate(0, 0.5, 0);
            this.pollen.display();
            this.scene.popMatrix();
        }
    }

    hasPollen() {
        return this.pollen !== null;
    }

    addPollen(pollen) {
        this.pollen = pollen;
    }

}