import {CGFobject} from '../lib/CGF.js';
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
	}


    display() {
        var diamondMatrix = [
            Math.cos(Math.PI/8), Math.sin(Math.PI/8), 0.0, 0.0,
            -Math.sin(Math.PI/8), Math.cos(Math.PI/8), 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            -2.0, 3.0, 0.0, 1.0
        ];

        this.scene.pushMatrix();
        this.scene.multMatrix(diamondMatrix);
        this.diamond.diamondMaterial.apply();
        this.diamond.display();
        this.scene.popMatrix();

        
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI*1.25, 0, 0, 1);
        this.scene.translate(-0.4, -2.6, 0);
        this.triangleBig.orangeTriangleMaterial.apply();
        this.triangleBig.setOrangeTexCoords();
        this.triangleBig.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1.27, 0.3, 0);
        this.scene.rotate(Math.PI*0.25, 0, 0, 1);
        this.triangleBig.blueTriangleMaterial.apply();
        this.triangleBig.setBlueTexCoords();
        this.triangleBig.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.14, -3.12, 0);
        this.scene.rotate(Math.PI*1, 0, 1, 0);
        this.scene.rotate(Math.PI*0.5, 0, 0, 1);
        this.parallelogram.parallelogramMaterial.apply();
        this.parallelogram.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2.2, 1.2, 0);
        this.scene.rotate(Math.PI*0.5, 0, 0, 1);
        this.triangle.triangleMaterial.apply();
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(3.5, 2.5, 0);
        this.scene.rotate(Math.PI*0.25, 0, 0, 1);
        this.triangleSmall.redTriangleMaterial.apply();
        this.triangleSmall.setRedTexCoords();
        this.triangleSmall.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-.5, -3.5, 0);
        this.scene.rotate(Math.PI*1.25, 0, 0, 1);
        this.triangleSmall.pinkTriangleMaterial.apply();
        this.triangleSmall.setPinkTexCoords();
        this.triangleSmall.display();
        this.scene.popMatrix();
    }
}