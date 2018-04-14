declare var THREE: any;

export class RobotMesh {
  private mesh: any;

  constructor (scene) {
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

    this.mesh = mesh;

    scene.add(this.mesh);
  }
  
  public getPosition () {
        return this.mesh.position;
  }

  public update (dt) {
        console.log('[RobotMesh] UPDATE');
  }
}
