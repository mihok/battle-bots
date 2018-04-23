import * as THREE from 'three';

import { GameObject } from '../engine';

// declare var THREE: any;

export class Cube extends GameObject {

    constructor() {
        super();

        // Create the new cube.
        this.object3D = new THREE.Object3D();
        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        var cube = new THREE.Mesh( geometry, material );
        // console.log('Cube', cube.isObject3D);
        this.object3D.add(cube);

    }

}
