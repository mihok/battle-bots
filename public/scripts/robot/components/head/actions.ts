import { IAction } from '../../action';

// Action names
export const SEEK = '[Head] Seek';
export const HEAL = '[Core] Heal';


export class SeekAction implements IAction {
    readonly type: string = SEEK;
    constructor(public payload: any = {}) {}
}


export type HeadAction =
    SeekAction;