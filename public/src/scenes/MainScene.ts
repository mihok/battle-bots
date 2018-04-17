import { engine, Scene } from '../engine';
import { Cube } from '../objects/Cube';
import { Plane } from '../objects/Plane';


export class MainScene extends Scene {

    public cube;

    constructor() {
        super();
        this.camera.position.z = 5;
    }


    public Init() {
        let cube = new Cube();
        this.Add(cube);

        let plane = new Plane();
        this.Add(plane);

        plane.object3D.position.set(0, -2, 0);

        // var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        // var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        // this.cube = new THREE.Mesh( geometry, material );
        // this.scene.add( this.cube );
    }


    public Update(event) {
    }
}