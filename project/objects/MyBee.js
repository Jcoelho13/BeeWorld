import { CGFobject, CGFappearance, CGFtexture } from '../../lib/CGF.js';
import { MySphere } from '../geometrics/MySphere.js';
import { MyEllipsoid } from '../geometrics/MyEllipsoid.js';
import { MyPolygon } from '../geometrics/MyPolygon.js';
import { MyLeg } from './MyLeg.js';
import { MyCone } from '../geometrics/MyCone.js';

export class MyBee extends CGFobject{
    constructor(scene, position, angle, velocity) {
        super(scene);

        // Create the different parts of the bee
        this.head = new MySphere(scene, 10, 10, [0.9, 0.8, 0.0]);
        this.eyes = new MySphere(scene, 10, 10, [0, 0, 0]);
        this.abdomen = new MyEllipsoid(scene, 10, 10, 1, 1, 2, [0.9, 0.8, 0.0]);
        this.wings = new MyPolygon(scene, 10, [0, 0, 0]);
        this.antennas = new MyLeg(scene); 
        this.legs = new MyLeg(scene); 
        this.sting = new MyCone(scene, 10, 10, [0, 0, 0]);
        this.oscillationStartTime = Date.now(); // Store the start time of the oscillation animation
        this.wingFlapStartTime = Date.now(); // Store the start time of the wing flapping animation
        this.position = position;
        this.angle = angle; // This is the orientation of the bee; 0 indicates facing forward
        
        // Initialize velocity vector as an array [vx, vy, vz]
        this.velocity = velocity;

        this.lastUpdateTime = Date.now();

        this.pollen = null;
        this.targetPosition = null;
        this.descending = null;
        this.onFlower = false;
        this.closestFlower = null;
        this.pressedP = false;
        this.returningToHive = false;
        this.hivePosition = [-50, -78, -60];
        this.originalY = this.position[1];
        this.returnToOriginalY = false;

        // Initialize the materials and textures
        this.initMaterials();
        this.update();
    }

    initMaterials() {
        // Initialize the materials and textures for the different parts of the bee

        // Abdomen
        this.materialAbdomen = new CGFappearance(this.scene);
        this.materialAbdomen.setAmbient(0.8, 0.8, 0.8, 0.0);
        this.materialAbdomen.setDiffuse(0.95, 0.95, 0.95, 0.0);
        this.materialAbdomen.setSpecular(0.5, 0.5, 0.5, 0.0);
        this.materialAbdomen.setTexture(new CGFtexture(this.scene, "./images/beeAbdomenTex.jpg"));
        this.materialAbdomen.setTextureWrap('REPEAT', 'REPEAT');

        // Eye
        this.materialEye = new CGFappearance(this.scene);
        this.materialEye.setAmbient(0.8, 0.8, 0.8, 0.0);
        this.materialEye.setDiffuse(0.95, 0.95, 0.95, 0.0);
        this.materialEye.setSpecular(0.5, 0.5, 0.5, 0.0);
        this.materialEye.setTexture(new CGFtexture(this.scene, "./images/beeEyeTex.jpg"));
        this.materialEye.setTextureWrap('REPEAT', 'REPEAT');

        // Leg
        this.materialLeg = new CGFappearance(this.scene);
        this.materialLeg.setAmbient(0.8, 0.8, 0.8, 0.0);
        this.materialLeg.setDiffuse(0.95, 0.95, 0.95, 0.0);
        this.materialLeg.setSpecular(0.5, 0.5, 0.5, 0.0);
        this.materialLeg.setTexture(new CGFtexture(this.scene, "./images/beeLegTex.jpg"));
        this.materialLeg.setTextureWrap('REPEAT', 'REPEAT');

        // Wing
        this.materialWing = new CGFappearance(this.scene);
        this.materialWing.setAmbient(0.8, 0.8, 0.8, 0.1);
        this.materialWing.setDiffuse(0.95, 0.95, 0.95, 0.1);
        this.materialWing.setSpecular(0.5, 0.5, 0.5, 0.1);
        this.materialWing.setEmission(0.3, 0.3, 0.3, 0.1);
        this.materialWing.setTexture(new CGFtexture(this.scene, "./images/beeWingTex.jpg"));
        this.materialWing.setTextureWrap('REPEAT', 'REPEAT');

    }

