import { IComponentAction } from "./component-manager";
import { core } from '../robot/core';

class QueueManager {

    public isRunning = false;
    public actionIndex = -1;
    public actions: IComponentAction[] = [];

    public actionInterval = null;
    public tickOffsetTop = 0;
    public tickEl: HTMLElement;
    public el: HTMLElement;
    public startEl: HTMLElement;
    public stopEl: HTMLElement;
    public resetEl: HTMLElement;


    constructor() {
        this.tickEl = document.getElementById("action-interval-tick");
        this.el = document.getElementById("action-queue-container");
        this.startEl = document.getElementById("start-actions");
        this.stopEl = document.getElementById("stop-actions");
        this.resetEl = document.getElementById("reset-actions");

        this.startEl.addEventListener('click', this.startActions.bind(this));
        this.stopEl.addEventListener('click', this.stopActions.bind(this));
        this.resetEl.addEventListener('click', this.resetActions.bind(this));
    }


    init() {

    }


    render() {
        // Add items to container.
        this.el.innerHTML = '';

        // Create action items.
        this.actions.map((action, index) => {
            let div = document.createElement('div');
            let template = `
            <div class="action-item">
                ${action.name}
            </div>
            `;
            div.innerHTML = template;
            div.addEventListener('click', () => {
                this.removeAction(index);
            });

            this.el.appendChild(div);
        });
    }


    addAction(action: IComponentAction) {
        this.actions.push(action);
        this.render();
    }


    removeAction(index) {
        this.actions.splice(index, 1);
        this.render();
    }


    startActions() {
        this.isRunning = true;
        this.actionInterval = setInterval(this.updateTickPosition.bind(this), 60);
        this.startEl.style.display = 'none';
        this.stopEl.style.display = 'block';
    }


    stopActions() {
        this.isRunning = false;
        clearInterval(this.actionInterval);
        this.startEl.style.display = 'block';
        this.stopEl.style.display = 'none';
    }


    restartActions() {
        this.actionIndex = -1;
        this.tickOffsetTop = 0;
        this.tickEl.style.top = this.tickOffsetTop + 'px';
    }


    resetActions() {
        this.stopActions();
        this.actions = [];
        this.actionIndex = -1;
        this.tickOffsetTop = 0;
        this.tickEl.style.top = this.tickOffsetTop + 'px';
        this.render();
    }


    updateTickPosition() {
        // Set position of tick downwards.
        this.tickOffsetTop += 3;
        this.tickEl.style.top = this.tickOffsetTop + 'px';

        // Check if the next action needs to be triggered.
        let index = Math.floor(this.tickOffsetTop / 50);
        if (index > this.actionIndex) {
            // Trigger next action
            let action = this.actions[index];

            if (action) {
                console.log("Triggering action", action);
                core.command(action.service, new action.command({}));
                this.actionIndex = index;
            } else {
                this.restartActions();
            }
        }
    }
}


export let queueManager = new QueueManager();