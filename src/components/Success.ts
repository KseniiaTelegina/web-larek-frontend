import { Component } from "./base/Component"; 
import { ensureElement } from "../utils/utils";
import { EventEmitter } from "./base/events";
import { Basket } from "./Basket"; 

interface ISuccess {
    totalPrice: number;
}


export class Success extends Component<ISuccess> {
    protected _close: HTMLElement;
    protected _totalPrice: HTMLElement;

    // constructor(container: HTMLElement, actions: ISuccessActions) {
        constructor(container: HTMLElement, protected events: EventEmitter) {
            // constructor(container: HTMLElement) {
        super(container);

        this._close = ensureElement<HTMLElement>('.order-success__close', this.container);
        this._totalPrice = container.querySelector('.order-success__description');

        if (this._close) {
            this._close.addEventListener('click', () => {
                events.emit('success:close');
                console.log('допустим закрыла окно')
            });
        }
    }

    set totalPrice(value: number) {
        const displayText = `Списано ${value} синапсов`;
        this.setText(this._totalPrice, displayText);
    
    }
}