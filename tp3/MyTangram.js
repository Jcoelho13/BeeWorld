import {CGFobject, CGFappearance} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";

export class MyTangram extends CGFobject{

    constructor(scene) {
		super(scene);
        this.diamond = new MyDiamond(this.scene);
        this.triangle = new MyTriangle(this.scene);
        this.triangleBig = new MyTriangleBig(this.scene);
        this.triangleSmall = new MyTriangleSmall(this.scene);
        this.parallelogram = new MyParallelogram(this.scene);
        this.initMaterials();
	}

    initNormalVizBuffers(){}

    initBuffers(){}

    updateBuffers(){
        this.initBuffers();
        this.initNormalVizBuffers();
    }

    disableNormalViz(){
        this.diamond.disableNormalViz();
        this.triangle.disableNormalViz();
        this.triangleBig.disableNormalViz();
        this.triangleSmall.disableNormalViz();
        this.parallelogram.disableNormalViz();
    }

    initMaterials() {
        // green diamond
        this.diamondMaterial = new CGFappearance(this.scene);
        this.diamondMaterial.setAmbient(0, 1, 0, 1);
        this.diamondMaterial.setDiffuse(0, 1, 0, 1);
        this.diamondMaterial.setSpecular(1, 1, 1, 1);
        this.diamondMaterial.setShininess(10.0);

        // orange big triangle
        this.orangeTriangleMaterial = new CGFappearance(this.scene);
        this.orangeTriangleMaterial.setAmbient(1, 0.6, 0.2, 5);
        this.orangeTriangleMaterial.setDiffuse(1, 0.6, 0.2, 5);
        this.orangeTriangleMaterial.setSpecular(1, 1, 1, 1);
        this.orangeTriangleMaterial.setShininess(10.0);        

        // blue big triangle
        this.blueTriangleMaterial = new CGFappearance(this.scene);
        this.blueTriangleMaterial.setAmbient(0.2, 0.6, 1, 1);
        this.blueTriangleMaterial.setDiffuse(0.2, 0.6, 1, 1);
        this.blueTriangleMaterial.setSpecular(1, 1, 1, 1);
        this.blueTriangleMaterial.setShininess(10.0); 

        // yellow parallelogram
        this.yellowParallelogramMaterial = new CGFappearance(this.scene);
        this.yellowParallelogramMaterial.setAmbient(1, 0, 0, 1);
        this.yellowParallelogramMaterial.setDiffuse(1, 1, 0, 1);
        this.yellowParallelogramMaterial.setSpecular(1, 1, 1, 1);
        this.yellowParallelogramMaterial.setShininess(10.0);     

        // pink triangle
        this.pinkTriangleMaterial = new CGFappearance(this.scene);
        this.pinkTriangleMaterial.setAmbient(1, 0.6, 0.8, 1);
        this.pinkTriangleMaterial.setDiffuse(1, 0.6, 0.8, 1);
        this.pinkTriangleMaterial.setSpecular(1, 1, 1, 1);
        this.pinkTriangleMaterial.setShininess(10.0);       

        // red small triangle
        this.redTriangleMaterial = new CGFappearance(this.scene);
        this.redTriangleMaterial.setAmbient(1, 0, 0, 1);
        this.redTriangleMaterial.setDiffuse(1, 0, 0, 1);
        this.redTriangleMaterial.setSpecular(1, 1, 1, 1);
        this.redTriangleMaterial.setShininess(10.0); 

        // purple small triangle
        this.purpleTriangleMaterial = new CGFappearance(this.scene);
        this.purpleTriangleMaterial.setAmbient(0.7, 0.4, 1, 1);
        this.purpleTriangleMaterial.setDiffuse(0.7, 0.4, 1, 1);
        this.purpleTriangleMaterial.setSpecular(1, 1, 1, 1);
        this.purpleTriangleMaterial.setShininess(10.0); 
    }


    display() {
        this.scene.pushMatrix();
        this.scene.translate(-2.0, 3.0, 0.0); // Translation values from the last row of the matrix
        this.scene.rotate(Math.PI/8, 0, 0, 1); // Rotation value from the angle in the matrix
        //this.diamondMaterial.apply();
        this.scene.customMaterial.apply();
        this.diamond.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI*1.25, 0, 0, 1);
        this.scene.translate(-0.4, -2.6, 0);
        this.orangeTriangleMaterial.apply();
        this.triangleBig.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1.27, 0.3, 0);
        this.scene.rotate(Math.PI*0.25, 0, 0, 1);
        this.blueTriangleMaterial.apply();
        this.triangleBig.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.14, -3.12, 0);
        this.scene.rotate(Math.PI*1, 0, 1, 0);
        this.scene.rotate(Math.PI*0.5, 0, 0, 1);
        this.yellowParallelogramMaterial.apply();
        this.parallelogram.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2.2, 1.2, 0);
        this.scene.rotate(Math.PI*0.5, 0, 0, 1);
        this.pinkTriangleMaterial.apply();
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(3.5, 2.5, 0);
        this.scene.rotate(Math.PI*0.25, 0, 0, 1);
        this.redTriangleMaterial.apply();
        this.triangleSmall.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-.5, -3.5, 0);
        this.scene.rotate(Math.PI*1.25, 0, 0, 1);
        this.purpleTriangleMaterial.apply();
        this.triangleSmall.display();
        this.scene.popMatrix();
    }


    enableNormalViz(){
        this.diamond.enableNormalViz();
        this.triangle.enableNormalViz();
        this.triangleBig.enableNormalViz();
        this.triangleSmall.enableNormalViz();
        this.parallelogram.enableNormalViz();
    }
}