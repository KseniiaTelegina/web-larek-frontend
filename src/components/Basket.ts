import { Component } from "./base/Component";
import { ensureElement, createElement, formatNumber } from "../utils/utils";
import { EventEmitter } from "./base/events";
import { IProduct, IBasketModel} from "../types";
import { IEvents } from "./base/events";
import { AppState } from "./base/AppData";
import { Card } from "./base/Card";


interface IBasketView {
    items: HTMLElement[];
    total: number;
    selected: string[];
    title: string;
    price: number;
}

export class Basket extends Component<IBasketView> {
    protected _list: HTMLElement;
    protected _price: HTMLElement;
    protected _button: HTMLElement;
    protected _index: HTMLElement;



    constructor(container: HTMLElement, protected events: EventEmitter) {
        super(container);

        this._list = this.container.querySelector('.basket__list');
        this._price = this.container.querySelector('.basket__price');
        this._button = this.container.querySelector('.basket__button');
        this._index = this.container.querySelector('.basket__item-index');

    

        if (this._button) {
            this._button.addEventListener('click', () => {
                events.emit('order:open');
            });
        }


        this.items = [];

    } 
    
    set items(items: HTMLElement[]) {
        this._list.replaceChildren(...items); 
        if (items.length > 0) {
            this.setDisabled(this._button, false);
        } else {
            this.setDisabled(this._button, true);
        }
    }


    set total(value: number | null) {
        const displayText = (value === null) ? "Бесценно" : `${value} синапсов`;
        this.setText(this._price, displayText);
    }
    
    get total(): number {
        const textContent = this._price.textContent.replace(" синапсов", "");
        return textContent === "Бесценно" ? 0 : Number(textContent);
    }


}

export class BasketModel implements IBasketModel {
    
    items: IProduct[] = [];
    
    add(item: IProduct) {
        if (!this.items.some(it => it.id === item.id)) {
            this.items.push(item)
            } 
            console.log('я в корзине', this.items) 
    }

    remove(item: IProduct) {
      this.items = this.items.filter(it => it.id !== item.id)      
    }

    getTotal() {
        return this.items.reduce((total, product) => {
            return total + (product.price || 0);  
        }, 0); 
    }

    clearBasket() {
        this.items = [];
    }
}





















