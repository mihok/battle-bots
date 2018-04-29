import * as THREE from 'three';

import { engine } from './engine';
import { MainScene } from './scenes/MainScene';

// declare var THREE: any;

function onload() {
    engine.Init();
    engine.showStats = true;
    engine.LoadScene(MainScene);
}


window.addEventListener('load', onload, false);
