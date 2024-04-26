// import {dayjs, formatNumber} from "../utils/utils";

import {Model} from "./Model"
import {FormErrors, IProduct, IAppState, IOrder, IBasketModel } from "../../types/index";
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
    basketModel: IBasketModel;
    selectedItem: IProduct;

    setCatalog(items: IProduct[]) {
        this.catalog = items;
        this.emitChanges('items:changed', { catalog: this.catalog });
    }

    setPreview(item: IProduct) {
        this.selectedItem = item;
        this.emitChanges('items:change', item);
      }



    // проверка на наличие продукта в корзине  

    cardInBasket(item: IProduct) {
        
    }





    // добавление в корзину

    addToBasket(item: IProduct) {
        this.basketModel.items.push(item);
        // this.price += item.price;
        this.emitChanges('basket:change', this.basketModel.items);
      }

    // удаление из корзины

    removeFromBasket(item: IProduct) {
        this.preview = item.id;
        this.emitChanges('basket:change', this.basketModel.items);
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

