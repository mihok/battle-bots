import { IComponent } from '../component';
import { IAction } from '../action';
import * as CoreActions from './actions';

export interface ICoreState {
    health?: number;
    power?: number;
}


const initialState: ICoreState = {
    health: 100,
    power: 100
}


class Core {

    public instance: Core = null;

    private subscribers: Function[] = [];
    private components: any = {
        head: null,
        leftArm: null,
        rightArm: null,
        backpack: null,
        legs: null
    };


    private state: ICoreState = initialState;


    constructor() {
        if (this.instance === null)
            this.instance = this;
    }


    public registerComponent(component: any, alias?: string) {
        const newComponent = new component();
        const componentName = alias || newComponent.type;
        console.log(`Registering component ${componentName}`);
        if (this.components[componentName]) {
            throw new Error(`Component ${componentName} already registered`);
        }

        this.components[componentName] = newComponent;

        console.log(this.components);
    }


    public subscribeToState(subscribe: Function) {
        this.subscribers.push(subscribe);
        subscribe(this.state);
    }


    public subscribeToComponentState(component: string, subscriber: Function) {
        this.components[component].subscribeToState(subscriber);
    }


    public getComponents() {
        return this.components;
    }


    public getComponentActions(component: string) {
        return this.components[component].getActions();
    }


    public command(componentName: string, action: any) {
        if (this.components[componentName])
            this.components[componentName].dispatch(action); // Invoke component command.
        else
            throw new Error(`Component ${componentName} does not exist.`);
    }


    private reducer(state: ICoreState, action: IAction) {
        console.log(`[Core Action] ${action.type}`);
        switch(action.type) {
            case CoreActions.TAKE_DAMAGE:
                return {
                    ...this.state,
                    health: this.state.health - action.payload
                };
            case CoreActions.HEAL:
                return {
                    ...this.state,
                    health: this.state.health + action.payload
                };
        }

        return this.state;

    }


    public dispatch(action: CoreActions.CoreAction) {
        this.state = this.reducer(this.state, action);
        this.emitChange();
    }


    private emitChange() {
        for (let i = 0; i < this.subscribers.length; i++) {
            this.subscribers[i](this.state);
        }
    }
}


export const core = new Core();
