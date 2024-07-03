import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./geometrics/MyPlane.js";
import { MyPanorama } from "./objects/MyPanorama.js";
import { MyRockSet } from "./objects/MyRockSet.js";
import { MyGarden } from "./objects/MyGarden.js";
import { MyBee } from "./objects/MyBee.js";
import { MyGrass } from "./objects/MyGrass.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
    this.gardenRows = 5;
    this.gardenColumns = 5;
    this.time = Date.now();
  }

  init(application) {
    super.init(application);
    this.setUpdatePeriod(20);
    
    this.initCameras();
    this.initLights();
    this.position = [0, -78, 0];
    this.angle = 0;
    this.velocity = [0, 0, 0]

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);


    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this,30);
    this.rockSet = new MyRockSet(this, 11, 5);
    this.garden = new MyGarden(this, this.gardenRows, this.gardenColumns);
    this.bee = new MyBee(this, this.position, this.angle, this.velocity);
    this.grass = new MyGrass(this, 50);  


    //Objects connected to MyInterface
    this.displayAxis = false;
    this.scaleFactor = 1;
    this.displayGarden = true;
    this.displayBee = true;
    this.displayGrass = true;
    this.displayRockSet = true;
    this.inverted = true;
    this.speedFactor = 1;
    this.scaleFactor = 1;

    //Textures
    this.enableTextures(true);

    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

    this.textureEarth = new CGFtexture(this, 'images/earth.jpg');
    this.earthAppearance = new CGFappearance(this);
    this.earthAppearance.setTexture(this.textureEarth);
    this.earthAppearance.setTextureWrap('REPEAT', 'REPEAT');

    this.panoramaTexture = new CGFtexture(this, "images/panorama4.jpg");
    this.panoramaAppearance = new CGFappearance(this);
    this.panoramaAppearance.setTexture(this.panoramaTexture);
    this.panoramaAppearance.setTextureWrap('REPEAT', 'REPEAT');

    if(this.inverted){
      this.panorama = new MyPanorama(this, 64, 32, this.panoramaTexture, true);
    }
    else{
      this.panorama = new MyPanorama(this, 64, 32, this.panoramaTexture);
    }

    // Set the scene update period
    this.setUpdatePeriod(50);
    this.startTime = Date.now();
  }
  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].setAmbient(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      1.0,
      0.1,
      1000,
      vec3.fromValues(50, 10, 15),
      vec3.fromValues(0, -60, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  // Function used to control the bee movement
  checkKeys(){
    var text = "Keys pressed: ";
    var keysPressed = false;
    if (this.gui.isKeyPressed("KeyW")) {
      text += " W ";
      keysPressed = true;
      this.bee.accelerate(1);
    }
    
    if (this.gui.isKeyPressed("KeyA")) {
      text += " A ";
      keysPressed = true;
      this.bee.turn(1);
    }
    if (this.gui.isKeyPressed("KeyS")) {
      text += " S ";
      keysPressed = true;
      this.bee.accelerate(-1);
    }
    if (this.gui.isKeyPressed("KeyD")) {
      text += " D ";
      keysPressed = true;
      this.bee.turn(-1);
    }
    if (this.gui.isKeyPressed("KeyR")) {
      text += " R ";
      keysPressed = true;
      this.bee.reset();
    }
    if (this.gui.isKeyPressed("KeyF")) {
      if(!this.bee.pollen){
      text += " F ";
      keysPressed = true;
      this.bee.descendToFlower();
      }
    }
    if (this.gui.isKeyPressed("KeyP")) {
      text += " P ";
      keysPressed = true;
      this.bee.pickPollen();
    }
    if (this.gui.isKeyPressed("KeyO")) {
      text += " O ";
      keysPressed = true;
      this.bee.returnToHive();
    }
    if (keysPressed) console.log(text);
  }

  // Function used to update the scene
  update(t) {
    this.checkKeys();
    this.bee.update(this.time);
    const elapsed = t - this.startTime;
    if (this.displayGrass) {
      this.grass.update(elapsed);
    }
  }

  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    // ---- BEGIN Primitive drawing section

    // Draw objects
    if (this.displayBee) this.bee.display();
    if(this.displayGarden) this.garden.display();
    if(this.displayGrass) this.grass.display();
    if(this.displayRockSet) this.rockSet.display();


    // Apply a translation to the flowers
    this.pushMatrix();
    this.translate(0, 0, 1.5); // Translate 3 units along the z-axis

    // Undo the translation
    this.popMatrix();

    this.pushMatrix();
    this.appearance.apply();
    this.translate(0,-100,0);
    this.scale(400,400,400);
    this.rotate(-Math.PI/2.0,1,0,0);
    this.plane.display();
    this.popMatrix();

    this.pushMatrix();
    this.panoramaAppearance.apply();
    this.panorama.display();
    this.popMatrix();
    // ---- END Primitive drawing section
  }
}
