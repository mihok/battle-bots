import { IComponent } from '../../component';

export interface ILegsDelta {
  parallel: number;
  perpendicular: number;
}

export interface ILegsState {
  standByDelay: number;
  speed: number;

  direction: number;

  delta: ILegsDelta;
}

export class LegsComponent implements IComponent {
  public readonly type = 'legs';

  actions = {};
  state: ILegsState = {
    standByDelay: 0,
    speed: 1,
    direction: 0,
    delta: {
      parallel: 0,
      perpendicular: 0,
    }
  };

  constructor () { }

  private subscribers: Function[] = [];
  public subscribeToState(subscriber) {
    this.subscribers.push(subscriber);
    subscriber(this.state);
  }

  public getActions () {
    return this.actions;
  }

  reducer (state, action) {
    console.log('[Legs]', action);

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
