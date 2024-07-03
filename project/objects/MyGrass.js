import { CGFobject, CGFappearance, CGFtexture, CGFshader } from "../../lib/CGF.js";

export class MyGrass extends CGFobject {
    constructor(scene, nrDivs) {
        super(scene);
        this.nrDivs = nrDivs;
        this.patchLength = 50.0 / nrDivs;
        this.grassShader = new CGFshader(this.scene.gl, './shaders/grass.vert', './shaders/grass.frag');
        this.grassShader.setUniformsValues({ uSampler: 0 });
        this.grassTexture = new CGFtexture(this.scene, './images/grassTex.jpg');
        this.grassAppearance = new CGFappearance(this.scene);
        this.grassAppearance.setTexture(this.grassTexture);
        this.initBuffers();
        this.timeSinceAppStart = 0;
    }

    initBuffers() {
        this.vertices = [];
        this.normals = [];
        this.indices = [];
        this.texCoords = [];
        let spacing = 0.5;
        let width = 0.1;

        for (let i = 0; i < this.nrDivs; i++) {
            for (let j = 0; j < this.nrDivs; j++) {
                let xOffset = i * spacing;
                let zOffset = j * spacing;
                let height = 2.0 + Math.random(); // Random height for variety

                // Bottom vertices
                this.vertices.push(xOffset, 0, zOffset);
                this.vertices.push(xOffset + width, 0, zOffset);
                // Top vertices
                this.vertices.push(xOffset, height, zOffset + width);
                this.vertices.push(xOffset + width, height, zOffset + width);

                // Texture coordinates
                this.texCoords.push(0.0, 0.0);
                this.texCoords.push(1.0, 0.0);
                this.texCoords.push(0.0, 1.0);
                this.texCoords.push(1.0, 1.0);

                // Normals
                for (let k = 0; k < 4; k++) {
                    this.normals.push(0, 1, 0);
                }

                // Indices
                let baseIndex = 4 * (i * this.nrDivs + j);
                this.indices.push(baseIndex, baseIndex + 1, baseIndex + 2);
                this.indices.push(baseIndex + 1, baseIndex + 3, baseIndex + 2);
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display() {
        this.scene.pushMatrix(); 
        
        this.scene.translate(50, -99, -50);
        this.scene.scale(3, 5, 3);
        this.scene.setActiveShader(this.grassShader);
        this.grassShader.setUniformsValues({ uTime: this.timeSinceAppStart }); 
        this.grassAppearance.apply();
        super.display();
        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix(); 
    }

    // Update the time since the application started
    update(timeSinceAppStart) {
        this.timeSinceAppStart = timeSinceAppStart / 1000.0;
    }
}
