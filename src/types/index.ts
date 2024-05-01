export interface IProduct {
    selected: boolean;
    id: string;
    title: string;
    image: string;
    category: string;
    description?: string;
    price: number | null;
    index?: string;
    button?: string;
    buttonDelete?: string;
    buttonInBasket?: string;
}

export interface IBasketModel {
    items: IProduct[];
    getTotal(): number;
    add(id: IProduct): void;
    remove(id: IProduct): void;
}


export interface ICardActions {
    onClick: (event: MouseEvent) => void;
}

export interface IProductItem {
    description: string;
}

export type ICard = IProduct & IProductItem;

export type OpenCard = IProduct;

export interface IAppState {
    catalog: IProduct[];
    basket: string[];
    preview: string | null;
    order: IOrderForm | null;
}

export interface IBasketHeaderButton {
    id: string;
    title: string;
    price: number;
    image: string;
}

// export interface IBasketModal {
//     openModal(): void;
//     closeModal(): void;
//     bindOpenButton(buttonSelector: string): void;
// }

// export enum PaymentMethod {
//     Cash = "Наличный",
//     NonCash = "Безналичный"
// }

export interface IOrderForm {
    address: string;
    // items: string[];
    // email: string;
    // phone: string;
    payment: string;
    // button: string;
   
    // paymentMethod: PaymentMethod;
}

export interface IContactsForm  {
  
    // items: string[];
    email: string;
    phone: string;
}

// export interface IUserForm {
//     email: string;
//     phone: string;
    
// }

// export interface IOrderContact extends IContactsForm  {
  
//     items: string[];
//     // email: string;
//     // phone: string;
// }


// export interface IOrder extends IOrderForm {
//     items: string[]
//     // selected: boolean;
// }

// export interface IContact extends IUserForm {
//     items: string[]
// }

export interface IOrderResult {
    id: string;
}

export interface CatalogModel {
    items: IProduct[]
    setItems(tems: IProduct[]):void;
    getProduct(id: string): IProduct;
}

// export interface IViewConstructor {
//     new (container: HTMLElement, events?: IEventEmitter): IViewConstructor;
// }

// export interface AppCard {
//     cardInBasket: IProduct[];
// }



// export type IBasketItem = Pick<IProduct, 'id' | 'title' | 'price' | 'image'> & {
//     productNumber: number;
// };

export interface IModalData {
    content: HTMLElement;
}

// type EventName = string | RegExp;
// type Subscriber = Function;
// type EmitterEvent = {
//     eventName: string,
//     data: unknown
// };


// export interface IEvents {
//     on<T extends object>(event: EventName, callback: (data: T) => void): void;
//     emit<T extends object>(event: string, data?: T): void;
//     trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
// }

// export class EventEmitter implements IEvents {
//     _events: Map<EventName, Set<Subscriber>>;

//     constructor() {
//         this._events = new Map<EventName, Set<Subscriber>>();
//     }

//     /**
//      * Установить обработчик на событие
//      */
//     on<T extends object>(eventName: EventName, callback: (event: T) => void) {
//         if (!this._events.has(eventName)) {
//             this._events.set(eventName, new Set<Subscriber>());
//         }
//         this._events.get(eventName)?.add(callback);
//     }

//     /**
//      * Снять обработчик с события
//      */
//     off(eventName: EventName, callback: Subscriber) {
//         if (this._events.has(eventName)) {
//             this._events.get(eventName)!.delete(callback);
//             if (this._events.get(eventName)?.size === 0) {
//                 this._events.delete(eventName);
//             }
//         }
//     }

//     /**
//      * Инициировать событие с данными
//      */
//     emit<T extends object>(eventName: string, data?: T) {
//         this._events.forEach((subscribers, name) => {
//             if (name === '*') subscribers.forEach(callback => callback({
//                 eventName,
//                 data
//             }));
//             if (name instanceof RegExp && name.test(eventName) || name === eventName) {
//                 subscribers.forEach(callback => callback(data));
//             }
//         });
//     }

//     /**
//      * Слушать все события
//      */
//     onAll(callback: (event: EmitterEvent) => void) {
//         this.on("*", callback);
//     }

//     /**
//      * Сбросить все обработчики
//      */
//     offAll() {
//         this._events = new Map<string, Set<Subscriber>>();
//     }

//     /**
//      * Сделать коллбек триггер, генерирующий событие при вызове
//      */
//     trigger<T extends object>(eventName: string, context?: Partial<T>) {
//         return (event: object = {}) => {
//             this.emit(eventName, {
//                 ...(event || {}),
//                 ...(context || {})
//             });
//         };
//     }
// }
export interface IEventEmitter {
    emit: (event: string, data: unknown) => void;
}

export interface IViewConstructor {
    new (container: HTMLElement, events?: IEventEmitter): IView;
}

export interface IView {
    render(data?: object): HTMLElement;
}
export type FormErrors = Partial<Record<keyof IOrderForm, string>>;
export type FormErrorsContact = Partial<Record<keyof IContactsForm, string>>;

