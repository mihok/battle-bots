import * as THREE from 'three';

import { engine, Scene } from '../engine';
import { Cube } from '../objects/Cube';
import { Terrain } from '../objects/Terrain';
import { Plane } from '../objects/Plane';


export class MainScene extends Scene {

    public cube;

    constructor() {
        super();
        this.camera.position.z = 5;
    }


    public Init() {
        // let cube = new Cube();
        // this.Add(cube);

        // let plane = new Plane();
        // this.Add(plane);

        // plane.object3D.rotation.set(0, 0, -0.5 * Math.PI);
        // plane.object3D.position.set(0, -2, 0);

        const xS = 63, yS = 63;
        const terrainOpts = {
           easing: Terrain.Linear,
           frequency: 2.5,
           // heightmap: Terrain.PerlinDiamond,
           material: new THREE.MeshBasicMaterial({color: 0x30A860}),
           maxHeight: 10,
           minHeight: -10,
           steps: 1,
           useBufferGeometry: false,
           xSegments: xS,
           xSize: 100,
           ySegments: yS,
           ySize: 100
        };

        let terrain = new Terrain(terrainOpts);
        this.Add(terrain);

        // terrain.object3D.position.set(0, -2, 0);

        // var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        // var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        // this.cube = new THREE.Mesh( geometry, material );
        // this.scene.add( this.cube );
    }


    public Update(event) {
    }
}
