import { CanvasPreview } from './ui/canvas';
// import { core } from './robot/core';
// import { HeadComponent } from './robot/components/head';
// import { BlasterArmComponent } from './robot/components/blasterArm';
// import { BipedComponent } from './robot/components/bipedalLegs';
// import * as CoreActions from './robot/core/actions';
import { Engine } from './ui/engine';
import { MainScene } from './ui/mainScene';
import { ComponentContainer } from './ui/component-container';

import { controls } from './ui/controls';

declare var THREE: any;

function onload() {

    const engine = new Engine();

    engine.init();
    engine.loadScene(MainScene);

    const componentContainer = new ComponentContainer(document.getElementById("component-container"));
}

window.addEventListener('load', onload, false);
