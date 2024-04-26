// import {dayjs, formatNumber} from "../utils/utils";

import {Model} from "./Model"
import {FormErrors, IProduct, IAppState, IOrder, IBasketModel} from "../../types/index";
// import { appCard } from "../.."; 

export type CatalogChangeEvent = {
    catalog: IProduct[]
};


export class AppState extends Model<IAppState> {
    basket: string[];
    catalog: IProduct[];
    order: IOrder = {
        address: '',
        // paymentMethod: PaymentMethod.Cash,
        items: []
    };
    preview: string | null;
    formErrors: FormErrors = {};

    setCatalog(items: IProduct[]) {
        this.catalog = items;
        this.emitChanges('items:changed', { catalog: this.catalog });
    }

    get catalogCards() {
        return this.catalog;
    }

    setPreview(item: IProduct) {
        this.preview = item.id;
        this.emitChanges('preview:changed', item);
    }

    setButton(item: IBasketModel) {
        this.preview = item.id;
        this.emitChanges('preview:changed', item);
    }

    
    setPreviewCardBasket(item: IProduct) {
        this.preview = item.id;
        this.emitChanges('basket:items-changed', item);
      }

    

    // updateBasket(item: IBasketModel) {
    //     // Предположим, что itemRenderer функция преобразует IProduct в HTMLElement
    //     const items = appCard.cardInBasket.map(item => itemRenderer(item));
    //     this.items = items;  // Это вызывает сеттер set items который обновит UI
    //     this.total = appCard.cardInBasket.reduce((acc, item) => acc + item.price, 0);
    // }
}

// export class AppState extends Model<IAppState> {
//     basket: string[];
//     catalog: CardItem[];
//     order: IOrder = {
//         address: '',
//         paymentMethod: PaymentMethod.Cash,
//         items: []
//     };
//     preview: string | null;
//     formErrors: FormErrors = {};

//     constructor(initialState: IAppState, private events: any) {
//         super(initialState);
//         this.catalog = [];
//     }

//     setCatalog(items: ICard[]): void {
//         this.catalog = items.map(item => new CardItem(item));
//         this.emitChanges('catalog:changed', { catalog: this.catalog });
//     }
// }

    // toggleOrderedLot(id: string, isIncluded: boolean) {
    //     if (isIncluded) {
    //         this.order.items = _.uniq([...this.order.items, id]);
    //     } else {
    //         this.order.items = _.without(this.order.items, id);
    //     }
    // }

    // clearBasket() {
    //     this.order.items.forEach(id => {
    //         this.toggleOrderedLot(id, false);
    //         this.catalog.find(it => it.id === id).clearBid();
    //     });
    // }

    // getTotal() {
    //     return this.order.items.reduce((a, c) => a + this.catalog.find(it => it.id === c).price, 0)
    // }



    // setPreview(item: CardItem) {
    //     this.preview = item.id;
    //     this.emitChanges('preview:changed', item);
    // }

    // getActiveLots(): LotItem[] {
    //     return this.catalog
    //         .filter(item => item.status === 'active' && item.isParticipate);
    // }

    // getClosedLots(): LotItem[] {
    //     return this.catalog
    //         .filter(item => item.status === 'closed' && item.isMyBid)
    // }

    // setOrderField(field: keyof IOrderForm, value: string) {
    //     this.order[field] = value;

    //     if (this.validateOrder()) {
    //         this.events.emit('order:ready', this.order);
    //     }
    // }

    // validateOrder() {
    //     const errors: typeof this.formErrors = {};
    //     if (!this.order.email) {
    //         errors.email = 'Необходимо указать email';
    //     }
    //     if (!this.order.phone) {
    //         errors.phone = 'Необходимо указать телефон';
    //     }
    //     this.formErrors = errors;
    //     this.events.emit('formErrors:change', this.formErrors);
    //     return Object.keys(errors).length === 0;
    // }
// }


