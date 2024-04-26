import { Component } from "./base/Component";
import { ensureElement, createElement, formatNumber } from "../utils/utils";
import { EventEmitter } from "./base/events";
import { IProduct, IBasketModel} from "../types";

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

    constructor(container: HTMLElement, protected events: EventEmitter) {
        super(container);

        this._list = this.container.querySelector('.basket__list');
        this._total = this.container.querySelector('.basket__total');
        this._button = this.container.querySelector('.basket__action');

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

export class BasketModel implements IBasketModel {
    items: IProduct[] = [];
    add(item: IProduct) {
        if (!this.items.some(it => it.id === item.id)) {
            this.items.push(item)
            }  
    }
    remove(item: IProduct) {
        this.items = this.items.filter(it => it.id !== item.id)
    }
}





















