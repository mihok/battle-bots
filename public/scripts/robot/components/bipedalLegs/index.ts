import { LegsComponent, ILegsState } from '../legs';
import * as BipedActions from './actions';

const initialState: ILegsState = {
  standByDelay: 500,
  speed: 1.15,

  // pie (360 degrees)
  direction: 0,

  // [x, y]
  // y = parallel to the direction
  // x = perpendicular to the direction
  delta: {
    parallel: 0,
    perpendicular: 0
  },
}

export class BipedComponent extends LegsComponent {
  
  actions = BipedActions
  state: ILegsState = initialState;

  constructor () {
    super();
  }

  reducer (state, action) {
    console.log('[Biped]', action);

    // TODO: Not sure how else to reset the delta's
    // Unless we're already standing by, standby after every movement?
    if (action.type !== BipedActions.STANDBY) {
      setTimeout(() => {
        this.dispatch(new BipedActions.StandbyAction())
      }, this.state.standByDelay)    
    }

    switch (action.type) {
      case BipedActions.WALK_FORWARD:
        return {
          ...this.state,
          delta: {
            ...this.state.delta,
            parallel: 1 * this.state.speed,
          }
        }
      case BipedActions.WALK_BACKWARDS:
        return {
          ...this.state,
          delta: {
            ...this.state.delta,
            parallel: -1 * this.state.speed,
          }
        }
      case BipedActions.SIDESTEP_LEFT:
        return {
          ...this.state,
          delta: {
            ...this.state.delta,
            perpendicular: -1 * this.state.speed,
          }
        }
    
      case BipedActions.SIDESTEP_RIGHT:
        return {
          ...this.state,
          delta: {
            ...this.state.delta,
            perpendicular: 1 * this.state.speed,
          }
        }
      case BipedActions.TURN:
        let newDirection = this.state.direction + action.payload.degrees;

        if (newDirection > 360) {
          newDirection -= 360;
        }

        return {
          ...this.state,
          direction: newDirection
        }
      case BipedActions.STANDBY:
        return {
          ...this.state,
          delta: {
            parallel: 0,
            perpendicular: 0
          }
        }
    }

    return this.state;
  }
}
