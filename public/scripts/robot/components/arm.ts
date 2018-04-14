import { IComponent } from '../component';

export default class Arm implements IComponent {

  actions = [];
  state = {};

  constructor () { }

  subscribers = [];
  subscribeToState(subscribe) {
    this.subscribers.push(subscribe);
    subscribe(this.state);
  }

  getActions () {
    return this.actions;
  }

  // Override this
  reducer (state, action) {
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
