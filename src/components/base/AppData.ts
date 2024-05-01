// import {dayjs, formatNumber} from "../utils/utils";

import {Model} from "./Model"
import {FormErrors, IProduct, IAppState, IOrderForm, IBasketModel, IContactsForm, FormErrorsContact } from "../../types/index";
// import {FormErrors, IProduct, IAppState, IOrder, IBasketModel, IOrderForm} from "../../types/index";
import { BasketModel } from "../Basket";
// import { appCard } from "../.."; 

export type CatalogChangeEvent = {
    catalog: IProduct[]
};

// export class LotItem extends Model<IProduct> {
//     selected: boolean;
//     id: string;
//     title: string;
//     image: string;
//     category: string;
//     description?: string;
//     price: number | null;  

//     protected myPrice: number = 0;

// }





export class AppState extends Model<IAppState> {
    
    basket: string[] = [];
    catalog: IProduct[];
    order: IOrderForm = {
        address: '',
        // email: '',
        // phone: '',
        // items: [],
        payment: '',
        // button: ''
    };
    contacts: IContactsForm = {
        email: '',
        phone: '',
    };
    preview: string | null;
    formErrors: FormErrors = {};
    formErrorsContact: FormErrorsContact = {};
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

    // get catalogCards() {
    //     return this.catalog;
    // }

    getTotalPrice() {
        console.log(this.basketModel.items)
        return this.basketModel.getTotal();
    
    }

    setButton(item: IProduct) {
        this.preview = item.id;
        this.emitChanges('preview:changed', item);
    }

    // проверка на наличие продукта в корзине  

    cardInBasket(item: IProduct): boolean {
        return this.basketModel.items.some(it => it.id === item.id);
    }

    setOrderFieldAddressForm(field: keyof IOrderForm, value: string) {
        this.order[field] = value;

        if (this.validateOrderAddressForm()) {
            this.events.emit('order:ready', this.order);
        }
    }

    setOrderFieldContactsForm(field: keyof IContactsForm, value: string) {
        this.contacts[field] = value;

        if (this.validateContactsForm()) {
            this.events.emit('order:ready', this.contacts);
        }
    }

    validateOrderAddressForm() {
        const errors: typeof this.formErrors = {};
        if (!this.order.address) {
            errors.address = 'Необходимо указать адрес';}
        if (!this.order.payment) {
            errors.payment = 'Необходимо выбрать способ оплаты';}
        this.formErrors = errors;
        this.events.emit('formErrorsAddress:change', this.formErrors);
        return Object.keys(errors).length === 0;
    }

    validateContactsForm() {
        console.log(this.contacts);
        const errors: typeof this.formErrorsContact = {};
        if (!this.contacts.email) {
            errors.email = 'Необходимо указать email';
        }
        if (!this.contacts.phone) {
            errors.phone = 'Необходимо указать телефон';
        }
        this.formErrorsContact = errors;
        this.events.emit('formErrorsContact:change', this.formErrorsContact);
        return Object.keys(errors).length === 0;
    }


    clearBasket() {
        // this.order.items.forEach(id => {
        //     const product = this.catalog.find(it => it.id === id);
        //     if (product) {
        //         product.clearProduct();
        //     }
        // });
    
        this.basketModel.items = []; // Очистить список продуктов в заказе
    }
}
