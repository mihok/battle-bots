import { IAction } from '../action';
import Arm from './arm';

export interface IWeaponState {
  isFiring: boolean;
  fireDelay: number;
}

export interface IEnergyWeaponState extends IWeaponState {
  isCool: boolean;
  coolDownTime?: number;
}

const initialState: IEnergyWeaponState = {
  isFiring: false,
  isCool: true,
  coolDownTime: 250,
  fireDelay: 10,
}

// Actions
export const SHOOT = 'SHOOT';
export const START_SHOOTING = 'START_SHOOTING';
export const STOP_SHOOTING = 'STOP_SHOOTING';
export class BlasterShootBeginAction implements IAction {
  readonly type: string = START_SHOOTING;
  constructor(public payload: any = {}) {}
}

export class BlasterShootEndAction implements IAction {
  readonly type: string = STOP_SHOOTING;
  constructor(public payload: any = {}) {}
}

export const COOL_DOWN = 'COOL_DOWN';
export class BlasterCoolDownAction implements IAction {
  readonly type: string = COOL_DOWN;
  constructor(public payload: any = {}) {}
}


export default class BlasterArm extends Arm {
  state: IEnergyWeaponState = initialState

  constructor () {
    super();
  }

  reducer (state, action) {
    switch (action.type) {
      case START_SHOOTING:
        // TODO: Not sure how to do side effects
        if (!this.state.isCool || this.state.isFiring) {
          return this.state;
        }

        // TODO: Should we be doing this in the reducers?
        setTimeout(() => {
          this.dispatch(new BlasterShootEndAction({}));
        }, this.state.fireDelay);

        setTimeout(() => {
          this.dispatch(new BlasterCoolDownAction({}));
        }, this.state.coolDownTime);

        return {
          ...this.state,
          isFiring: true,
          isCool: false,
        }
      case STOP_SHOOTING:
        return {
          ...this.state,
          isFiring: false,
        }
      case COOL_DOWN:
        return {
          ...this.state,
          isCool: true,
        }
   }

    return this.state;
  }
}
