import { core } from '../robot/core';

export class QueueContainer {

    public isRunning = false;
    public actionIndex = 0;
    public actions = [];

    public actionInterval = null;
    public tickOffsetTop = 0;
    public tickEl: HTMLElement;

    constructor(public el: HTMLElement) {
        this.tickEl = document.getElementById("action-interval-tick");
    }


    render() {

    }


    startActions() {
        this.isRunning = true;

        // Create interval
        this.actionInterval = setInterval(this.updateTickPosition.bind(this), 66);
    }


    stopActions() {
        this.isRunning = false;
        clearInterval(this.actionInterval);
    }


    resetAction() {
        this.actions = [];
        this.tickOffsetTop = 0;
        this.tickEl.style.top = this.tickOffsetTop + 'px';
    }


    updateTickPosition() {
        // Set position of tick downwards.
        this.tickOffsetTop += 5;
        this.tickEl.style.top = this.tickOffsetTop + 'px';

        // Check if the next action needs to be triggered.
        let index = Math.floor(this.tickOffsetTop / 50);
        if (index > this.actionIndex) {
            // Trigger next action
            let action = this.actions[index];
            core.command(action.service, new action.command(action.payload));
        }
    }


    addAction(action) {
        this.actions.push(action);
        this.render();
    }


    removeAction(index) {
        this.actions.splice(index, 1);
        this.render();
    }


}