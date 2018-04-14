import { IAction } from '../../action';

export const BLAH = '[Biped] Blah';
export class BlahAction implements IAction {
  readonly type: string = BLAH;
  constructor(public payload: any = {}) {}
}

export const WALK_FORWARD = '[Biped] Walk Forward';
export class WalkForwardAction implements IAction {
  readonly type: string = WALK_FORWARD;
  constructor(public payload: any = {}) {}
}

export const WALK_BACKWARDS = '[Biped] Walk Backwards';
export class WalkBackwardsAction implements IAction {
  readonly type: string = WALK_BACKWARDS;
  constructor(public payload: any = {}) {}
}

export const SIDESTEP_LEFT = '[Biped] Side step left';
export class SideStepLeftAction implements IAction {
  readonly type: string = SIDESTEP_LEFT;
  constructor(public payload: any = {}) {}
}

export const SIDESTEP_RIGHT = '[Biped] Side step right';
export class SideStepRightAction implements IAction {
  readonly type: string = SIDESTEP_RIGHT;
  constructor(public payload: any = {}) {}
}


export const TURN = '[Biped] Turn';
export interface ITurnPayload {
  degrees: number;
}
export class TurnAction implements IAction {
  readonly type: string = TURN;
  constructor(public payload: ITurnPayload = { degrees: 0 }) {}
}

export const STANDBY = '[Biped] Standby';
export class StandbyAction implements IAction {
  readonly type: string = STANDBY;
  constructor(public payload: any = {}) {}
}
