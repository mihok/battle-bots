import { Engine } from './engine';
import { Sky } from './sky';

declare var THREE: any;


export class MainScene {

    public scene;


    constructor(engine: Engine) {

        let scene = new THREE.Scene();
        let light = new THREE.PointLight( 0xff0000, 1, 100 );
        light.position.set( 0, 10, 3 );
        scene.add( light );


        // Terrain mesh
        let terrainObj = new THREE.Object3D();
        let geomTerrain = new THREE.BoxGeometry(200, 1, 200);
        let matTerrain = new THREE.MeshBasicMaterial({ color: 0x8c8c8c });
        let terrain = new THREE.Mesh(geomTerrain, matTerrain);
        terrainObj.add(terrain);
        terrainObj.position.set(0, -4, 0);

        scene.add(terrainObj);

        // Main mesh
        let mesh = new THREE.Object3D();

        // create the torso
        let geomTorso = new THREE.BoxGeometry( 2, 2, 2 );
        let matTorso = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
        let torso = new THREE.Mesh( geomTorso, matTorso );
        torso.position.set(0, 0, 1);
        torso.castShadow = true;
        torso.receiveShadow = true;
        mesh.add(torso);

        // Create the head
        let geomHead = new THREE.BoxGeometry(1,1,1);
        let matHead = new THREE.MeshBasicMaterial({color: 0x00ff00});
        let head = new THREE.Mesh(geomHead, matHead);
        head.position.set(0, 1.5, 1);
        head.castShadow = true;
        head.receiveShadow = true;
        mesh.add(head);

        // Create arms
        let geomArm = new THREE.BoxGeometry(1,3,1);
        let matArm = new THREE.MeshBasicMaterial({color: 0x0000ff});
        let leftArm = new THREE.Mesh(geomArm, matArm);
        let rightArm = new THREE.Mesh(geomArm, matArm);
        rightArm.position.set(-1.5, -0.5, 1);
        leftArm.position.set(1.5, -0.5, 1);
        rightArm.castShadow = true;
        rightArm.receiveShadow = true;
        leftArm.castShadow = true;
        leftArm.receiveShadow = true;
        mesh.add(leftArm);
        mesh.add(rightArm);

        // Create legs
        let geomLeg = new THREE.BoxGeometry(1,3,1);
        let matLeg = new THREE.MeshBasicMaterial({color: 0xffff00});
        let leftLeg = new THREE.Mesh(geomLeg, matLeg);
        let rightLeg = new THREE.Mesh(geomLeg, matLeg);
        rightLeg.position.set(-0.55, -2.5, 1);
        leftLeg.position.set(0.55, -2.5, 1);
        rightArm.castShadow = true;
        rightArm.receiveShadow = true;
        leftArm.castShadow = true;
        leftArm.receiveShadow = true;
        mesh.add(leftLeg);
        mesh.add(rightLeg);

        scene.add(mesh);

        engine.camera.position.z = 5;
        engine.camera.position.x = 5;
        engine.camera.position.y = 5;

        engine.camera.lookAt(mesh.position);

        // scene.gameObjects = [];
        // scene.fog = new THREE.Fog(0xf7d9aa, 1000, 8000);

        // this.scene = scene;

        // //Create lights.
        // let hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9);

        // let shadowLight = new THREE.DirectionalLight(0xffffff, .9);

        // shadowLight.position.set(150, 350, 350);

        // shadowLight.castShadow = true;

        // // define the visible area of the projected shadow
        // shadowLight.shadow.camera.left = -400;
        // shadowLight.shadow.camera.right = 400;
        // shadowLight.shadow.camera.top = 400;
        // shadowLight.shadow.camera.bottom = -400;
        // shadowLight.shadow.camera.near = 1;
        // shadowLight.shadow.camera.far = 1000;

        // // define the resolution of the shadow; the higher the better,
        // // but also the more expensive and less performant
        // shadowLight.shadow.mapSize.width = 2048;
        // shadowLight.shadow.mapSize.height = 2048;


        // // Add lights to scene
        // scene.add(hemisphereLight);
        // scene.add(shadowLight);

        // scene.update = this.update.bind(this);

        // //Draw the terrain.
        // let terrain = new THREE.Object3D();
        // let terrainGeometry = new THREE.BoxGeometry(10000, 1, 10000);
        // let terrainMaterial = new THREE.MeshPhongMaterial({color: Engine.colors.brown, shading: THREE.FlatShading});
        // let terrainMesh = new THREE.Mesh(terrainGeometry, terrainMaterial);
        // terrain.add(terrainMesh);

        // scene.add(terrain);

        // let sky = new Sky(100);
        // sky.draw(scene);

        // engine.camera.position.x = 2000;
        // engine.camera.position.y = 50;
        // engine.camera.position.z = -250;
        // engine.camera.lookAt(new THREE.Vector3( 0, 100, 0 ));

        this.scene = scene;
    }


    public update(dt: number) {
        for (var i = 0, gameObject; gameObject = this.scene.gameObjects[i]; i++) {
            gameObject.update(dt);
        }
    }


    public destroy() {
        this.scene.destroy();
        return true;
    }
}