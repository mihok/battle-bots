declare var THREE: any;

function randomIntFromInterval(min: number, max: number) {
  const rand = (Math.floor(Math.random()*(max-min+1)+min));
  const negative = 1; // (Math.floor(Math.random()*2) == 1 ? 1 : -1);
  console.log("Generating Random Number", rand, negative);
    return rand * negative;
}

export class TreeFactory {

  private geometries = [];
  private meshes = [];
  // private mesh: any;
  private material = new THREE.MeshLambertMaterial({
    map: THREE.ImageUtils.loadTexture('./meshes/pal.png')
  });

  constructor () {
    // this.mesh = new THREE.Mesh();
  }

  public async init () {
    const treeGeometries = [
      'small-tree',
      'medium-tree',
      'large-tree',
      'wide-tree'
    ];

    for (let i = 0; i < treeGeometries.length; i += 1) {
      try {
        const geometry = await this.load(treeGeometries[i]);

        this.geometries.push(geometry)
        // this.mesh = new THREE.Mesh(geometry, this.material) //, new THREE.MeshFaceMaterial(materials));
      } catch (error) {
        console.error(error);
      }
    }

    // this.mesh.recieveShadow = true;
    // this.mesh.castShadow = true;
    // this.mesh.position.set(0, -4, 0);

    // scene.add(this.mesh);
  }

  public render (
    scene: any, 
    count: number, 
    minX: number = 0, 
    minY: number = 0, 
    minZ: number = 0,  
    maxX: number = 10, 
    maxY: number = -4, 
    maxZ: number = 10
  ) {
    for (let i = 0; i < count; i += 1) {
      let randGeoIndex = Math.round(Math.random() * this.geometries.length);
      let mesh = new THREE.Mesh(
        this.geometries[randGeoIndex],
        this.material
      );

      mesh.receieveShadow = true;
      mesh.castShadow = true;
      mesh.position.set(
        randomIntFromInterval(minX, maxX),
        // Math.random() * maxX,
        // randomIntFromInterval(minY, maxY),
        // Math.random() * maxY,
        -4, // Keep trees at the height of the terrain ;P
        randomIntFromInterval(minZ, maxZ)
        // Math.random() * maxZ
      );

      // Save for later
      this.meshes.push(mesh);

      // Add to scene
      scene.add(mesh)
    }
  }

  private load (name) {
    const loader = new THREE.JSONLoader();

    return new Promise((resolve, reject) => {
      loader.load(`./meshes/${name}.json`, (geometry) => {
        // Return nothing for now, we could return the geometry but it didnt
        //  make sense to me to do so.
        resolve(geometry);
      }, () => {}, (error) => {
        reject(error);
      });
    });
  }

  public update (dt: number) {

  }

  // Helper Functions
  // public getTHREEMesh () {
  //    return this.mesh;
  // }
}
