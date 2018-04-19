declare var THREE: any;

export class RightArmMesh {
  private mesh: any;

  private position: number[];

  constructor () {
    let geomArm = new THREE.BoxGeometry(1,3,1);
    let matArm = new THREE.MeshBasicMaterial({color: 0x0000ff});
    let rightArm = new THREE.Mesh(geomArm, matArm);

    rightArm.position.set(-1.5, -0.5, 1);   
    rightArm.castShadow = true;
    rightArm.receiveShadow = true;

    this.mesh = rightArm;
  }

  public getTHREEMesh () {
    return this.mesh;
  }

  public update (dt) {
    // Update position and other things based on something?
  }
}
