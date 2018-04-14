import { IAction } from '../../action';

export const SHOOT = 'SHOOT';
export class ShootAction implements IAction {
  readonly type: string = SHOOT;
  constructor(public payload: any = {}) {}
}

export const RECOIL = 'RECOIL';
export class RecoilAction implements IAction {
  readonly type: string = RECOIL;
  constructor(public payload: any = {}) {}
}

export const COOL_DOWN = 'COOL_DOWN';
export class CoolDownAction implements IAction {
  readonly type: string = COOL_DOWN;
  constructor(public payload: any = {}) {}
}
