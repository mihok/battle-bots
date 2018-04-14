import { core } from './robot/core';
import { HeadComponent } from './robot/components/head';
import { BlasterArmComponent } from './robot/components/blasterArm';
import { BipedComponent } from './robot/components/bipedalLegs';
import * as CoreActions from './robot/core/actions';

function onload() {
    // Load the core

    core.registerComponent(HeadComponent, 'head');
    core.registerComponent(BlasterArmComponent, 'leftArm');
    core.registerComponent(BipedComponent, 'legs');

    core.subscribeToState((state) => { 
        console.log("Core State", state);
    });

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

}

window.addEventListener('load', onload, false);
