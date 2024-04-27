import { Form } from "./Form"; 
import {IOrderForm} from "../types";
import {EventEmitter, IEvents} from "./base/events";
import { ensureElement, ensureAllElements } from "../utils/utils";
import { Component } from "./base/Component";


export type ButtonActive = {
    onClick: (button: string) => void
}

export class Order extends Form<IOrderForm> {

    protected _button: HTMLElement;
    protected _buttons: HTMLButtonElement[];

    constructor(protected container: HTMLFormElement, protected events: IEvents, actions?: ButtonActive) {
        super(container, events);

        this._button = this.container.querySelector('.button.order__button');
        this._buttons = ensureAllElements<HTMLButtonElement>('.button .button_alt', container);

        if (this._button) {
            this._button.addEventListener('click', () => {
                events.emit('contacts:open');
                console.log('ку ку ку')
            });
        }

    // для переключения оплаты
        this._buttons.forEach(button => {
            button.addEventListener('click', () => {
                actions?.onClick?.(button.name);
                console.log('оплата выбрана')
            });
        })
 
    }

    set address(value: string) {
        (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
    }

    set payment(name: string) {
        this._buttons.forEach(button => {
            this.toggleClass(button, 'button_alt-active', button.name === name);
            this.setDisabled(button, button.name === name)
        });
    }
}
