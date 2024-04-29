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

}





export class AppState extends Model<IAppState> {
    
    basket: string[] = [];
    catalog: IProduct[];
    order: IOrder = {
        address: '',
        email: '',
        phone: '',
        items: [],
        payment: '',
        button: ''
    };
    preview: string | null;
    formErrors: FormErrors = {};
    basketModel: IBasketModel = new BasketModel();
    selectedItem: IProduct;
    price: IProduct;

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

    getTotalPrice() {
        console.log(this.basketModel.items)
        return this.basketModel.items.reduce((total, product) => {
            return total + (product.price || 0);  
        }, 0);  
    }

    setButton(item: IProduct) {
        this.preview = item.id;
        this.emitChanges('preview:changed', item);
    }

    // проверка на наличие продукта в корзине  

    cardInBasket(item: IProduct): boolean {
        return this.basketModel.items.some(it => it.id === item.id);
    }

    // setOrderField(field: keyof IOrderForm, value: string) {
    //     this.order[field] = value;

    //     if (this.validateOrder()) {
    //         this.events.emit('order:ready', this.order);
    //     }
    // }


    setOrderFieldAddressForm(address: keyof IOrderForm, value: string) {
        this.order[address] = value;
   
    
        if (this.validateOrderAddressForm()) {
            this.events.emit('order:ready', { address: this.order.address });
        }
    }
    
    setOrderFieldContactsForm(phone: keyof IOrderForm, email: keyof IOrderForm, value: string) {
        this.order[phone] = value;
        this.order[email] = value;
    
        if (this.validateContactsForm()) {
            this.events.emit('order:ready', { phone: this.order.phone, email: this.order.email });
        }
    }

    validateOrderAddressForm() {
        const errors: typeof this.formErrors = {};
        if (!this.order.address) {
            errors.address = 'Необходимо указать адрес';
        }
        this.formErrors = errors;
        this.events.emit('formErrors:change', this.formErrors);
        return Object.keys(errors).length === 0;
    }

    validateContactsForm() {
        const errors: typeof this.formErrors = {};
        if (!this.order.email) {
            errors.email = 'Необходимо указать email';
        }
        if (!this.order.phone) {
            errors.phone = 'Необходимо указать телефон';
        }
        this.formErrors = errors;
        this.events.emit('formErrors:change', this.formErrors);
        return Object.keys(errors).length === 0;
    }

        // getSelectProduct(): IProduct[] {
    //     return this.catalog
    //         .filter(item => item.status === 'closed' && item.isMyBid)
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


    