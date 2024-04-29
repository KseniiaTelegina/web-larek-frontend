import { Component } from "./Component";
import { bem, ensureElement } from "../../utils/utils";
import { IEvents } from "./events";
import { IProduct} from "../../types";
import { EventEmitter } from "./events";
import { formatNumber } from "../../utils/utils";


export const appCard = {
    productArray: [] as IProduct[],
    cart: [] as IProduct[],

    setCardItemBasket(product: IProduct) {
        this.cart.push(product);
        // console.log('Товар добавлен в корзину:', product);
    },
}

interface ICardActions {
    onClick: (event: MouseEvent) => void;
}

export class Card<T> extends Component<IProduct> {
    protected _title: HTMLElement;
    protected _image: HTMLImageElement;
    protected _price: HTMLElement;
    protected _category: HTMLElement;
    protected _button?: HTMLButtonElement;
    protected _index: HTMLElement;
    protected _buttonDelete: HTMLElement;

    // protected _description: HTMLElement;
    // protected _buttonInBasket: HTMLButtonElement;
    
    button: string;


    constructor(protected container: HTMLElement, protected events: EventEmitter, item: IProduct, actions?: ICardActions) {
        // constructor(protected container: HTMLElement,  actions?: ICardActions) {
        super(container);

        this._title = container.querySelector('.card__title');
        this._category = container.querySelector('.card__category'); 
        this._image = container.querySelector('.card__image');
        this._price = container.querySelector('.card__price');
        this._index = this.container.querySelector('.basket__item-index')
        this._button = container as HTMLButtonElement;
        this._buttonDelete = this.container.querySelector('.basket__item-delete');

        // this._description = container.querySelector('.card__text');
        // this._buttonInBasket = container.querySelector('.card__button')

        
        if (actions?.onClick) {
            if(this._button) {
                this._button.addEventListener('click', actions.onClick)
            } else {
                container.addEventListener('click', actions.onClick)
            }
        }
        
        if (this._buttonDelete) {
            this._buttonDelete.addEventListener('click', () => {
                this.events.emit('removeFromBasketInBasket:change', item);
                console.log('Продукт удален');
            });
        }
    }


    set index(value: string) {
        this.setText(this._index, value);
    }

    get index(): string {
        return this._index.textContent || '';
    }

    set id(value: string) {
        this.container.dataset.id = value;
    }

    get id(): string {
        return this.container.dataset.id || '';
    }

    set title(value: string) {
        this.setText(this._title, value);
    }

    get title(): string {
        return this._title.textContent || '';
    }

    set image(value: string) {
        this.setImage(this._image, value, this.title)
    }

    set price(value: number | null) {
        let displayText = (value === null) ? "Бесценно" : `${value} синапсов`;
        this.setText(this._price, displayText);
    }
    
    get price(): number {
        const textContent = this._price.textContent.replace(" синапсов", "");
        return textContent === "Бесценно" ? 0 : Number(textContent);
    }

    set category(value: string) {
        this.setText(this._category, value);
        switch(value) {
            case 'софт-скил':
                this._category?.classList.add('card__category_soft');
                break;
            case 'другое':
                this._category?.classList.add('card__category_other');
                break;
            case 'хард-скил':
                this._category?.classList.add('card__category_hard');
                break;
            case 'дополнительное':
                this._category?.classList.add('card__category_additional');
                break;
            case 'кнопка':
                this._category?.classList.add('card__category_button');
                break;
            default:

                break;
            }
    }


    get category(): string {
        return this._category.textContent || '';
    }
}

export class CardPreview extends Card<IProduct> {
    protected _description: HTMLElement;
    protected _button: HTMLButtonElement;
    // protected _buttonDelete: HTMLElement;

    constructor(container: HTMLElement, protected events: EventEmitter, item: IProduct, isItemInBasket: boolean) {
       
        super(container, events, item);
        this._description = container.querySelector('.card__text');
        this._button = container.querySelector('.card__button')
        // this._buttonDelete = this.container.querySelector('.basket__item-delete');

        if (isItemInBasket) {
            this._button.textContent = 'Удалить из корзины';
            this._button.addEventListener('click', () => {
                this.events.emit('removeFromBasket:change', item);
            });
        } else {
            this._button.textContent = 'В корзину';
            this._button.addEventListener('click', () => {
                this.events.emit('addInBasket:change', item);
            });           
        }

        // if (this._buttonDelete) {
        //     this._buttonDelete.addEventListener('click', () => {
        //         this.events.emit('removeFromBasketInBasket:change', item);
        //         console.log('Продукт удален');
        //     });
        // }
    }

    set description(value: string) {
        this.setText(this._description, value);
        }
    
    get description(): string {
        return this._description.textContent || '';
    }

    set price(value: number | null) {
        let displayText = (value === null) ? "Бесценно" : `${value} синапсов`;
        this.setText(this._price, displayText);

        if (value === null) {
            this.setDisabled(this._button, true);
            this._button.textContent = 'Не продается';
        } else {
            this.setDisabled(this._button, false);
        }
    }

    get price(): number {
        const textContent = this._price.textContent.replace(' синапсов', '');
        return textContent === "Бесценно" ? 0 : Number(textContent);
    }
}