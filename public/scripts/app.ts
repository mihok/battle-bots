import { core } from './robot/core';
import { HeadComponent } from './robot/components/head';
import { BlasterArmComponent } from './robot/components/blasterArm';
import { BipedComponent } from './robot/components/bipedalLegs';
import * as CoreActions from './robot/core/actions';
import { Engine } from './ui/engine';
import { MainScene } from './ui/mainScene';

import { componentManager } from './ui/component-manager';
import { queueManager } from './ui/queue-manager';

import { controls } from './ui/controls';

declare var THREE: any;

function onload() {

    const engine = new Engine();

    // Load the core
    // core.registerComponent(HeadComponent, 'head');
    // core.registerComponent(BlasterArmComponent, 'leftArm');
    core.registerComponent(BipedComponent, 'legs');

    componentManager.init();
    queueManager.init();

    engine.init();
    engine.loadScene(MainScene);
}


window.addEventListener('load', onload, false);
