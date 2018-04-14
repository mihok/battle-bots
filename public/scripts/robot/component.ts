import { IAction } from "./action";

export interface IComponent {
    state: any;
    subscribeToState(subscriber: Function): void;
    getActions(): IAction[];
}