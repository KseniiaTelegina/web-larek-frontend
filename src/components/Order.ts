import { Form } from "./Form"; 
import {IOrderForm} from "../types";
import {EventEmitter, IEvents} from "./base/events";
import { ensureElement, ensureAllElements } from "../utils/utils";
import { Component } from "./base/Component";

interface IOrderActions {
    onClick: () => void;
}

export class Order extends Form<IOrderForm> {

    protected _button: HTMLElement;
    protected _buttons: HTMLButtonElement[];

    constructor(protected container: HTMLFormElement, protected events: IEvents) {
        super(container, events);

        this._button = container.querySelector('.button.order__button');
        this._buttons = Array.from(container.querySelectorAll('.button.button_alt'));

        if (this._button) {
            this._button.addEventListener('click', () => {
                events.emit('contacts:open');
                console.log('ку ку ку')
            });
        }

    // для переключения оплаты
        this._buttons.forEach(button => {
            button.addEventListener('click', () => {
                this._buttons.forEach(btn => btn.classList.remove('button_alt-active'));
                button.classList.add('button_alt-active');
            });
        });
    }

    set address(value: string) {
        (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
    }
}
