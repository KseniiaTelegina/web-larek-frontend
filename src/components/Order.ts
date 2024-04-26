import { Form } from "./Form"; 
import {IOrderForm} from "../types";
import {EventEmitter, IEvents} from "./base/events";
import { ensureElement, ensureAllElements } from "../utils/utils";
import { Component } from "./base/Component";

interface ICardActions {
    onClick: (event: MouseEvent) => void;
}

export type TabState = {
    selected: string
};
export type TabActions = {
    onClick: (tab: string) => void
}


export class Order extends Form<IOrderForm> {

    protected _button: HTMLElement;
    protected _buttons: HTMLButtonElement[];


    constructor(protected container: HTMLFormElement, protected events: IEvents, actions?: ICardActions) {
        super(container, events);

        this._button = this.container.querySelector('.button.order__button');
        this._buttons = ensureAllElements<HTMLButtonElement>('.button', container);

        if (this._button) {
            this._button.addEventListener('click', () => {
                events.emit('contacts:open');
                console.log('ку ку ку')
            });
        }

        // this._buttons.forEach(button => {
        //     button.addEventListener('click', () => {
        //         actions?.onClick?.(button.name);
        //     });
        // })
        // if (actions?.onClick) {
        //     this._buttons.addEventListener('click', event => {
        //         actions.onClick(event);
        //         console.log('Clicked on card');
        //     });
        // } - для переключения оплаты

    }

    set address(value: string) {
        (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
    }



    set selected(name: string) {
        this._buttons.forEach(button => {
            this.toggleClass(button, 'button_alt', button.name === name);
            this.setDisabled(button, button.name === name)
        });
    }

}
