declare var THREE: any;

export class HeadMesh {
  private mesh: any;

  private position: number[];

  constructor () {
    // Create the head
    let geomHead = new THREE.BoxGeometry(1,1,1);
    let matHead = new THREE.MeshBasicMaterial({color: 0x00ff00});
    let head = new THREE.Mesh(geomHead, matHead);

    head.position.set(0, 1.5, 1);
    head.castShadow = true;
    head.receiveShadow = true;

    this.mesh = head;
  }

  // TODO: Find a way to elegantly get the THREE mesh without looking silly
  public getTHREEMesh () {
    return this.mesh;
  }

  update (dt) {
    // TODO: Update positions etc relative to the RobotMesh
  }
}
