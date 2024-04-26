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
import { Card, CardPreview } from './components/base/Card';
import { cloneTemplate } from '../src/utils/utils';
import { IProduct, ICard } from './types';
import { Basket } from './components/Basket';
import { Order } from './components/Order';
import { appCard } from './components/base/Card';
// import { a} from './components/base/Card';
// import { createElement } from '../src/utils/utils';

// export const appCard: AppCard = {
//     cardInBasket: []
// };

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
// const cardList = new CardItem(cloneTemplate(cardBasketTemplate), events);

// const cardItemBasket = new CardItem(cloneTemplate(cardBasketTemplate), ), {


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
    appData.setCardPreview(item);
});


// Открыть корзину

events.on('basket:open', () => {
    modal.render({ content: basket.render() });
  });


// корзина
events.on('basket:change', () => {
    basket.items = Array.from(appData.basketModel.items).map((basketItem) => {
        const item = Array.from(appData.basketModel.items).find((catalogItem) => catalogItem.id === basketItem.id);
        const card = new Card(cloneTemplate(cardBasketTemplate), {
      onClick: () => events.emit('basket:change', item)
    });
    return card.render(item);
  });
});
//


events.on('add-basket:change', (item: IProduct) => {
    appData.basketModel.add(item);
    events.emit('basket:change');

    const card = new CardPreview(cloneTemplate(cardPreviewTemplate), events, item, appData.cardInBasket(item) )
    modal.render({ content: card.render(item) });
});

events.on('remove-basket:change', (item: IProduct) => {
    appData.basketModel.remove(item);
    events.emit('basket:change');

    const card = new CardPreview(cloneTemplate(cardPreviewTemplate), events, item, appData.cardInBasket(item) )
    modal.render({ content: card.render(item) });
})




// events.on('basket:add', (item: IProduct) => {
//     appCard.addToCart(item);
//     console.log('Item has been added to the shopping cart:', item);
// });


  
//   events.on('basket:add', (item: IProduct) => {
//     // Добавление товара в список корзины
//     appCard.cardInBasket.push(item);
    
//     // Функция загрузки информации о товаре и отображения его в модальном окне корзины
//     const fetchAndShowItemInBasket = async () => {
//         try {
//             // Загрузка дополнительной информации о товаре
//             const result = await api.getOpenBasket(item.id);
            
//             // Обновление информации о товаре
//             const updatedItem = {
//                 ...item,
//                 title: result.title,
//                 price: result.price
//             };

//             // Создание экземпляра корзины и отображение товара в модальном окне
//             const cardBasket = new Basket(cloneTemplate(cardBasketTemplate), events);
//             modal.render({
//                 content: cardBasket.render({
//                     title: updatedItem.title,
//                     price: updatedItem.price
//                 })
//             });

//             // Возможно, при желании, можно также эмитировать событие изменения корзины
//             events.emit('basket:changed');

//         } catch(err) {
//             console.error('Ошибка при загрузке данных товара:', err);
//             modal.close(); // Закрыть модальное окно в случае ошибки
//         }
//     };

//     // Вызов функции загрузки и отображения
//     if (item) {
//         fetchAndShowItemInBasket();
//     } else {
//         modal.close(); // Закрыть модальное окно, если товар отсутствует
//     }
// });







// events.on('basket:add', (item: IProduct) => {
//     // Добавление товара в 'cardInBasket'
//     appCard.cardInBasket.push(item);
//     // events.emit('basket:changed');
    
//     // Функция для отображения товара в корзине через модальное окно
//     const showItemBasket = (item: IProduct) => {
//         const cardBasket = new Basket(cloneTemplate(cardBasketTemplate), events);
//         modal.render({
//             content: cardBasket.render({
//                 title: item.title,
//                 price: item.price
//             })
//         });
//     };

//     // Проверка на наличие объекта товара, и дальнейшая загрузка данных с сервера
//     if (item) {
//         api.getOpenBasket(item.id)
//             .then((result) => {
//                 // Обновление данных товара
//                 item.title = result.title;
//                 item.price = result.price;
//                 showItemBasket(item); // Отображение товара в корзине
//             })
//             .catch((err) => {
//                 console.error(err); // Обработка возможных ошибок
//             });
//     } else {
//         modal.close(); // Закрытие модального окна, если товар отсутствует
//     }
// });


// Добавление товара в корзину и открытие модального окна корзины
// const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
// const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');


// events.on('card:select', (item: IProduct) => {
//     const cardBasket = new CardItem(cloneTemplate(basketTemplate), {
//         onClick: () => events.emit('basked:add', item),
//       });
//       modal.render({
//         content: cardBasket.render({
//             price: item.price,
//             title: item.title,
//         })
//     });
// });

// events.on('card:select', (item: IProduct) => {
//     const cardBasket = new CardItem(cloneTemplate(basketTemplate), {
//         onClick: () => events.emit('basket:add', item),
//     });
//     modal.render({
//         content: cardBasket.render({
//             price: item.price,
//             title: item.title,
//         })
//     });
// });



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
        const card = new CardPreview(cloneTemplate(cardPreviewTemplate), events, item, appData.cardInBasket(item));

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





