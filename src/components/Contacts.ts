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
interface ICardActions {
    onClick: (event: MouseEvent) => void;
}

export class Contacts extends Form<IOrderForm> {

    protected _button: HTMLElement;

    constructor(protected container: HTMLFormElement, protected events: IEvents ) {
        super(container, events);

        this._button = this.container.querySelector('.button');

        if (this._button) {
            this._button.addEventListener('click', () => {
                events.emit('success:open');
                console.log('ку ку ку')
            });
        }

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

}