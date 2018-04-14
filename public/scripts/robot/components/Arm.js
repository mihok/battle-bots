// const core = ?

class Arm {

  subscribers = [];

  actions = { }
  state = { }

  constructor () { }

  subscribeToState(subscribe) {
    this.subscribers.push(subscribe);
    subscribe(this.state);
  }

  methods () {
    return this.actions;
  }
 
  reducer (state, action) {
    console.log('ARM', state, action);

    switch(action.type) {

    }

    return this.state;
  }

  dispatch (action) {
    this.state = this.reducer(this.state, action);
    this.emitChange();
  }

  emitChange() {
    for (let i = 0; i < this.subscribers.length; i++) {
      this.subscribers[i](this.state);
    }
  }

}

export const Arm;
