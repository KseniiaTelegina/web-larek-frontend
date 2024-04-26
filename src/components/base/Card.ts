import { Component } from "./Component";
import { bem, ensureElement } from "../../utils/utils";
import { IEvents } from "./events";
import { IProduct} from "../../types";
import { EventEmitter } from "./events";

// const CATEGORY_COLORS = <Record<string, string>>{
//     'дополнительное': 'additional',
//     'софт-скил': 'soft',
//     'кнопка': 'button',
//     'хард-скил': 'hard',
//     'другое': 'other',
//   }

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
    button: string;

    constructor(protected container: HTMLElement, actions?: ICardActions) {
        super(container);

        this._title = container.querySelector('.card__title');
        this._category = container.querySelector('.card__category'); 
        this._image = container.querySelector('.card__image');
        this._price = container.querySelector('.card__price');
        this._button = container as HTMLButtonElement;

        

        if (actions?.onClick) {
            this._button.addEventListener('click', event => {
                actions.onClick(event);
                console.log('Clicked on card');
            });
        }
        
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

export class CardPreview extends Card<HTMLElement> {
    protected _description: HTMLElement;
    protected _button: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: EventEmitter, item: IProduct, isItemInBasket: boolean) {
        
        super(container);
        this._description = container.querySelector('.card__text');
        this._button = container.querySelector('.button')

        if (isItemInBasket) {
            this._button.textContent = 'Удалить из корзины';
            this._button.addEventListener('click', () => {
                this.events.emit('remove-basket:change', item);
            });
        } else {
            this._button.textContent = 'В корзину';
            this._button.addEventListener('click', () => {
                this.events.emit('add-basket:change', item);
            });
        }


        // if (actions?.onClick) {
            // this._button.addEventListener('click', () => {
            //     this.events.emit('add-basket:change', item);
                // actions.onClick(event);
                
            // });
        // })

    }

    set buttonText(value: string) {
        this.setText(this._button, value);
        }

    set description(value: string) {
        this.setText(this._description, value);
        }
    
    get description(): string {
        return this._description.textContent || '';
    }
}