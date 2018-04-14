import { core } from './robot/core';
import { HeadComponent } from './robot/components/head';
import { BlasterArmComponent } from './robot/components/blasterArm';
import * as CoreActions from './robot/core/actions';

function onload() {
    // Load the core

    core.registerComponent(HeadComponent, 'head');
    core.registerComponent(BlasterArmComponent, 'leftArm');

    core.subscribeToState((state) => { 
        console.log("Core State", state);
    });

    core.dispatch(new CoreActions.TakeDamageAction(5));

    let headActions = core.getComponentActions('head');

    core.command('head', new headActions.SeekAction());

    let leftArmActions = core.getComponentActions('leftArm');

    core.command('leftArm', new leftArmActions.ShootAction());
}

window.addEventListener('load', onload, false);
