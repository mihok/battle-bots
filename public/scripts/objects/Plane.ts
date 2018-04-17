import { GameObject } from '../engine';

declare var THREE: any;

export class Plane extends GameObject {

    constructor() {
        super();

        // Create the new plane.
        this.object3D = new THREE.Object3D();
        var geometry = new THREE.BoxGeometry( 200, 1, 200 );
        var material = new THREE.MeshBasicMaterial( { color: 0x30A860 } );
        var plane = new THREE.Mesh( geometry, material );
        this.object3D.add(plane);

    }
}