import * as HeadActions from './actions';

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
        return HeadActions;
    }


    dispatch(action) {
        console.log("[Head] ", action);
    }
}