    moveToTarget(target, tolerance) {
        const distanceY = target[1] - this.position[1];
        const distanceX = target[0] - this.position[0];
        const distanceZ = target[2] - this.position[2];

        const targetAngle = Math.atan2(distanceX, distanceZ) * 180 / Math.PI;
        if (targetAngle < 0) {
            while (this.angle > targetAngle) {
                this.turn(-1);
            }
        } else {
            while (this.angle < targetAngle) {
                this.turn(1);
            }
        }

        if (Math.abs(distanceY) < tolerance && Math.abs(distanceX) < tolerance && Math.abs(distanceZ) < tolerance) {
            this.velocity = [0, 0, 0];
            this.position = [...target];
        } else {
            this.velocity[1] = distanceY * 0.3 * this.scene.speedFactor;
            this.velocity[0] = distanceX * 0.3 * this.scene.speedFactor;
            this.velocity[2] = distanceZ * 0.3 * this.scene.speedFactor;
        }
    }

    hasReachedTarget(target, tolerance) {
        return Math.abs(target[0] - this.position[0]) < tolerance &&
               Math.abs(target[1] - this.position[1]) < tolerance &&
               Math.abs(target[2] - this.position[2]) < tolerance;
    }

    update(t) {
        const currentTime = Date.now();
        const delta_t = (currentTime - this.lastUpdateTime) / 1000;
        this.lastUpdateTime = currentTime;
    
        if (this.descending && this.targetPosition) {
            this.moveToTarget(this.targetPosition, 0.4);
        } else if (this.returningToHive) {
            // Calculate direction to hive
            const distanceX = this.hivePosition[0] - this.position[0];
            const distanceZ = this.hivePosition[2] - this.position[2];
        
            // Set bee's orientation to face the hive
            this.angle = Math.atan2(distanceZ, distanceX);
        
            this.moveToTarget(this.hivePosition, 0.4);
            if (this.hasReachedTarget(this.hivePosition, 0.4)) {
                this.returningToHive = false;
                this.deliverPollen();
            }
        } else if (this.returnToOriginalY) {
            // Move to the original Y position
            const targetPosition = [this.position[0], this.originalY, this.position[2]];
            this.moveToTarget(targetPosition, 0.4);
            if (this.hasReachedTarget(targetPosition, 0.4)) {
                this.returnToOriginalY = false;
            }
        }
    
        if (this.onFlower && this.pressedP) {
            this.pickPollen();
        }
    
        // Update position based on velocity
        this.position[0] += this.velocity[0] * delta_t;
        this.position[1] += this.velocity[1] * delta_t;
        this.position[2] += this.velocity[2] * delta_t;
        // Constrain position within scene bounds
        const maxX = 1000; 
        const maxZ = 1000;
        this.position[0] = Math.max(Math.min(this.position[0], maxX), -maxX);
        this.position[2] = Math.max(Math.min(this.position[2], maxZ), -maxZ);
        
        // Handle Oscillation and Wing Flap 
        const oscillationElapsedTime = (currentTime - this.oscillationStartTime) / 1000;
        const oscillationAmplitude = 0.1;
        const oscillationFrequency = 1;
        const oscillationOffset = oscillationAmplitude * Math.sin(oscillationElapsedTime * 2 * Math.PI * oscillationFrequency);
        this.position[1] += oscillationOffset;
        
        const wingFlapElapsedTime = (currentTime - this.wingFlapStartTime) / 1000;
        const wingFlapFrequency = 5;
        const wingFlapAngle = Math.sin(wingFlapElapsedTime * 2 * Math.PI * wingFlapFrequency) * Math.PI / 6;
        this.leftWingRotation = wingFlapAngle;
        this.rightWingRotation = -wingFlapAngle;
    }    

