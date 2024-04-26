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

        // this._category.classList.add(`card__category_${CATEGORY_COLORS[value]}`);

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

    set price(value: number) {
        let displayText = value === 0 ? "Бесценно" : `${value}`;
        this.setText(this._price, `${displayText} синапсов`);
    }
    
    get price(): number {
        const textContent = this._price.textContent.replace(" синапсов", "");
        return textContent === "Бесценно" ? 0 : Number(textContent);
    }

    set category(value: string) {
        this.setText(this._category, value);
    }

    get category(): string {
        return this._category.textContent || '';
    }


}

export class CardPreview extends Card<HTMLElement> {
    protected _description: HTMLElement;
    protected _button: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: EventEmitter, item: IProduct) {
        // constructor(protected container: HTMLElement, actions?: ICardActions) {
        super(container);
        this._description = container.querySelector('.card__text');
        this._button = container.querySelector('.button')


        // if (actions?.onClick) {
            this._button.addEventListener('click', () => {
                this.events.emit('add-basket:change');
                // actions.onClick(event);
                console.log('кукусики');
            // });
        })

    }

    set description(value: string) {
        this.setText(this._description, value);
        }
    
    get description(): string {
        return this._description.textContent || '';
    }
}