/**
 * Base scene class for managing a scene
 */

import * as THREE from 'three';

import { Engine, engine } from './Engine';
import { GameObject } from './GameObject';

// declare var THREE: any;


export class Scene {

    public gameObjects: GameObject[] = [];
    private _scene;

    public camera;

    public get scene() {
        return this._scene;
    }


    constructor() {
        this._scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, engine.width / engine.height, 1, 15000);
    }


    /**
     * Load a new scene
     */
    public Init() {
    }


    /**
     * Add a game object to the scene and call the Init method.
     *
     * @param gameObject
     */
    public Add(gameObject: GameObject) {
        console.log("Game Object added: ", gameObject);
        this._scene.add(gameObject.object3D);
        this.gameObjects.push(gameObject);
        gameObject.Init();
    }


    /**
     * Remove a game object from the scene.
     *
     * @param gameObject
     */
    public Remove(gameObject: GameObject) {
        let index = this.FindObjectIndex(gameObject);
        if (index < 0) return;

        this._scene.remove(gameObject.object3D);
        this.gameObjects.splice(index, 1);
    }


    /**
     * Find game object in scene.
     *
     * @param gameObject
     */
    public FindObjectIndex(gameObject: GameObject) {
        let index = -1;
        for (let i = 0, go; go = this.gameObjects[i]; i++) {
            if (go === gameObject) index = i; return index;
        }
        return index;
    }


    /**
     * On Update game loop from engine.
     *
     * @param event
     */
    public Update(event?: any) {
        this.gameObjects.map(go => {
            if (go.enabled)
                go.Update(event);
        });
    }


    /**
     * Destroy a scene.
     */
    public Destroy() {
        this.gameObjects.map(go => {
            go.Destroy();
        });
    }

    /*
     * Camera Movement
     * */
    Drag(deltaX, deltaY) {
        let center = new THREE.Vector3();
        var radPerPixel = (Math.PI / 450),
            deltaPhi = radPerPixel * deltaX,
            deltaTheta = radPerPixel * deltaY,
            pos = this.camera.position.sub(center),
            radius = pos.length(),
            theta = Math.acos(pos.z / radius),
            phi = Math.atan2(pos.y, pos.x);

        // Subtract deltaTheta and deltaPhi
        theta = Math.min(Math.max(theta - deltaTheta, 0), Math.PI);
        phi -= deltaPhi;

        // Turn back into Cartesian coordinates
        pos.x = radius * Math.sin(theta) * Math.cos(phi);
        pos.y = radius * Math.sin(theta) * Math.sin(phi);
        pos.z = radius * Math.cos(theta);


        this.camera.position.add(center);
        this.camera.lookAt(center);
    }

    ZoomIn() {
        let center = new THREE.Vector3();
        this.camera.position.sub(center).multiplyScalar(0.9).add(center);
    }

    ZoomOut() {
        let center = new THREE.Vector3();
        this.camera.position.sub(center).multiplyScalar(1.1).add(center);
    }

}
