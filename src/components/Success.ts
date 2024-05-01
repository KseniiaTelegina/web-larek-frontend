import { Component } from "./base/Component"; 
import { ensureElement } from "../utils/utils";
import { Basket } from "./Basket"; 

interface ISuccess {
    totalPrice: number;
}

interface ISuccessActions {
    onClick: () => void;
}

export class Success extends Component<ISuccess> {
    protected _close: HTMLElement;
    protected _totalPrice: HTMLElement;

    constructor(container: HTMLElement, actions: ISuccessActions) {
        super(container);

        this._close = ensureElement<HTMLElement>('.order-success__close', this.container);
        this._totalPrice = container.querySelector('.order-success__description');

        if (actions?.onClick) {
            this._close.addEventListener('click', actions.onClick);
        }

    }

    set totalPrice(value: number) {
        const displayText = `Списано ${value} синапсов`;
        this.setText(this._totalPrice, displayText);
    
    }
}