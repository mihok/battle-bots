import { core } from '../robot/core';
import { queueManager } from './queue-manager';

export interface IComponentAction {
    name: string;
    service: string;
    command: any;
    payload: any;
}

class ComponentManager {

    public components = [];
    public actions = [];
    public el: HTMLElement;

    constructor() {
        this.el = document.getElementById("component-container");
    }


    init() {
        // Get the core's registered components
        this.components = core.getComponents();
        console.log(this.components);

        this.render();
    }


    render() {
        console.log("Rendering");
        // Clear
        this.el.innerHTML = '';
        this.actions = [];

        let keys = Object.keys(this.components);
        keys.map(key => {

            if (!this.components[key])
                return;

            // Get actions
            let actions = this.components[key].getActions();
            if (actions.actions) {
                console.log("Actions", actions);
                let actionKeys = Object.keys(actions.actions);
                actionKeys.map(actionKey => {
                    // Create the action
                    let action: IComponentAction = {
                        name: actionKey,
                        service: key,
                        command: actions.actions[actionKey],
                        payload: null
                    };

                    console.log("Creating component action", action);

                    this.actions.push(action);

                    let div = document.createElement('div');
                    let template = `
                    <div class="action-item">
                        ${actionKey}
                    </div>
                    `;
                    div.innerHTML = template;

                    // Render template
                    let index = this.actions.length - 1;

                    div.addEventListener('click', () => {
                        this.addComponentAction(index);
                    });

                    this.el.appendChild(div);
                });
            }
        });
    }


    addComponentAction(index) {
        queueManager.addAction(this.actions[index]);
    }
}

export const componentManager = new ComponentManager();