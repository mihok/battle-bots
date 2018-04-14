import { core } from '../robot/core';

export class ComponentContainer {

    public components = [];

    constructor(public el: Element) {

        // Get the core's registered components
        this.components = core.getComponents();
        console.log(this.components);

        this.render();
    }


    render() {
        console.log("Rendering");
        // Clear
        this.el.innerHTML = '';

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
                    let div = document.createElement('div');
                    let template = `
                    <div class="action-item">
                        ${actionKey}
                        <div class="action-add">+</div>
                    </div>
                    `;
                    div.innerHTML = template;
                    // Render template
                    this.el.appendChild(div);
                });
            }
        });
    }
}