    turn(v) {
        v *= this.scene.speedFactor;
        // Save the current speed
        const currentSpeed = Math.sqrt(this.velocity[0] ** 2 + this.velocity[2] ** 2);
        
        // Adjust the angle by the given smaller amount v
        const angleIncrement = Math.PI / 180; 
        this.angle += v * angleIncrement;
    
        // Reapply the saved speed in the new direction
        if (currentSpeed > 0) {
            this.velocity[0] = Math.sin(this.angle) * currentSpeed;
            this.velocity[2] = Math.cos(this.angle) * currentSpeed;
        }
    }
    

    accelerate(value) {
        value *= this.scene.speedFactor;
        const acceleration = value;
        const currentSpeed = Math.sqrt(this.velocity[0] ** 2 + this.velocity[2] ** 2);
    
        if (currentSpeed > 0 || acceleration > 0) {
            if (acceleration < 0) {
                // Decelerate
                const newSpeed = Math.max(currentSpeed + acceleration, 0);
                const scale = newSpeed / currentSpeed;
                if (currentSpeed > 0) {
                    this.velocity[0] *= scale;
                    this.velocity[2] *= scale;
                }
            } else {
                // Accelerate
                const newSpeed = currentSpeed + acceleration;
                this.velocity[0] = Math.sin(this.angle) * newSpeed;
                this.velocity[2] = Math.cos(this.angle) * newSpeed;
            }
    
            // Apply speed limits to prevent extreme values
            const maxSpeed = this.scene.speedFactor * 8;
            const minSpeed = this.scene.speedFactor * -8;
            this.velocity[0] = Math.max(Math.min(this.velocity[0], maxSpeed), minSpeed);
            this.velocity[2] = Math.max(Math.min(this.velocity[2], maxSpeed), minSpeed);
        }
    }
    
    reset() {
        // Reset the bee's position, angle, and velocity
        this.position = [0, -78, 0];
        this.angle = 0;
        this.velocity = [0, 0, 0];
        this.targetPosition = null;
        this.descending = false;
        this.onFlower = false;
        this.closestFlower = null;
        this.pollen = null;
        this.pressedP = false;
        this.returningToHive = false;
    }

    findClosestFlower() {
        let closestFlower = null;
        let minDistance = Infinity;

        let gardenArray = this.scene.garden.flowers;
    
        for (let i = 0; i < gardenArray.length; i++) {
            for (let j = 0; j < gardenArray[i].length; j++) {
                const flower = gardenArray[i][j];
                const distance = Math.sqrt(
                    (flower.position[0] - this.position[0]) ** 2 +
                    (flower.position[2] - this.position[2]) ** 2
                );
    
                if (distance < minDistance && flower.hasPollen()) {
                    minDistance = distance;
                    closestFlower = flower;
                }
            }
        }

    

        this.closestFlower = closestFlower;
    
        return closestFlower;
    }

    descendToFlower() {
        const closestFlower = this.findClosestFlower();
        if (closestFlower) {
            closestFlower.position[1] += closestFlower.stemHeight;
            console.log('Closest flower found:', closestFlower.position); // Logging for debug
            this.targetPosition = [
                closestFlower.position[0],
                closestFlower.position[1],
                closestFlower.position[2]
            ];
            this.originalY = this.position[1]; // Store the original Y position
            this.descending = true; // Set descending flag
        } else {
            console.log('No flower found');
        }
    }    

    display() {
        // Display the different parts of the bee

        this.scene.pushMatrix();

        this.scene.translate(this.position[0], this.position[1], this.position[2]);
        this.scene.scale(this.scene.scaleFactor, this.scene.scaleFactor, this.scene.scaleFactor);
        this.scene.rotate(this.angle, 0, 1, 0);

        // Head
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 2);
        this.materialAbdomen.apply();
        this.head.display();
        this.scene.popMatrix();


