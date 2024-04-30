

import { Form } from "./Form"; 
import {IOrderForm} from "../types";
import {EventEmitter, IEvents} from "./base/events";
import { ensureElement, ensureAllElements } from "../utils/utils";
import { Component } from "./base/Component";

interface IButtonPayment {
    onClick: (tab: string) => void;
}

export class Order extends Form<IOrderForm> {

    protected _button: HTMLElement;
    protected _payment: HTMLButtonElement[];

    // constructor(protected container: HTMLFormElement, protected events: IEvents) {
                constructor(protected container: HTMLFormElement, events: IEvents, actions?: IButtonPayment) {
        super(container, events);

        this._button = container.querySelector('.order__button');
        this._payment = ensureAllElements<HTMLButtonElement>('.button_alt', container);

        if (this._button) {
            this._button.addEventListener('click', () => {
                events.emit('contacts:open');
                console.log('ку ку ку')
            });
        }

    // для переключения оплаты

        this._payment.forEach(button => {
            button.addEventListener('click', () => {
                actions?.onClick?.(button.name);
                console.log(button.name);
                this.selected = button.name;
            });
        });
    }


        set selected (name: string) {
            this._payment.forEach(button => {
                this.toggleClass(button, 'button_alt-active', button.name === name);
        });
    }

    set address(value: string) {
        (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
    }

    set payment(value: string) {
        (this.container.elements.namedItem('card') as HTMLInputElement).value = value;
        (this.container.elements.namedItem('cash') as HTMLInputElement).value = value;
    }
}