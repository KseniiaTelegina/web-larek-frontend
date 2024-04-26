import { Component } from "./Component";
import { bem, ensureElement } from "../../utils/utils";
import { IEvents } from "./events";
import { IProduct, AppCard} from "../../types";
import { EventEmitter } from "./events";



export const appCard: AppCard = {
    cardInBasket: []
};

interface ICardActions {
    onClick: (event: MouseEvent) => void;
}

export class Card<T> extends Component<IProduct> {
    protected _title: HTMLElement;
    protected _image: HTMLImageElement;
    protected _price: HTMLElement;
    protected _category: HTMLElement;
    protected _button?: HTMLButtonElement;

    constructor(protected container: HTMLElement, actions?: ICardActions) {
        super(container);

        this._title = container.querySelector('.card__title');
        this._category = container.querySelector('.card__category');
        this._image = container.querySelector('.card__image');
        this._price = container.querySelector('.card__price');
        this._button = container as HTMLButtonElement;
        // this._category.classList.add(`.card__category_${data.categoryType}`);

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

export class CardItem extends Card<HTMLElement> {
    protected _description: HTMLElement;
    protected _button: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: EventEmitter, item: IProduct) {
        // constructor(container: HTMLElement, actions?: ICardActions) {
        super(container);
        this._description = container.querySelector('.card__text');
        this._button = container.querySelector('.button')

        //         if (actions?.onClick) {
        //     this._button.addEventListener('click', event => {
        //         actions.onClick( event);
        //         console.log('Clicked on card');
        //     });
        // }

        // if (this._button) {
        //     this._button.addEventListener('click', () => {
        //         events.emit('basked:add');
        //         console.log('Clicked on card');
        //     });
        // }

        if (this._button) {
            this._button.addEventListener('click', () => {
                this.events.emit('basket:add', item);
                console.log('Clicked on card and added to basket', item);
            });
        }

        // this._button.addEventListener('click', () => {
        //     this.events.emit('basket:add', item); // Событие для добавления в корзину
        //     appCard.cardInBasket.push(item); // Добавление товара в общий список корзины
        //     this.events.emit('basket:refresh'); // Эмит нового события для обновления отображения корзины
        //     console.log('Clicked on card and added to basket', item);
        // });
    
    }

    set description(value: string) {
        this.setText(this._description, value);
        }
    
    get description(): string {
        return this._description.textContent || '';
    }

    
}

// export interface ICard {
//     id: string;
//     title: string;
//     price: number;
//     image: string;
//     description?: string;
//     category: string;
// }

// export class CardBasket extends Component<IProduct> {
//         protected _index: HTMLElement;
//         protected _button: HTMLButtonElement;
//         protected _title: HTMLElement;
//         protected _price: HTMLElement;

//     constructor(container: HTMLElement, actions?: ICardActions) {
//         super(container);
//         this._index = container.querySelector('.basket__item-index');
//         this._button = container.querySelector('.basket__item-delete.card__button') as HTMLButtonElement;
//         this._title = container.querySelector('.card__title');
//         this._price = container.querySelector('.card__price');

//         if (actions?.onClick && this._button ) {
//             this._button.addEventListener('click', event => {
//                 actions.onClick(event);
//                 console.log('Clicked on card');
//             });
//         }
//     }
// }

// export class CardItem extends Card<IProduct> {
//     protected _title: HTMLElement;
//     protected _image: HTMLImageElement;
//     protected _price: HTMLElement;
//     protected _category: HTMLElement;
//     protected _description: HTMLElement;


//     constructor(protected container: HTMLElement, actions?: ICardActions) {
//         super(container);
    
//         this._title = container.querySelector('.card__title');
//         this._category = container.querySelector('.card__category');
//         this._image = container.querySelector('.card__image');
//         this._price = container.querySelector('.card__price');
//         this._description = container.querySelector('.card__text');
//     }

//     set id(value: string) {
//         this.container.dataset.id = value;
//     }

//     get id(): string {
//         return this.container.dataset.id || '';
//     }

//     set title(value: string) {
//         this.setText(this._title, value);
//     }

//     get title(): string {
//         return this._title.textContent || '';
//     }

//     set image(value: string) {
//         this.setImage(this._image, value, this.title)
//     }

//     set price(value: number) {
//         let displayText = value === 0 ? "Бесценно" : `${value}`;
//         this.setText(this._price, `${displayText} синапсов`);
//     }
    
//     get price(): number {
//         const textContent = this._price.textContent.replace(" синапсов", "");
//         return textContent === "Бесценно" ? 0 : Number(textContent);
//     }

//     set category(value: string) {
//         this.setText(this._category, value);
//     }

//     get category(): string {
//         return this._category.textContent || '';
//     }

//     set description(value: string) {
//         this.setText(this._description, value);
//         }
    
//     get description(): string {
//         return this._description.textContent || '';
//     }


// }

// export class CatalogItem extends Card<ICard> {
//     protected _status: HTMLElement;

//     constructor(container: HTMLElement) {
//         super('card', container);

//     }

    // set status({ status, label }: CatalogItemStatus) {
    //     this.setText(this._status, label);
    //     this._status.className = clsx('card__status', {
    //         [bem(this.blockName, 'status', 'active').name]: status === 'active',
    //         [bem(this.blockName, 'status', 'closed').name]: status === 'closed'
    //     });
    // }
// }