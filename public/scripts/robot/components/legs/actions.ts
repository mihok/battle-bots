import { IAction } from '../../action';

export const MOVE = '[Legs] Move';
export class MoveAction implements IAction {
  readonly type: string = MOVE;
  constructor(public payload: any = {}) {}
}
