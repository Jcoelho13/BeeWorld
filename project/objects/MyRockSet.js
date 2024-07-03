import { MyRock } from './MyRock.js';
import { MyHive } from './MyHive.js';
import { CGFtexture, CGFappearance } from '../../lib/CGF.js';

export class MyRockSet {
    constructor(scene, numRocks, numLayers = 5) {
        this.scene = scene;
        this.numRocks = numRocks;
        this.numLayers = numLayers;
        this.rocks = [];
        this.translateArray = [];
        this.scaleArray = [];
        this.rotateArray = [];

        this.hive = new MyHive(this.scene);
        this.pollen = [];

        this.rockAppearance = new CGFappearance(this.scene);
        this.rockAppearance.setAmbient(0.8, 0.8, 0.8, 0.0);
        this.rockAppearance.setDiffuse(0.95, 0.95, 0.95, 0.0);
        this.rockAppearance.setSpecular(0.5, 0.5, 0.5, 0.0);
        this.rockAppearance.setTexture(new CGFtexture(this.scene, "./images/rock.jpg"));
        this.rockAppearance.setTextureWrap('REPEAT', 'REPEAT');

        // Generate random scattered rocks
        for (let i = 0; i < numRocks; i++) {
            let rock = new MyRock(this.scene, 16, 16);
            
            let scale1 = Math.random() * 3 + 1; // Random scale between 1 and 4
            let scale2 = Math.random() * 3 + 1; // Random scale between 1 and 4
            let scale3 = Math.random() * 3 + 1; // Random scale between 1 and 4
            this.scaleArray.push([scale1, scale2, scale3]);
            let rotation = Math.random() * Math.PI * 2; // Random rotation around y-axis
            this.rotateArray.push([rotation, 0, 1, 0]);

            let x = Math.random() * 200 - 100; // Random x between -100 and 100
            let z = Math.random() * 200 - 100; // Random z between -100 and 100

            // Set y coordinate to -100
            let y = -98;

            this.translateArray.push([x, y, z]);

            this.rocks.push(rock);
        }

        // Generate pyramid
        let y = -99;

        for (let layer = 0; layer < numLayers; layer++) {
            let numRocksInLayer = numLayers - layer; // More rocks at the bottom
            let numRocksInNextLayer = numLayers - layer - 1; // Rocks in next layer
            let xOffset = -(numRocksInLayer - 1) * 0.6 + (numRocksInLayer - numRocksInNextLayer) * 0.3; // Centering rocks
            let zOffset = layer * 1; // Adjusting z offset for each layer
        
            for (let i = 0; i < numRocksInLayer; i++) {
                let rock = new MyRock(this.scene, 16, 16);
        
                let scale = 0.8; // Set scale to 0.8 for pyramid rocks
                this.scaleArray.push([scale, scale, scale]);
                let rotation = Math.random() * Math.PI * 2; // Random rotation around y-axis
                this.rotateArray.push([rotation, 0, 1, 0]);
        
                let x = xOffset + i;
                let z = zOffset + i; // Increasing z for each rock in layer
        
                this.translateArray.push([x, y, z]);
        
                this.rocks.push(rock);
            }
        
            y += 1; // Adjust y position for the next layer
        }
        // Set the hive on top of the pyramid
        this.hivePosition = [0, y, 0];
    }

    hasPollen() {
        return this.pollen.length > 0;
    }

    addPollen(pollen) {
        this.pollen.push(pollen);
    }

    display() {
        for (let i = 0; i < this.rocks.length; i++) {
            let rock = this.rocks[i];
            let position = this.translateArray[i];

            this.scene.pushMatrix();
            this.scene.translate(position[0] - 50, position[1], position[2] - 60);
            this.scene.scale(this.scaleArray[i][0], this.scaleArray[i][1], this.scaleArray[i][2]);
            this.rockAppearance.apply();
            rock.display();
            this.scene.popMatrix();
        }

        // Display the hive
        this.scene.pushMatrix();
        this.scene.translate(this.hivePosition[0] - 50, this.hivePosition[1] + 5, this.hivePosition[2] - 60);
        this.scene.scale(10, 10, 10);
        this.hive.display();
        this.scene.popMatrix();

        // Display the pollen
        if (this.hasPollen()) {
            for (let i = 0; i < this.pollen.length; i++) {
                let pollen = this.pollen[i];
                this.scene.pushMatrix();
                this.scene.translate(this.hivePosition[0] - 50 + i * 2, this.hivePosition[1] + 15, this.hivePosition[2] - 60);
                this.scene.scale(0.3, 0.3, 0.3);
                pollen.display();
                this.scene.popMatrix();
            }
        }
    }
}
