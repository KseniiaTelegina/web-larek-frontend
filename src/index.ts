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
import { Card, CardItem } from './components/base/Card';
import { cloneTemplate } from '../src/utils/utils';
import { IProduct } from './types';
import { Basket } from './components/Basket';
import { Order } from './components/Order';
import { appCard } from './components/base/Card';
// import { createElement } from '../src/utils/utils';


const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');


const events = new EventEmitter();
const api = new ProductAPI(CDN_URL, API_URL);

// const basket = new Basket(events);
// export const basketView = new BasketView(document.querySelector('.basket'))
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');


const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const order = new Order(cloneTemplate(orderTemplate), events);



// Переиспользуемые части интерфейса
// const bids = new Basket(cloneTemplate(bidsTemplate), events);
const basket = new Basket(cloneTemplate(basketTemplate), events);




const appData = new AppState({}, events);

api.getCardList()
    .then(appData.setCatalog.bind(appData))
    .catch(err => {
        console.error(err);
    });

//отображение списка продуктов

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


// Открыть карточку продукта

events.on('card:select', (item: IProduct) => {
    appData.setPreview(item);
    
});


// Открыть корзину

events.on('basket:open', () => {
    modal.render({ content: basket.render() });
  });

// открыта корзина

// добавляем в хранилище данные

events.on('basked:add', (item: IProduct) => { appCard.cardInBasket.push(item)});

// Добавление товара в корзину и открытие модального окна корзины
// const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
// const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');


events.on('card:select', (item: IProduct) => {
    const cardBasket = new CardItem(cloneTemplate(basketTemplate), {
        onClick: () => events.emit('basked:add', item),
      });
      modal.render({
        content: cardBasket.render({
            price: item.price,
            title: item.title,
        })
    });
});

// Открыть форму заказа
events.on('order:open', () => {
    modal.render({
        content: order.render({
            address: '',
            // email: '',
            valid: false,
            errors: []
        })
    });
});


// // Продукт открыт
events.on('preview:changed', (item: IProduct) => {
    const showItem = (item: IProduct) => {
        const card = new CardItem(cloneTemplate(cardPreviewTemplate));

        modal.render({
            content: card.render({
                title: item.title,
                image: item.image,
                price: item.price,
                category: item.category,
                description: item.description
            })
        });
    };

    if (item) {
        api.getCardItem(item.id)
            .then((result) => {
                item.description = result.description;
                showItem(item);
            })
            .catch((err) => {
                console.error(err);
            })
    } else {
        modal.close();
    }
});

// Блокируем прокрутку страницы если открыта модалка
events.on('modal:open', () => {
    page.locked = true;
});

// ... и разблокируем
events.on('modal:close', () => {
    page.locked = false;
});





