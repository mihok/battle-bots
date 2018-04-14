import { Engine } from './engine';
import { Sky } from './sky';
import { RobotMesh } from './mesh';

declare var THREE: any;


export class MainScene {

    public scene;
    public engine;
    public robotMesh;

    constructor(engine: Engine) {

        let scene = new THREE.Scene();
        let light = new THREE.PointLight(0xff0000, 1, 100);
        light.position.set(0, 10, 3);
        scene.add(light);


        // Terrain mesh
        let terrainObj = new THREE.Object3D();
        let geomTerrain = new THREE.BoxGeometry(200, 1, 200);
        let matTerrain = new THREE.MeshBasicMaterial({ color: 0xC0924C });
        let terrain = new THREE.Mesh(geomTerrain, matTerrain);
        terrainObj.add(terrain);
        terrainObj.position.set(0, -4, 0);

        scene.add(terrainObj);

        // Initiate our "game" objects
        let robotMesh = new RobotMesh(scene);
        robotMesh.init();

        this.robotMesh = robotMesh;

        engine.camera.position.z = -23;
        engine.camera.position.x = -4;
        engine.camera.position.y = 11;
        engine.camera.lookAt(robotMesh.getPosition());
        this.robotMesh.mesh.add(engine.camera);

        scene.gameObjects = [
            robotMesh,
        ];

        scene.fog = new THREE.Fog(0xf7d9aa, 1000, 8000);


        // Create lights.
        let hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9);

        let shadowLight = new THREE.DirectionalLight(0xffffff, .9);

        shadowLight.position.set(150, 350, 350);

        shadowLight.castShadow = true;

        // Define the visible area of the projected shadow
        shadowLight.shadow.camera.left = -400;
        shadowLight.shadow.camera.right = 400;
        shadowLight.shadow.camera.top = 400;
        shadowLight.shadow.camera.bottom = -400;
        shadowLight.shadow.camera.near = 1;
        shadowLight.shadow.camera.far = 1000;

        // Define the resolution of the shadow; the higher the better,
        //  but also the more expensive and less performant
        shadowLight.shadow.mapSize.width = 2048;
        shadowLight.shadow.mapSize.height = 2048;

        // Add lights to scene
        scene.add(hemisphereLight);
        scene.add(shadowLight);

        scene.update = this.update.bind(this);

        let sky = new Sky(100);
        sky.draw(scene);


        this.scene = scene;
        this.engine = engine;
    }


    public update(dt: number) {
        for (var i = 0, gameObject; gameObject = this.scene.gameObjects[i]; i++) {
            gameObject.update(dt);
        }

        // this.engine.camera.lookAt(this.robotMesh.getPosition());
    }


    public destroy() {
        this.scene.destroy();
        return true;
    }
}
