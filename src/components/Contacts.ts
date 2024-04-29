import { Form } from "./Form"; 
import {IOrderForm} from "../types";
import {EventEmitter, IEvents} from "./base/events";
import { ensureElement, ensureAllElements } from "../utils/utils";
import { Component } from "./base/Component";

// interface ICardActions {
//     onClick: (event: MouseEvent) => void;
// }

// export type TabState = {
//     selected: string
// };
// export type TabActions = {
//     onClick: (tab: string) => void
// }
// 

// interface IContactActions {
//     onClick: () => void;
// }

export class Contacts extends Form<IOrderForm> {

    protected _button: HTMLElement;
    protected _email: HTMLElement;
    protected _phone: HTMLElement;

    constructor(protected container: HTMLFormElement, events: IEvents ) {
        super(container, events);

        this._button = container.querySelector('.button[type="submit"]');
        this._email = this.container.querySelector('input[name="email"]');
        this._phone = this.container.querySelector('button[type="submit"]');

        // if (this._button) {
        //     this._button.addEventListener('click', () => {
        //         events.emit('success:open');
        //         console.log('ку ку ку')
        //     });
        // }

        // if (actions?.onClick) {
        //     this._button.addEventListener('click', event => {
        //         actions.onClick(event);
        //         console.log('Clicked on card');
        //     });
        // }

    }
    
    set phone(value: string) {
        (this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
    }

    set email(value: string) {
        (this.container.elements.namedItem('email') as HTMLInputElement).value = value;
    }

    set button(value: string) {
        const phoneValue = (this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
        const emailValue = (this.container.elements.namedItem('email') as HTMLInputElement).value = value;
        
        if (phoneValue && emailValue) {
            this.setDisabled(this._button, false);
        }
    }

    // set button(value: string) {
    //     const phoneValue = (this.container.elements.namedItem('phone') as HTMLInputElement).value.trim();
    //     const emailValue = (this.container.elements.namedItem('email') as HTMLInputElement).value.trim();
        
    //     if (phoneValue && emailValue) {
    //         this.setDisabled(this._button, false);
    //     }
    // }
}


// set address(value: string) {
//     (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
// }
