import Arm from '../arm';
import * as BlasterAction from './actions';

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
export default class BlasterArm extends Arm {
  state: IEnergyWeaponState = initialState

  constructor () {
    super();
  }

  reducer (state, action) {
    switch (action.type) {
      case BlasterAction.SHOOT:
        // TODO: Not sure how to do side effects
        if (!this.state.isCool || this.state.isFiring) {
          return this.state;
        }

        // TODO: Should we be doing this in the reducers?
        setTimeout(() => {
          this.dispatch(new BlasterAction.RecoilAction({}));
        }, this.state.fireDelay);

        setTimeout(() => {
          this.dispatch(new BlasterAction.CoolDownAction({}));
        }, this.state.coolDownTime);

        return {
          ...this.state,
          isFiring: true,
          isCool: false,
        }
      case BlasterAction.RECOIL:
        return {
          ...this.state,
          isFiring: false,
        }
      case BlasterAction.COOL_DOWN:
        return {
          ...this.state,
          isCool: true,
        }
   }

    return this.state;
  }
}
