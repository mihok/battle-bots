import { Scene } from './Scene';

declare var THREE: any;

export class GameObject {

    public object3D;
    public geometry;
    public material;
    public mesh;

    public scene: Scene;

    private _enabled: boolean = true;

    public get enabled() {
        return this._enabled;
    }

    public set enable(value: boolean) {
        this._enabled = value;
        if (value) {
            this.Enabled();
        } else {
            this.Disabled();
        }
    }

    public get transform() {
        return {
            position: this.object3D.position,
            rotation: this.object3D.rotation,
        }
    }


    constructor() {}


    /**
     * When an object is added to a scene.
     */
    public Init() {

    }


    /**
     * When a scene is started.
     */
    public Start() {

    }


    /**
     * When the scene updates.
     */
    public Update(event) {

    }


    /**
     * When a game object becomes enabled.
     */
    public Enabled() {

    }


    /**
     * When a game object becomes disabled.
     */
    public Disabled() {

    }


    /**
     * When the game object should be destroyed.
     */
    public Destroy() {
        this.scene.Remove(this);
    }

}