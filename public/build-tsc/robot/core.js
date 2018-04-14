"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const initialState = {
    health: 100,
    power: 100
};
class Core {
    constructor() {
        this.instance = null;
        this.subscribers = [];
        this.components = {};
        this.actions = [];
        this.state = initialState;
        if (this.instance === null)
            this.instance = this;
    }
    subscribeToState(subscribe) {
        this.subscribers.push(subscribe);
        subscribe(this.state);
    }
    subscribeToComponentState(component, subscriber) {
        this.components[component].subscribeToState(subscriber);
    }
    getActions() {
        return this.actions;
    }
    getComponents() {
        return this.components;
    }
    getComponentMethods(component) {
        return this.components[component].getMethods();
    }
    command(componentName, action) {
        if (this.components[componentName])
            this.components[componentName].dispatch(action); // Invoke component command.
        else
            throw new Error(`Component ${componentName} does not exist.`);
    }
    reducer(state, action) {
        switch (action.type) {
            case exports.TAKE_DAMAGE:
                return Object.assign({}, this.state, { health: this.state.health - action.payload });
            case exports.HEAL:
                return Object.assign({}, this.state, { health: this.state.health + action.payload });
        }
        return this.state;
    }
    dispatch(action) {
        this.state = this.reducer(this.state, action);
        this.emitChange();
    }
    emitChange() {
        for (let i = 0; i < this.subscribers.length; i++) {
            this.subscribers[i](this.state);
        }
    }
}
// Action names
exports.TAKE_DAMAGE = '[Core] Take Damage';
exports.HEAL = '[Core] Heal';
class TakeDamageAction {
    constructor(payload = {}) {
        this.payload = payload;
        this.type = exports.TAKE_DAMAGE;
    }
}
exports.TakeDamageAction = TakeDamageAction;
class HealAction {
    constructor(payload = {}) {
        this.payload = payload;
        this.type = exports.HEAL;
    }
}
exports.HealAction = HealAction;
exports.core = new Core();
