import './scss/styles.scss';

import { EventEmitter, IEvents } from './components/base/events';
// import { CardList } from './components/base/CardList';
import { Api } from './components/base/api';
import { CDN_URL, API_URL } from './utils/constants';
import { Modal } from '../../web-larek-frontend/src/components/base/Modal';
import {ensureElement} from "../src/utils/utils";
import { Page } from './components/base/Page';
import { ProductAPI } from './components/base/ProductAPI';
import { AppState, CatalogChangeEvent } from './components/base/AppData';
import { Card } from './components/base/Card';
import { cloneTemplate } from '../src/utils/utils';
import { ICard } from './types';

const events = new EventEmitter();
const api = new ProductAPI(CDN_URL, API_URL);
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');


const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

const appData = new AppState({}, events);

api.getCardList()
    .then(appData.setCatalog.bind(appData))
    .catch(err => {
        console.error(err);
    });


events.on<CatalogChangeEvent>('items:changed', () => {
    page.catalog = appData.catalog.map(item => {
        const card = new Card(cloneTemplate(cardCatalogTemplate), {
            onClick: () => events.emit('card:select', item)
        });
        return card.render({
            title: item.title,
            image: item.image,
            price: item.price,
            category: item.category
        })
    });
})


// const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
// const successTemplate = ensureElement<HTMLTemplateElement>('#success');
// const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
// const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
// const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
// const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');


// api.getCardList()
//    .then(res => console.log(res))

//    .catch(err => {
//        console.error(err);
//    });;
//     page.counter = appData.getClosedLots().length;
// });

//отсюда
// document.addEventListener('DOMContentLoaded', function () {
//     const apiBaseUrl = API_URL;
//     const api = new Api(apiBaseUrl);
//сюда

    // const eventEmitter = new EventEmitter();

    // const containerModal = document.querySelector('.modal-container') as HTMLImageElement;
    // if (!containerModal) {
    //     console.error('Контейнер для модального окна не найден');
    //     return;
    // }
    // const modal = new Modal(containerModal, eventEmitter);

//отсюда
    // const cardList = new IProductAPI(api);
    // cardList.fetchProducts();
//сюда

    // const cardList = new CardList(api, container);
    // cardList.fetchProoducts();

//отсюда
// })
//сюда

//   Создание экземпляра модального окна
        // const eventEmitter = new EventEmitter();
        // this.modal = new Modal(container, eventEmitter);






// import {AuctionAPI} from "./components/AuctionAPI";
// import {API_URL, CDN_URL} from "./utils/constants";

// import {AppState, CatalogChangeEvent, LotItem} from "./components/AppData";
// import {Page} from "./components/Page";
// import {Auction, AuctionItem, BidItem, CatalogItem} from "./components/Card";
// import {cloneTemplate, createElement, ensureElement} from "./utils/utils";
// import {Modal} from "./components/common/Modal";
// import {Basket} from "./components/common/Basket";
// import {Tabs} from "./components/common/Tabs";
// import {IOrderForm} from "./types";
// import {Order} from "./components/Order";
// import {Success} from "./components/common/Success";

