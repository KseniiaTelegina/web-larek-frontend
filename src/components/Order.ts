import { Form } from "./Form"; 
import {IOrderForm} from "../types";
import {EventEmitter, IEvents} from "./base/events";
import { ensureElement, ensureAllElements } from "../utils/utils";
import { Component } from "./base/Component";


export type TabState = {
    selected: string
};
export type TabActions = {
    onClick: (tab: string) => void
}


export class Order extends Form<IOrderForm> {
    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
    }

    set address(value: string) {
        (this.container.elements.namedItem('text') as HTMLInputElement).value = value;
    }
}


export class Tabs extends Component<TabState> {
    protected _buttons: HTMLButtonElement[];

    constructor(container: HTMLElement, actions?: TabActions) {
        super(container);

        this._buttons = ensureAllElements<HTMLButtonElement>('.button', container);

        this._buttons.forEach(button => {
            button.addEventListener('click', () => {
                actions?.onClick?.(button.name);
            });
        })
    }

    set selected(name: string) {
        this._buttons.forEach(button => {
            this.toggleClass(button, 'button_alt', button.name === name);
            this.setDisabled(button, button.name === name)
        });
    }
}