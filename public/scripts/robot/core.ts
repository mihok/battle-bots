import { IComponent } from './component';
import { IAction } from './action';


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
    private components: any = {};

    private actions: IAction[] = [

    ];

    private state: ICoreState = initialState;


    constructor() {
        if (this.instance === null)
            this.instance = this;
    }


    public subscribeToState(subscribe: Function) {
        this.subscribers.push(subscribe);
        subscribe(this.state);
    }


    public subscribeToComponentState(component: string, subscriber: Function) {
        this.components[component].subscribeToState(subscriber);
    }


    public getActions(): IAction[] {
        return this.actions;
    }


    public getComponents() {
        return this.components;
    }


    public getComponentMethods(component: string) {
        return this.components[component].getMethods();
    }


    public command(componentName: string, action: any) {
        if (this.components[componentName])
            this.components[componentName].dispatch(action); // Invoke component command.
        else
            throw new Error(`Component ${componentName} does not exist.`);
    }


    private reducer(state: ICoreState, action: IAction) {
        switch(action.type) {
            case TAKE_DAMAGE:
                return {
                    ...this.state,
                    health: this.state.health - action.payload
                };
            case HEAL:
                return {
                    ...this.state,
                    health: this.state.health + action.payload
                };
        }

        return this.state;

    }


    public dispatch(action: CoreAction) {
        this.state = this.reducer(this.state, action);
        this.emitChange();
    }


    private emitChange() {
        for (let i = 0; i < this.subscribers.length; i++) {
            this.subscribers[i](this.state);
        }
    }
}


// Action names
export const TAKE_DAMAGE = '[Core] Take Damage';
export const HEAL = '[Core] Heal';


export class TakeDamageAction implements IAction {
    readonly type: string = TAKE_DAMAGE;
    constructor(public payload: any = {}) {}
}


export class HealAction implements IAction {
    readonly type: string = HEAL;
    constructor(public payload: any = {}) {}
}


export type CoreAction =
    TakeDamageAction;


export const core = new Core();