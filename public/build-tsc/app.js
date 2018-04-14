"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("./robot/core");
function onload() {
    // Load the core
    console.log("TESTING");
    console.log(core_1.core.getActions());
}
window.addEventListener('load', onload, false);
