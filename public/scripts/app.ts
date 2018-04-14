import { core } from './robot/core';

function onload() {
    // Load the core
    console.log("TESTING");
    console.log(core.getActions());
}

window.addEventListener('load', onload, false);
