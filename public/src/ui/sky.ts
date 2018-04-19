import * as THREE from 'three';

import { Cloud } from './cloud';

// declare var THREE: any;

export class Sky {

    public mesh;

    constructor(public numClouds: number) { }


    draw(scene) {
        this.mesh = new THREE.Object3D();

        var stepAngle = Math.PI * 2 / this.numClouds;

        // create the clouds
        for (var i = 0; i < this.numClouds; i++) {
            var c = new Cloud();
            c.draw(scene);

            // set the rotation and the position of each cloud;
            // for that we use a bit of trigonometry
            var a = stepAngle * i; // this is the final angle of the cloud
            var h = 750 + Math.random() * 200; // this is the distance between the center of the axis and the cloud itself

            // Trigonometry!!! I hope you remember what you've learned in Math :)
            // in case you don't:
            // we are simply converting polar coordinates (angle, distance) into Cartesian coordinates (x, y)
            c.mesh.position.y = Math.floor(Math.random() * 300) + 150;
            c.mesh.position.x = Math.floor(Math.random() * 5000) + 1;
            c.mesh.position.z = (Math.floor(Math.random() * 5000) * -1) + 1;

            // for a better result, we position the clouds
            // at random depths inside of the scene

            // we also set a random scale for each cloud
            var s = 1 + Math.random() * 2;
            c.mesh.scale.set(s, s, s);

            // do not forget to add the mesh of each cloud in the scene
            this.mesh.add(c.mesh);
        }

        this.mesh.position.x = -2500;
        this.mesh.position.z = 2500;

        // Put it into position
        scene.add(this.mesh);
    }
}
