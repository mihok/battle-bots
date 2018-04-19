import { IAction } from '../action';

// Action names
export const TAKE_DAMAGE = '[Core] Take Damage';
export const HEAL = '[Core] Heal';


export class TakeDamageAction implements IAction {
    readonly type: string = TAKE_DAMAGE;
    constructor(public payload: any = {}) {}
}


export class HealAction implements IAction {
    readonly type: string = HEAL;
    constructor(public payload: any = {}) {}
}


export type CoreAction =
    TakeDamageAction;