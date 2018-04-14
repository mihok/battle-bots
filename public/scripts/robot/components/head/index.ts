import { actions } from './actions';

export class HeadComponent {
    public readonly type = 'head';

    private state = {};
    private subscribers: Function[] = [];

    constructor() {

    }


    subscribeToState(subscriber) {
        this.subscribers.push(subscriber);
        subscriber(this.state);
    }


    getActions() {
        return actions;
    }


    dispatch(action) {
        console.log("[Head] ", action);
    }
}