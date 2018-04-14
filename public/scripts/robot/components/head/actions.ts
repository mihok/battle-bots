import { IAction } from '../../action';

// Action names
export const SEEK = '[Head] Seek';


export class SeekAction implements IAction {
    readonly type: string = SEEK;
    constructor(public payload: any = {}) {}
}


export const actions = {
    [SEEK]: SeekAction
};


export type HeadAction =
    SeekAction;