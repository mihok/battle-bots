class Core {

    instance = null;

    subscribers = [];
    components = [];

    state = {
        health: 100,
        power: 100
    };


    constructor() {
        if (this.instance === null)
            this.instance = this;
    }


    subscribeToState(subscribe) {
        this.subscribers.push(subscribe);
        subscribe(this.state);
    }


    subscribeToComponentState(component, subscriber) {
        this.components.subscribeToState(subscriber);
    }


    getComponents() {
        return this.components;
    }


    command(componentName, methodName) {
        if (this.components[componentName])
            if (this.components[componentName].methodName)
                this.components[componentName][methodName](); // Invoke component command.
            else
                throw new Error(`Component method ${methodName} not register on ${componentName}.`);
        else
            throw new Error(`Component ${componentName} does not exist.`);
    }


    reducer(state, action) {
        switch(action.type) {
            case "TAKE_DAMAGE":
                let newHealth = this.state.health - action.payload;
                if (newHealth <= 0)
                    this.reducer()
                return this.state = {
                    ...this.state,
                    health: newHealth
                };
            case "HEAL":
                let newHealth = this.state.health + action.payload;
                return this.state = {
                    ...this.state,
                    health: newHealth
                };
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

export const Core = new Core();