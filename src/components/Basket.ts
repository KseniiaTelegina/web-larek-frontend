import { Component } from "./base/Component";
import { ensureElement, createElement, formatNumber } from "../utils/utils";
import { EventEmitter } from "./base/events";
import { IProduct, IView } from "../types";

// import { IBasketHeaderButton, ICardActions, IBasketModel } from "../types";

interface IBasketView {
    items: HTMLElement[];
    total: number;
    selected: string[];
    title: string;
    price: number;
}
export class Basket extends Component<IBasketView> {
    protected _list: HTMLElement;
    protected _total: HTMLElement;
    protected _button: HTMLElement;
    // protected _title: HTMLElement;
    // protected _items: IProduct[] = [];

    constructor(container: HTMLElement, protected events: EventEmitter) {
        super(container);

        // this._list = ensureElement<HTMLElement>('.basket__list', this.container);
        this._list = this.container.querySelector('.basket__list');
        this._total = this.container.querySelector('.basket__total');
        this._button = this.container.querySelector('.basket__action');
        // this._title = this.container.querySelector('.card__title');
        if (this._button) {
            this._button.addEventListener('click', () => {
                events.emit('order:open');
            });
        }
  
        this.items = [];
        
    } 
    set items(items: HTMLElement[]) {
        if (items.length) {
            this._list.replaceChildren(...items);
        } 
    }
    set selected(items: string[]) {
        if (items.length) {
            this.setDisabled(this._button, false);
        } else {
            this.setDisabled(this._button, true);
        }
    }
    set total(total: number) {
        this.setText(this._total, formatNumber(total));
    }

}

// export class BasketView implements IView {
//     constructor( protected container: HTMLElement) {}
//     render(data: { items: HTMLElement[]}) {
//         if (data) {
//             this.container.replaceChildren(...data.items);
//         }
//         return this.container
//     }
// }






















