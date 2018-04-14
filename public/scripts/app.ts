import { CanvasPreview } from './ui/canvas';
import { core } from './robot/core';
import { HeadComponent } from './robot/components/head';
import { BlasterArmComponent } from './robot/components/blasterArm';
import * as CoreActions from './robot/core/actions';
import { Engine } from './ui/engine';
import { MainScene } from './ui/mainScene';
import { ComponentContainer } from './ui/component-container';

declare var THREE: any;

function onload() {

    const engine = new Engine();

    engine.init();
    engine.loadScene(MainScene);

    // Load the core
    core.registerComponent(HeadComponent, 'head');
    core.registerComponent(BlasterArmComponent, 'leftArm');

    core.subscribeToState((state) => { 
        console.log("Core State", state);
    });

    // core.dispatch(new CoreActions.TakeDamageAction(5));

    // let headActions = core.getComponentActions('head');

    core.command('head', new headActions.SeekAction());

    let leftArmActions = core.getComponentActions('leftArm');

    core.command('leftArm', new leftArmActions.ShootAction());
    // core.command('head', new headActions.SeekAction());

    const componentContainer = new ComponentContainer(document.getElementById("component-container"));
}

window.addEventListener('load', onload, false);