        // Eyes
        // Left eye
        this.scene.pushMatrix();
        this.scene.rotate(-20 * Math.PI / 180, 1, 0, 0); 
        this.scene.scale(1.5, 3, 1);
        this.scene.translate(-0.3, -0.1, 3); 
        this.scene.scale(0.2, 0.2, 0.2); 
        this.materialLeg.apply();
        this.eyes.display();
        this.scene.popMatrix();
        // Right eye
        this.scene.pushMatrix();
        this.scene.rotate(-20 * Math.PI / 180, 1, 0, 0); 
        this.scene.scale(1.5, 3, 1);
        this.scene.translate(0.3, -0.1, 3); 
        this.scene.scale(0.2, 0.2, 0.2); 
        this.materialLeg.apply();
        this.eyes.display();
        this.scene.popMatrix();

        // Abdomen
        this.scene.pushMatrix();
        this.materialAbdomen.apply();
        this.abdomen.display();
        this.scene.popMatrix();

        // Antennas
        // Left antenna
        this.scene.pushMatrix();
        this.scene.translate(-0.4, -1.5, 3.2);
        this.scene.rotate(160 * Math.PI / 180, 0, 1, 0);
        this.scene.scale(1, 1, 1.3);
        this.materialLeg.apply();
        this.antennas.display();
        this.scene.popMatrix();
        // Right antenna
        this.scene.pushMatrix();
        this.scene.translate(0.4, -1.5, 3.2); 
        this.scene.rotate(-160 * Math.PI / 180, 0, 1, 0);
        this.scene.scale(1, 1, 1.3);
        this.materialLeg.apply();
        this.antennas.display();
        this.scene.popMatrix();

        // Legs
        // Front left leg
        this.scene.pushMatrix();
        this.scene.scale(1.3, 1.3, 1.3);
        this.scene.rotate(45 * Math.PI / 180, 0, 1, 0);
        this.scene.translate(-0.1, -3.4, 0.75);
        this.materialLeg.apply();
        this.legs.display();
        this.scene.popMatrix();
        // Front right leg
        this.scene.pushMatrix();
        this.scene.scale(1.3, 1.3, 1.3);
        this.scene.rotate(-45 * Math.PI / 180, 0, 1, 0);
        this.scene.translate(0.1, -3.4, 0.75);
        this.materialLeg.apply();
        this.legs.display();
        this.scene.popMatrix();
        // Middle left leg
        this.scene.pushMatrix();
        this.scene.scale(1.4, 1.4, 1.4)
        this.scene.rotate(30 * Math.PI / 180, 0, 0, 1); 
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.translate(0.2, -2.8, 0.6);
        this.materialLeg.apply();
        this.legs.display();
        this.scene.popMatrix();
        // Middle right leg
        this.scene.pushMatrix();
        this.scene.scale(1.4, 1.4, 1.4)
        this.scene.rotate(-30 * Math.PI / 180, 0, 0, 1); 
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.translate(-0.2, -2.8, 0.6);
        this.materialLeg.apply();
        this.legs.display();
        this.scene.popMatrix();
        // Back left leg
        this.scene.pushMatrix();
        this.scene.scale(1.4, 1.4, 1.4);
        this.scene.rotate(30 * Math.PI / 180, 0, 0, 1);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.translate(0.2, -3.7, 0.5);
        this.materialLeg.apply();
        this.legs.display();
        this.scene.popMatrix();
        // Back right leg
        this.scene.pushMatrix();
        this.scene.scale(1.4, 1.4, 1.4);
        this.scene.rotate(-30 * Math.PI / 180, 0, 0, 1);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.translate(-0.2, -3.7, 0.5);
        this.materialLeg.apply();
        this.legs.display();
        this.scene.popMatrix();

        // Sting
        this.scene.pushMatrix();
        this.scene.rotate(180 * Math.PI / 180, 1, 0, 0);
        this.scene.translate(0, 0, 1.85);
        this.scene.scale(0.3, 0.3, 0.3);
        this.materialLeg.apply();
        this.sting.display();
        this.scene.popMatrix();

