import { IComponent } from '../../component';
import { IAction } from '../../action';

export default class Arm implements IComponent {

  actions: IAction[] = [];
  state = {};

  constructor () { }

  private subscribers: Function[] = [];
  public subscribeToState(subscribe) {
    this.subscribers.push(subscribe);
    subscribe(this.state);
  }

  public getActions (): IAction[] {
    return this.actions;
  }

  // Override this
  reducer (state, action) {
    return this.state;
  }

  public dispatch (action) {
    this.state = this.reducer(this.state, action);
    this.emitChange();
  }

  private emitChange() {
    for (let i = 0; i < this.subscribers.length; i++) {
      this.subscribers[i](this.state);
    }
  }
}
