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


export const TURN_RIGHT = '[Biped] Turn Right';
export interface ITurnRightPayload {
  degrees: number;
}
export class TurnRightAction implements IAction {
  readonly type: string = TURN_RIGHT;
  constructor(public payload: ITurnRightPayload = { degrees: 90 }) {}
}


export const TURN_LEFT = '[Biped] Turn Left';
export interface ITurnLeftPayload {
  degrees: number;
}
export class TurnLeftAction implements IAction {
  readonly type: string = TURN_LEFT;
  constructor(public payload: ITurnLeftPayload = { degrees: -90 }) {}
}

export const STANDBY = '[Biped] Standby';
export class StandbyAction implements IAction {
  readonly type: string = STANDBY;
  constructor(public payload: any = {}) {}
}


export const actions = {
  [BLAH]: BlahAction,
  [WALK_FORWARD]: WalkForwardAction,
  [WALK_BACKWARDS]: WalkBackwardsAction,
  [SIDESTEP_LEFT]: SideStepLeftAction,
  [SIDESTEP_RIGHT]: SideStepRightAction,
  [TURN_RIGHT]: TurnRightAction,
  [TURN_LEFT]: TurnLeftAction,
  [STANDBY]: StandbyAction
};
