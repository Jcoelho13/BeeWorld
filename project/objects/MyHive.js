import { CGFobject, CGFappearance, CGFtexture } from '../../lib/CGF.js';
import { MyCube } from '../geometrics/MyCube.js';
import { MyHiveTop } from './MyHiveTop.js';

export class MyHive extends CGFobject{
    constructor(scene) {
        super(scene);

        this.cube = new MyCube(scene, [0, 0, 0]);
        this.hiveTop = new MyHiveTop(scene);

        this.initMaterials();
    }

    initMaterials() {
        // Initialize the materials and textures for the different parts of the bee

        // Wood material 
        this.woodMaterial = new CGFappearance(this.scene);
        this.woodMaterial.setAmbient(0.8, 0.8, 0.8, 0.0);
        this.woodMaterial.setDiffuse(0.95, 0.95, 0.95, 0.0);
        this.woodMaterial.setSpecular(0.5, 0.5, 0.5, 0.0);
        this.woodMaterial.setTexture(new CGFtexture(this.scene, "./images/woodTex.jpg"));
        this.woodMaterial.setTextureWrap('REPEAT', 'REPEAT');

        // Metal material
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

        // Wooden Top Parts
        // Right part
        this.scene.pushMatrix();
        this.scene.translate(0.6, 0.7, 0);
        this.scene.scale(0.2, 0.4, 1);
        this.woodMaterial.apply();
        this.cube.display();
        this.scene.popMatrix();
        // Left part
        this.scene.pushMatrix();
        this.scene.translate(-0.6, 0.7, 0);
        this.scene.scale(0.2, 0.4, 1);
        this.woodMaterial.apply();
        this.cube.display();
        this.scene.popMatrix();
        // Front part
        this.scene.pushMatrix();
        this.scene.translate(0, 0.7, 0.6);
        this.scene.scale(1.4, 0.4, 0.2);
        this.woodMaterial.apply();
        this.cube.display();
        this.scene.popMatrix();
        // Back part
        this.scene.pushMatrix();
        this.scene.translate(0, 0.7, -0.6);
        this.scene.scale(1.4, 0.4, 0.2);
        this.woodMaterial.apply();
        this.cube.display();
        this.scene.popMatrix();

        // Third stack
        this.scene.pushMatrix();
        this.scene.translate(0, 0.8, 0);
        this.scene.scale(1/1.2, 1, 1/1.2);
        this.woodMaterial.apply();
        this.hiveTop.display();
        this.scene.popMatrix();

        // Second Stack
        this.scene.pushMatrix();
        this.scene.translate(0, 0.625, 0);
        this.scene.scale(1, 0.25, 1);
        this.woodMaterial.apply();
        this.cube.display();
        this.scene.popMatrix();

        //First Stack
        this.scene.pushMatrix();
        this.woodMaterial.apply();
        this.cube.display();
        this.scene.popMatrix();

    }
}