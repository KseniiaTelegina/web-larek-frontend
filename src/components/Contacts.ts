import { Form } from "./Form"; 
// import {IOrderForm} from "../types";
import {IContactsForm} from "../types";
import {EventEmitter, IEvents} from "./base/events";
import { ensureElement, ensureAllElements } from "../utils/utils";
import { Component } from "./base/Component";



export class Contacts extends Form<IContactsForm> {

    protected _button: HTMLElement;
    protected _email: HTMLElement;
    protected _phone: HTMLElement;

    constructor(container: HTMLFormElement, protected events: EventEmitter) {
        super(container, events);

        this._button = container.querySelector('.button[type="submit"]');
        this._email = this.container.querySelector('input[name="email"]');
        this._phone = this.container.querySelector('button[type="submit"]');

        if (this._button) {
            this._button.addEventListener('click', () => {
                events.emit('success:open');

                console.log('допустим нажала')
            });
        }

    }
    
    set phone(value: string) {
        (this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
    }

    set email(value: string) {
        (this.container.elements.namedItem('email') as HTMLInputElement).value = value;
    }

}


