import { Component } from "./Component";
import { bem, ensureElement } from "../../utils/utils";
import { IEvents } from "./events";
import { IProduct } from "../../types";

interface ICardActions {
    onClick: (event: MouseEvent) => void;
}

export interface ICard {
    id: string;
    title: string;
    price: number;
    image: string;
    description?: string;
    category: string;
}

// export class Card extends Component<ICard> implements ICard {
export class Card<T> extends Component<IProduct> {
    protected _title: HTMLElement;
    protected _image: HTMLImageElement;
    protected _price: HTMLElement;
    protected _category: HTMLElement;

    constructor(protected container: HTMLElement, actions?: ICardActions) {
        super(container);

        this._title = container.querySelector('.card__title');
        this._category = container.querySelector('.card__category');
        this._image = container.querySelector('.card__image');
        this._price = container.querySelector('.card__price');
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
        this.setText(this._price, String(value));
    }
    
    get price(): number {
        return parseFloat(this._price.textContent || "0"); 
    }

    set category(value: string) {
        this.setText(this._category, value);
    }

    get category(): string {
        return this._category.textContent || '';
    }

    // set description(value: string) {
    //     this.setText(this._description, value);
    //     }
    
    // get description(): string {
    //     return this._description.textContent || '';
    // }
}



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