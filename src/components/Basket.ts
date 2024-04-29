import { Component } from "./base/Component";
import { ensureElement, createElement, formatNumber } from "../utils/utils";
import { EventEmitter } from "./base/events";
import { IProduct, IBasketModel} from "../types";
import { IEvents } from "./base/events";
import { AppState } from "./base/AppData";
import { Card } from "./base/Card";

// import { IBasketHeaderButton, ICardActions, IBasketModel } from "../types";



interface IBasketView {
    items: HTMLElement[];
    total: number;
    selected: string[];
    title: string;
    price: number;
    // index: number;
}

export class Basket extends Component<IBasketView> {
    protected _list: HTMLElement;
    protected _price: HTMLElement;
    protected _button: HTMLElement;
    protected _buttonDelete: HTMLElement;
    protected _index: HTMLElement;


    constructor(container: HTMLElement, protected events: EventEmitter) {
        super(container);

        this._list = this.container.querySelector('.basket__list');
        this._price = this.container.querySelector('.basket__price');
        this._button = this.container.querySelector('.basket__button');
        this._buttonDelete = this.container.querySelector('.basket__item-delete');
        this._index = this.container.querySelector('.basket__item-index')

    

        if (this._button) {
            this._button.addEventListener('click', () => {
                events.emit('order:open');
            });
        }

        if (this._buttonDelete) {
            this._buttonDelete.addEventListener('click', () => {
                events.emit('remove-basket:change');
                console.log('бу бу бу')
            });
        }

        this.items = [];
        
    } 
    set items(items: HTMLElement[]) {
        this._list.replaceChildren(...items);
        
    }


    set selected(items: string[]) {
        if (items.length) {
            this.setDisabled(this._button, false);
        } else {
            this.setDisabled(this._button, true);
        }
    }

    set total(value: number | null) {
        let displayText = (value === null) ? "Бесценно" : `${value} синапсов`;
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
    }

    remove(item: IProduct) {
      this.items = this.items.filter(it => it.id !== item.id)       
    }
}





















