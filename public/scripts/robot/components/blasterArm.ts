import { IAction } from '../action';
import Arm from './arm';

export interface IEnergyWeaponState {
  coolDownTime?: number;
  cool: boolean;
}

// Actions
export const SHOOT = 'SHOOT';
export class BlasterShootAction implements IAction {
  readonly type: string = SHOOT;
  constructor(public payload: any = {}) {}
}

export const COOL_DOWN = 'COOL_DOWN';
export class BlasterCoolDownAction implements IAction {
  readonly type: string = COOL_DOWN;
  constructor(public payload: any = {}) {}
}


export default class BlasterArm extends Arm {
  // actions = {
  //   shoot: SHOOT,
  //   coolDown: COOL_DOWN
  // }

  state: IEnergyWeaponState = {
    coolDownTime: 250,
    cool: true
  }

  constructor () { }

  reducer (state, action) {
    switch (action.type) {
      case SHOOT:
        return this.state = {
          ...this.state,
          cool: false,
        }
      case COOL_DOWN:
        return this.state = {
          ...this.state,
          cool: true,
        }
    }

    return this.state;
  }

  shoot () {
    console.log('PEW PEW PEW'); 

    if (this.state.cool) {
      this.dispatch(actions.shoot());

      setTimeout(() => {
        this.dispatch(actions.coolDown())
      }, this.state.coolDownTime);
    }
  }
}
