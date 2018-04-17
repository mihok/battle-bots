import { ArmComponent } from '../arm';
import * as BlasterActions from './actions';

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
  coolDownTime: 1000,
  fireDelay: 250,
}

// Actions
export class BlasterArmComponent extends ArmComponent {

  actions = BlasterActions;
  state: IEnergyWeaponState = initialState;

  constructor () {
    super();
  }

  reducer (state, action) {
    console.log('[BlasterArm]', action);
    switch (action.type) {
      case BlasterActions.SHOOT:
        // TODO: Not sure how to do side effects
        if (!this.state.isCool || this.state.isFiring) {
          return this.state;
        }

        // TODO: Should we be doing this in the reducers?
        setTimeout(() => {
          this.dispatch(new BlasterActions.RecoilAction({}));
        }, this.state.fireDelay);

        setTimeout(() => {
          this.dispatch(new BlasterActions.CoolDownAction({}));
        }, this.state.coolDownTime);

        return {
          ...this.state,
          isFiring: true,
          isCool: false,
        }
      case BlasterActions.RECOIL:
        return {
          ...this.state,
          isFiring: false,
        }
      case BlasterActions.COOL_DOWN:
        return {
          ...this.state,
          isCool: true,
        }
   }

    return this.state;
  }
}
