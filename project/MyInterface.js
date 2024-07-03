import {CGFinterface, dat} from '../lib/CGF.js';
import { MyGarden } from './objects/MyGarden.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }
    initKeys() {
        // create reference from the scene to the GUI
        this.scene.gui = this;
        // disable the processKeyboard function
        this.processKeyboard = function () { };
        // create a named array to store which keys are being pressed
        this.activeKeys = {};
    }

    processKeyDown(event) {
        // called when a key is pressed down
        // mark it as active in the array
        this.activeKeys[event.code] = true;
    };


    processKeyUp(event) {
        // called when a key is released, mark it as inactive in the array
        this.activeKeys[event.code] = false;
    };


    isKeyPressed(keyCode) {
        // returns true if a key is marked as pressed, false otherwise
        return this.activeKeys[keyCode] || false;
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        // Added in feature/flower
        this.gui.add(this.scene, 'displayGarden').name('Garden');
        this.gui.add(this.scene, 'displayBee').name('Bee');
        this.gui.add(this.scene, 'displayGrass').name('Grass');
        this.gui.add(this.scene, 'displayRockSet').name('RockSet');

        this.gui.add(this.scene, 'gardenRows', 1, 10).step(1).name('Garden Rows').onChange(() => {
            this.scene.garden = new MyGarden(this.scene, this.scene.gardenRows, this.scene.gardenColumns);
        });
        this.gui.add(this.scene, 'gardenColumns', 1, 10).step(1).name('Garden Columns').onChange(() => {
            this.scene.garden = new MyGarden(this.scene, this.scene.gardenRows, this.scene.gardenColumns);
        });

        this.initKeys();


        //Slider element in GUI
        this.gui.add(this.scene, 'speedFactor', 0.1, 3).name('Speed Factor');
        this.gui.add(this.scene, 'scaleFactor', 0.5, 3).name('Scale Factor');
        
        return true;
    }
}