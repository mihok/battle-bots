import { core } from '../../robot/core';
import { HeadComponent } from '../../robot/components/head';
import { BlasterArmComponent } from '../../robot/components/blasterArm';
import { BipedComponent } from '../../robot/components/bipedalLegs';
// import * as CoreActions from './robot/core/actions';
// import { RightLegMesh } from './rightLeg';
import { RightArmMesh } from './rightArm';
// import { LeftLegMesh } from './leftLeg';
import { LeftArmMesh } from './leftArm';
import { HeadMesh } from './head';

declare var THREE: any;

export class RobotMesh {

  private mesh: any;
  private state: any;

  // TODO: Get a better name
  private subMeshes = {}


  constructor (scene) {
    // Load the core

    core.subscribeToState((state) => {
        console.log("[Core]", state);
    });

    /*
    core.subscribeToComponentState('leftArm', (state) => {
        console.log("Left Arm State", state);
    });

    core.subscribeToComponentState('legs', (state) => {
        console.log("Legs State", state);
    });

    core.dispatch(new CoreActions.TakeDamageAction(5));

    let headActions = core.getComponentActions('head');

    core.command('head', new headActions.SeekAction());

    let leftArmActions = core.getComponentActions('leftArm');

    core.command('leftArm', new leftArmActions.ShootAction());

    let bipedActions = core.getComponentActions('legs');

    core.command('legs', new bipedActions.WalkForwardAction());
    core.command('legs', new bipedActions.TurnAction({ degrees: 30 }));
    core.command('legs', new bipedActions.WalkForwardAction());
    core.command('legs', new bipedActions.TurnAction({ degrees: -60 }));
    core.command('legs', new bipedActions.WalkForwardAction());
    */
    // core.command('head', new headActions.SeekAction());


    // Main mesh
    let mesh = new THREE.Object3D();

    // TODO: Turn into classes of their own potentially?
    // Ceate the torso
    let torso = this.createTorso();
    mesh.add(torso);


    // Create head
    let head = new HeadMesh();
    // let head = this.createHead();
    mesh.add(head.getTHREEMesh());

    // core.registerComponent(HeadComponent, 'head');
    // core.subscribeToComponentState('head', this.handleHeadStateChange);


    // Create arms
    let leftArm = new LeftArmMesh();
    mesh.add(leftArm.getTHREEMesh());

    // core.registerComponent(BlasterArmComponent, 'leftArm');
    // core.subscribeToComponentState('leftArm', this.handleLeftArmStateChange);

    let rightArm = new RightArmMesh();
    mesh.add(rightArm.getTHREEMesh());

    // Create legs
    let { rightLeg, leftLeg } = this.createLegs();
    mesh.add(leftLeg);
    mesh.add(rightLeg);

    // core.registerComponent(BipedComponent, 'legs');


    this.mesh = mesh;

    scene.add(this.mesh);
  }

  public init () {
    core.subscribeToComponentState('legs', this.updatePosition.bind(this));
  }

  // Left this in the base mesh because I kind of felt it worked here
  private createTorso () {
    let geomTorso = new THREE.BoxGeometry( 2, 2, 2 );
    let matTorso = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    let torso = new THREE.Mesh( geomTorso, matTorso );

    torso.position.set(0, 0, 1);
    torso.castShadow = true;
    torso.receiveShadow = true;

    return torso;
  }

  private createLegs () {
    let geomLeg = new THREE.BoxGeometry(1,3,1);
    let matLeg = new THREE.MeshBasicMaterial({color: 0xffff00});

    let leftLeg = new THREE.Mesh(geomLeg, matLeg);
    leftLeg.position.set(0.55, -2.5, 1);
    leftLeg.castShadow = true;
    leftLeg.receiveShadow = true;

    let rightLeg = new THREE.Mesh(geomLeg, matLeg);
    rightLeg.position.set(-0.55, -2.5, 1);
    rightLeg.castShadow = true;
    rightLeg.receiveShadow = true;

    return {
      leftLeg,
      rightLeg,
    }
  }

  private handleLegsStateChange (state) {
    console.log("[Legs]", state);
  }

  private updatePosition (state) {
    console.log("[Legs]", "Should update now", state);

    this.state = state;
  }

  public setPosition () {

  }

  public getPosition () {
        return this.mesh.position;
  }

  public update (dt) {

    // var matrix = new THREE.Matrix4();
    // matrix.extractRotation( this.mesh.matrix );

    // var direction = new THREE.Vector3( 1, 0, 1 );
    // direction = matrix.multiplyVector3( direction );

    this.mesh.translateX(dt * 1.5 * this.state.delta.perpendicular);
    this.mesh.translateZ(dt * 1.5 * this.state.delta.parallel);

    // Update rotation
    this.mesh.rotateY(this.state.direction * 1.5 * dt);
  }
}
