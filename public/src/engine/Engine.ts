import Stats from 'stats';
import * as THREE from 'three';
import { Scene } from './Scene';
// TODO: Update this to follow new structure
import { controls } from '../ui/controls';

export class Engine {

    private static _instance: Engine;
    private currentScene: Scene;
    private renderer;
    private time: number;
    private _animationFrame;
    private statsFPS;
    private statsMS;
    private statsMB;

    public width: number;
    public height: number;

    public static get Instance(): Engine {
        return this._instance || (this._instance = new this());
    }

    public set showStats(value: boolean) {
        if (value) {
            this.EnableStats();
        } else {
            this.DisableStats();
        }
    }


    private constructor() {
    }


    public Init(element?: HTMLElement, width: number = window.innerWidth, height: number = window.innerHeight) {
        this.width = width || window.innerWidth;
        this.height = height || window.innerHeight;

        this.renderer = new THREE.WebGLRenderer({
            alpha: false,
            antialias: true
        });

        // this.renderer.gammaInput = true;
        // this.renderer.gammaOutput = true;

        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
        this.renderer.setSize(width, height);

        if (element)
            element.appendChild(this.renderer.domElement);
        else
            document.body.appendChild(this.renderer.domElement);
    }


    public LoadScene(scene: any) {
        // this.DestroyScene();
        this.currentScene = new scene();
        this.currentScene.Init();
        this.Update();

        // TODO: Find a better place for this
        controls.addMouseHandler(this.renderer.domElement, this.currentScene.Drag.bind(this.currentScene), this.currentScene.ZoomIn.bind(this.currentScene), this.currentScene.ZoomOut.bind(this.currentScene));
    }


    public Update() {
        this._animationFrame = requestAnimationFrame(this.Update.bind(this));

        if (this.statsFPS) this.statsFPS.begin();
        if (this.statsMS) this.statsMS.begin();
        if (this.statsMB) this.statsMB.begin();

        let now = new Date().getTime();
        let dt = (now - this.time || now) / 1000;
        this.time = now;

        this.currentScene.Update(dt);

        this.renderer.render(this.currentScene.scene, this.currentScene.camera);

        if (this.statsFPS) this.statsFPS.end();
        if (this.statsMS) this.statsMS.end();
        if (this.statsMB) this.statsMB.end();
    }


    public DestroyScene() {
        console.log("Destroy scene?");
        if (this.currentScene) {
            console.log("Destroying");
            this.currentScene.Destroy();
            cancelAnimationFrame(this._animationFrame);
        }
    }


    private EnableStats() {
        this.statsFPS = new Stats();
        this.statsMS = new Stats();
        this.statsMB = new Stats();

        this.statsFPS.showPanel(0);
        this.statsMS.showPanel(1);
        this.statsMB.showPanel(2);

        this.statsFPS.domElement.style.cssText = 'position:absolute;top:10px;right:10px;border:1px solid #fff;';
        this.statsMS.domElement.style.cssText = 'position:absolute;top:10px;right:100px;border:1px solid #fff;';
        this.statsMB.domElement.style.cssText = 'position:absolute;top:10px;right:190px;border:1px solid #fff;';

        document.body.appendChild(this.statsFPS.dom);
        document.body.appendChild(this.statsMS.dom);
        document.body.appendChild(this.statsMB.dom);
    }


    private DisableStats() {
        document.body.removeChild(this.statsFPS.dom);
        document.body.removeChild(this.statsMS.dom);
        document.body.removeChild(this.statsMB.dom);

        this.statsFPS = null;
        this.statsMS = null;
        this.statsMB = null;
    }
}


export const engine = Engine.Instance;
