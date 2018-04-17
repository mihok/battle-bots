declare var THREE: any;

export class LeftArmMesh {
  private mesh: any;

  private position: number[];

  constructor () {
    let geomArm = new THREE.BoxGeometry(1,3,1);
    let matArm = new THREE.MeshBasicMaterial({color: 0x0000ff});
    let leftArm = new THREE.Mesh(geomArm, matArm);

    leftArm.position.set(1.5, -0.5, 1);
    leftArm.castShadow = true;
    leftArm.receiveShadow = true;

    this.mesh = leftArm;
  }

  public getTHREEMesh () {
    return this.mesh;
  }

  public update (dt) {
    // Update position and other things based on something?
  }
}
