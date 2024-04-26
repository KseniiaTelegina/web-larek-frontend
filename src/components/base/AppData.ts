// import {dayjs, formatNumber} from "../utils/utils";

import {Model} from "./Model"
import {FormErrors, IProduct, IAppState, IOrder, IBasketModel, IOrderForm } from "../../types/index";
import { BasketModel } from "../Basket";
// import { appCard } from "../.."; 

export type CatalogChangeEvent = {
    catalog: IProduct[]
};

export class LotItem extends Model<IProduct> {
    selected: boolean;
    id: string;
    title: string;
    image: string;
    category: string;
    description?: string;
    price: number | null;  

    protected myPrice: number = 0;

    // clearBid() {
    //     this.myPrice = 0;
    // }

    // placeBid(price: number): void {
    //     this.price = price;
    //     this.history = [...this.history.slice(1), price];
    //     this.myLastBid = price;

    //     if (price > (this.minPrice * 10)) {
    //         this.status = 'closed';
    //     }
    //     this.emitChanges('auction:changed', { id: this.id, price });
    // }

    // get isMyBid(): boolean {
    //     return this.myLastBid === this.price;
    // }

    // get isParticipate(): boolean {
    //     return this.myLastBid !== 0;
    // }

    // get statusLabel(): string {
    //     switch (this.status) {
    //         case "active":
    //             return `Открыто до ${dayjs(this.datetime).format('D MMMM [в] HH:mm')}`
    //         case "closed":
    //             return `Закрыто ${dayjs(this.datetime).format('D MMMM [в] HH:mm')}`
    //         case "wait":
    //             return `Откроется ${dayjs(this.datetime).format('D MMMM [в] HH:mm')}`
    //         default:
    //             return this.status;
    //     }
    // }

    // get timeStatus(): string {
    //     if (this.status === 'closed') return 'Аукцион завершен';
    //     else return dayjs
    //         .duration(dayjs(this.datetime).valueOf() - Date.now())
    //         .format('D[д] H[ч] m[ мин] s[ сек]');
    // }

    // get auctionStatus(): string {
    //     switch (this.status) {
    //         case 'closed':
    //             return `Продано за ${formatNumber(this.price)}₽`;
    //         case 'wait':
    //             return 'До начала аукциона';
    //         case 'active':
    //             return 'До закрытия лота';
    //         default:
    //             return '';
    //     }
    // }

    // get nextBid(): number {
    //     return Math.floor(this.price * 1.1);
    // }
}





export class AppState extends Model<IAppState> {
    
    basket: string[] = [];
    catalog: IProduct[];
    order: IOrder = {
        address: '',
        email: '',
        phone: '',
        items: []
    };
    preview: string | null;
    formErrors: FormErrors = {};
    basketModel: IBasketModel = new BasketModel();
    selectedItem: IProduct;

    setCatalog(items: IProduct[]) {
        this.catalog = items;
        this.emitChanges('items:changed', { catalog: this.catalog });
    }

    setCardPreview(item: IProduct) {
        this.preview = item.id;
        this.emitChanges('preview:changed', item);
      }


    setPreview(item: IProduct) {
        this.selectedItem = item;
        this.emitChanges('items:changed', item);
    }

    get catalogCards() {
        return this.catalog;
    }

    getTotal() {
        return this.order.items.reduce((a, c) => a + this.catalog.find(it => it.id === c).price, 0)
    }

    setButton(item: IProduct) {
        this.preview = item.id;
        this.emitChanges('preview:changed', item);
    }

    // проверка на наличие продукта в корзине  

    cardInBasket(item: IProduct): boolean {
        return this.basketModel.items.some(it => it.id === item.id);
    }

    setOrderField(field: keyof IOrderForm, value: string) {
        this.order[field] = value;

        if (this.validateOrder()) {
            this.events.emit('order:ready', this.order);
        }
    }

    // getSelectProduct(): IProduct[] {
    //     return this.catalog
    //         .filter(item => item.status === 'closed' && item.isMyBid)
    // }

    validateOrder() {
        const errors: typeof this.formErrors = {};
        if (!this.order.email) {
            errors.email = 'Необходимо указать email';
        }
        if (!this.order.phone) {
            errors.phone = 'Необходимо указать телефон';
        }
        if (!this.order.address) {
            errors.address = 'Необходимо указать адрес';
        }
        this.formErrors = errors;
        this.events.emit('formErrors:change', this.formErrors);
        return Object.keys(errors).length === 0;
    }

    // totalPrice() {


    // }
}



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
    //         // this.catalog.find(it => it.id === id).clearPrice();
    //     });
    // }


    