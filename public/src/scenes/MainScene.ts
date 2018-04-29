import * as THREE from 'three';

import { engine, Scene } from '../engine';
import { Cube } from '../objects/Cube';
import { Terrain } from '../objects/Terrain';
import { Tree } from '../objects/Tree';
import { Flag } from '../objects/Flag';
import { Plane } from '../objects/Plane';


export class MainScene extends Scene {

    constructor() {
        super();
        this.camera.position.z = 24;
        this.camera.position.y = 4;

        // Face a little towards the terrain
        this.camera.rotation.x = -0.5;
        // this.camera.rotation.z = -0.25;
    }

    public Init() {
        // let cube = new Cube();
        // this.Add(cube);

        // scene = new THREE.Scene();
        // TODO: Move to Scene functions
        this._scene.background = new THREE.Color( 0xF8EFBA );// new THREE.Color().setHSL( 0.6, 0, 1 );
        this._scene.fog = new THREE.FogExp2( 0xF8EFBA/*this._scene.background/*0xefd1b5*/, 0.01 );
        // this._scene.fog = new THREE.Fog( this._scene.background, 1, 5000 );

	// LIGHTS

        // TODO: Move to Sky class?
	const hemiLight = new THREE.HemisphereLight( 0xF8EFBA, 0xF8EFBA, 0.6 );
	hemiLight.color.setHSL( 0.6, 1, 0.6 );
	hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
	hemiLight.position.set( 0, 50, 0 );
	this._scene.add( hemiLight );

	const hemiLightHelper = new THREE.HemisphereLightHelper( hemiLight, 10 );
	this._scene.add( hemiLightHelper );

        // TODO: Move to Sky class?
        const dirLight = new THREE.DirectionalLight( 0xF8EFBA, 1 );
	dirLight.color.setHSL( 0.1, 1, 0.95 );
	dirLight.position.set( -1, 1.75, 1 );
	dirLight.position.multiplyScalar( 30 );
	this._scene.add( dirLight );

	dirLight.castShadow = true;

        dirLight.shadow.mapSize.width = 2048;
        dirLight.shadow.mapSize.height = 2048;

        var d = 50;

        dirLight.shadow.camera.left = -d;
        dirLight.shadow.camera.right = d;
        dirLight.shadow.camera.top = d;
        dirLight.shadow.camera.bottom = -d;

        dirLight.shadow.camera.far = 3500;
        dirLight.shadow.bias = -0.0001;
        // dirLight.shadow.darkness = 0.5;
        dirLight.shadow.camera.visible = true;

	const dirLightHeper = new THREE.DirectionalLightHelper( dirLight, 10 );
        this._scene.add( dirLightHeper );

        // TERRAIN
        const xS = 63, yS = 63;
        const terrainOpts = {
           easing: Terrain.Linear,
           frequency: 2.5,
           // heightmap: Terrain.PerlinDiamond,
           material: new THREE.MeshLambertMaterial({color: 0x30A860}),
           maxHeight: 10,
           minHeight: -10,
           steps: 1,
           useBufferGeometry: false,
           xSegments: xS,
           xSize: 100,
           ySegments: yS,
           ySize: 100
        };

        let terrain = new Terrain(terrainOpts);
        terrain.object3D.castShadow = true;
        terrain.object3D.receiveShadow = true;

        this.Add(terrain);

        // TODO: Generate Trees with TreeFactory?

        // let tree = Tree.Factory();
        // this.Add(tree);
        // Terrain.ScatterMeshes(terrain.object3D.children[0].geometry, { mesh: tree.object3D.children[0] });

        // BATTLE AREA
        // TODO: Add Battle area flags
        let flag1 = new Flag({ variant: 0 });

        flag1.init();

        flag1.object3D.position.x = -9.5;
        flag1.object3D.position.z = 14.5;
        flag1.object3D.rotation.y = 0.85 * Math.PI;

        flag1.object3D.castShadow = true;
        flag1.object3D.receiveShadow = true;

        this.Add(flag1);

        let flag2 = new Flag({ variant: 1 });

        flag2.init();

        flag2.object3D.position.x = 9.5;
        flag2.object3D.position.z = 14.5;
        flag2.object3D.rotation.y = -0.85 * Math.PI;

        flag2.object3D.castShadow = true;
        flag2.object3D.receiveShadow = true;

        this.Add(flag2);
       
        let flag3 = new Flag({ variant: 2 });

        flag3.init();

        flag3.object3D.position.x = -17;
        flag3.object3D.position.z = -5.5;
        flag3.object3D.rotation.y = 0.4 * Math.PI;

        flag3.object3D.castShadow = true;
        flag3.object3D.receiveShadow = true;

        this.Add(flag3);

        let flag4 = new Flag({ variant: 0 });

        flag4.init();

        flag4.object3D.position.x = 17;
        flag4.object3D.position.z = -5.5;
        flag4.object3D.rotation.y = -0.4 * Math.PI;

        flag4.object3D.castShadow = true;
        flag4.object3D.receiveShadow = true;

        this.Add(flag4);

        let flag5 = new Flag({ variant: 1 });

        flag5.init();

        // flag5.object3D.position.x = -17.5;
        flag5.object3D.position.z = -20;
        // flag5.object3D.rotation.y = 0.5 * Math.PI;

        flag5.object3D.castShadow = true;
        flag5.object3D.receiveShadow = true;

        this.Add(flag5);


        // TODO: Move to Sky class?
	var vertexShader = document.getElementById( 'vertexShader' ).textContent;
	var fragmentShader = document.getElementById( 'fragmentShader' ).textContent;
	var uniforms = {
            topColor:    { value: new THREE.Color( 0x25CCF7/*0x0077ff*/ ) },
            bottomColor: { value: new THREE.Color( 0xFFFFFF/*0xF8EFBA*/ ) },
		offset:      { value: 99 },
		exponent:    { value: 0.6 }
	};
	uniforms.topColor.value.copy( hemiLight.color );

        // this._scene.fog.color.copy( uniforms.bottomColor.value );

        // TODO: Move to Sky class?
	var skyGeo = new THREE.SphereBufferGeometry( 4000, 32, 15 );
	var skyMat = new THREE.ShaderMaterial( { vertexShader: vertexShader, fragmentShader: fragmentShader, uniforms: uniforms, side: THREE.BackSide } );

	var sky = new THREE.Mesh( skyGeo, skyMat );
        this._scene.add( sky );

    }


    public Update(event) {
    }
}
