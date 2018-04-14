import { controls } from './controls';

declare var THREE: any;

export class Engine {

    public currentScene;
    public camera;
    public renderer;
    public time;

    public screenWidth;
    public screenHeight;

    public static colors: any = {
        red: 0xf25346,
        white: 0xd8d0d1,
        brown: 0x59332e,
        pink: 0xF5986E,
        brownDark: 0x23190f,
        blue: 0x68c3c0,
    };


    constructor() {

    }


    init() {
        let canvasEl = document.getElementById("preview");
        this.renderer = new THREE.WebGLRenderer();

        this.renderer.setSize(canvasEl.clientWidth, canvasEl.clientHeight);
        canvasEl.appendChild(this.renderer.domElement);

        this.camera = new THREE.PerspectiveCamera(75, canvasEl.clientWidth / canvasEl.clientHeight, 0.1, 1000);

        controls.addMouseHandler(this.renderer.domElement, this.drag.bind(this), this.zoomIn.bind(this), this.zoomOut.bind(this));
    }


    loadScene(scene) {
        this.currentScene = new scene(this);

        this.loop();
    }


    loop() {
        requestAnimationFrame(this.loop.bind(this));

        let now = new Date().getTime();
        let dt = (now - this.time || now) / 1000;

        this.currentScene.update(dt);

        this.renderer.render(this.currentScene.scene, this.camera);
    }


    destroyScene() {
        if (this.currentScene)
            return this.currentScene.destroy();
        return false;
    }

    drag(deltaX, deltaY) {
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

    zoomIn() {
        let center = new THREE.Vector3();
        this.camera.position.sub(center).multiplyScalar(0.9).add(center);
    }

    zoomOut() {
        let center = new THREE.Vector3();
        this.camera.position.sub(center).multiplyScalar(1.1).add(center);
    }
}