        // Enable alpha blending
        this.scene.gl.blendFunc(this.scene.gl.SRC_ALPHA, this.scene.gl.ONE_MINUS_SRC_ALPHA);
        this.scene.gl.enable(this.scene.gl.BLEND);

        // Wings
        // Left wing
        this.scene.pushMatrix();
        this.scene.rotate(this.leftWingRotation, 0, 0, 1);
        this.scene.scale(2, 1, 1)
        this.scene.translate(-1.25, 0.65, 0.55);
        this.scene.rotate(90 * Math.PI / 180, 0, 0, 1);
        this.scene.rotate(90 * Math.PI / 180, 0, 1, 0);
        this.materialWing.apply();
        this.wings.display();
        this.scene.popMatrix();
        // Right wing
        this.scene.pushMatrix();
        this.scene.rotate(this.rightWingRotation, 0, 0, 1);
        this.scene.scale(2, 1, 1)
        this.scene.translate(1.25, 0.65, 0.55);
        this.scene.rotate(-90 * Math.PI / 180, 0, 0, 1);
        this.scene.rotate(90 * Math.PI / 180, 0, 1, 0);
        this.materialWing.apply();
        this.wings.display();
        this.scene.popMatrix();
        // Left wing
        this.scene.pushMatrix();
        this.scene.rotate(this.leftWingRotation, 0, 0, 1);
        this.scene.scale(1.5, 1, 1)
        this.scene.translate(-1.25, 0.65, -0.4);
        this.scene.rotate(90 * Math.PI / 180, 0, 0, 1);
        this.scene.rotate(90 * Math.PI / 180, 0, 1, 0);
        this.materialWing.apply();
        this.wings.display();
        this.scene.popMatrix();
        // Right wing
        this.scene.pushMatrix();
        this.scene.rotate(this.rightWingRotation, 0, 0, 1);
        this.scene.scale(1.5, 1, 1)
        this.scene.translate(1.25, 0.65, -0.4);
        this.scene.rotate(-90 * Math.PI / 180, 0, 0, 1);
        this.scene.rotate(90 * Math.PI / 180, 0, 1, 0);
        this.materialWing.apply();
        this.wings.display();
        this.scene.popMatrix();

        // If the bee is carrying pollen, display it
        if (this.pollen !== null) {
            this.scene.pushMatrix();
            // Apply transformations for the pollen to be placed on the front legs
            this.scene.translate(0, -3.4, 0.75);
            this.scene.scale(0.3, 0.3, 0.3);
            this.pollen.display();
            this.scene.popMatrix();
        }

        // Disable alpha blending
        this.scene.gl.disable(this.scene.gl.BLEND);

        this.scene.popMatrix();
    }

    // Add a method to pick pollen from a flower
    pickPollen() {
        const flower = this.closestFlower;
        if (flower.hasPollen() && !this.pollen) {
            this.pressedP = true;
            this.pollen = flower.pickPollen();
            this.descending = false;
            this.onFlower = false;
            this.returnToOriginalY = true;
        }
    }

    // Add a method to drop pollen
    dropPollen() {
        this.pollen = null;
    }

    hasReachedTarget(target, tolerance) {
        return Math.abs(target[0] - this.position[0]) < tolerance &&
               Math.abs(target[1] - this.position[1]) < tolerance &&
               Math.abs(target[2] - this.position[2]) < tolerance;
    }

    returnToHive() {
        this.returningToHive = true;
        this.targetPosition = this.hivePosition;
    }

    deliverPollen() {
        if (this.pollen) {
            // since the hive is being displayed in the rock set, we need to add the pollen to the hive in the rock set
            this.scene.rockSet.addPollen(this.pollen);
            //this.scene.hive.hiveTop.addPollen(this.pollen); 
            this.pollen = null;
            this.onFlower = false;
            this.descending = false;
            this.pressedP = false;
        }
    }
}