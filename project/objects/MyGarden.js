import { MyFlower } from "./MyFlower.js";
import { CGFobject, CGFtexture } from "../../lib/CGF.js";

export class MyGarden extends CGFobject {
    constructor(scene, rows, columns) {
        super(scene);
        this.rows = rows;
        this.columns = columns;
        this.flowers = [];
        this.receptacleTexture = new CGFtexture(this.scene, "images/receptacle.jpg");
        this.petalTexture = new CGFtexture(this.scene, "images/petal.png");
        this.stemTexture = new CGFtexture(this.scene, "images/stem.jpg");

        for (let i = 0; i < rows; i++) {
            this.flowers[i] = [];
            for (let j = 0; j < columns; j++) {
                let totalDiameter = Math.random() * 4 + 3; // Total diameter between 3 and 7 units
                let flowerOuterRadius = totalDiameter / 4; // Split total diameter into 4 parts
                let heartRadius = totalDiameter / 4; // Split total diameter into 4 parts

                let petalCount = Math.floor(Math.random() * 10) + 3;
                let colors = [
                    [0, 1, 0], // green
                    [1, 0, 0], // red
                    [0.8, 0.5, 0], // orange
                    [1, 1, 0], // yellow
                    [1, 0.75, 0.8] // pink
                ];
                let petalColor = colors[Math.floor(Math.random() * colors.length)];
                let heartColor = [Math.random(), Math.random(), Math.random()];
                let leafColor = [Math.random(), Math.random(), Math.random()];
                let stemRadius = Math.random() * 0.15 + 0.1;
                let stemHeight = Math.random() * 5;
                let stemColor = [Math.random(), Math.random(), Math.random()]; // Add stemColor
                let rotationAngle = Math.random() * Math.PI * 2; // Add a random rotation angle

                let position = [i * 14 - 60, -100, j * 14 + 30]; // Calculate the position

                this.flowers[i][j] = new MyFlower(
                    this.scene,
                    flowerOuterRadius,
                    petalCount,
                    petalColor,
                    heartRadius,
                    heartColor,
                    stemRadius,
                    stemHeight,
                    stemColor,
                    leafColor,
                    rotationAngle,
                    this.receptacleTexture,
                    this.petalTexture,
                    this.stemTexture,
                    position // Pass the position
                );
            }
        }
    }

    display() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                this.scene.pushMatrix();
                this.scene.translate(i * 14 - 60, -100, j * 14 + 30);
                this.flowers[i][j].display();
                this.scene.popMatrix();
            }
        }
    }

    getFlower(row, column) {
        if (row >= 0 && row < this.rows && column >= 0 && column < this.columns) {
            return this.flowers[row][column];
        }
        return null;
    }
}