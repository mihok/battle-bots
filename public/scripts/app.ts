import { core } from './robot/core';
import * as CoreActions from './robot/core/actions';

function onload() {
    // Load the core
    core.subscribeToState((state) => {
        console.log("Core State", state);
    });
    core.dispatch(new CoreActions.TakeDamageAction(5));
}

window.addEventListener('load', onload, false);
