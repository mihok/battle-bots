import { core } from './robot/core';
import { HeadComponent } from './robot/components/head';
import * as CoreActions from './robot/core/actions';

function onload() {
    // Load the core

    core.registerComponent(HeadComponent, 'head');

    core.subscribeToState((state) => {
        console.log("Core State", state);
    });

    core.dispatch(new CoreActions.TakeDamageAction(5));

    let headActions = core.getComponentActions('head');

    core.command('head', new headActions.SeekAction());
}

window.addEventListener('load', onload, false);
