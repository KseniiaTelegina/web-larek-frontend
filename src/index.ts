import './scss/styles.scss';

import { EventEmitter, IEvents } from './components/base/events';
// import { CardList } from './components/base/CardList';
import { Api } from './components/base/api';
import { CDN_URL, API_URL } from './utils/constants';
import { Modal } from '../../web-larek-frontend/src/components/base/Modal';
import { ensureElement } from '../src/utils/utils';
import { Page } from './components/base/Page';
import { ProductAPI } from './components/base/ProductAPI';
import { AppState, CatalogChangeEvent } from './components/base/AppData';
import { Card } from './components/base/Card';
import { cloneTemplate } from '../src/utils/utils';
import { IProduct, IOrderForm, IContactsForm } from './types';
import { Basket, BasketModel } from './components/Basket';
import { Order } from './components/Order';
import { appCard } from './components/base/Card';
import { Contacts } from './components/Contacts';
import { Success } from './components/Success';


// import { a} from './components/base/Card';
// import { createElement } from '../src/utils/utils';

// export const appCard: AppCard = {
//     cardInBasket: []
// };

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');

const events = new EventEmitter();
const api = new ProductAPI(CDN_URL, API_URL);

const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const order = new Order(cloneTemplate(orderTemplate), events, {
	onClick: (buttonName) => events.emit('order.payment:change', {field: 'payment', value: buttonName })
});
const contacts = new Contacts(cloneTemplate(contactsTemplate), events);

const appData = new AppState({}, events);


api.getCardList()
	.then(appData.setCatalog.bind(appData))
	.catch((err) => {
		console.error(err);
	});

// Отправлена форма заказа

// events.on('success:open', () => {
//     modal.render({ content: success.render() });
//   });


//отображение списка продуктов

events.on<CatalogChangeEvent>('items:changed', () => {
	page.catalog = appData.catalog.map((item) => {
		const card = new Card(cloneTemplate(cardCatalogTemplate), events, item, false, {
			onClick: () => events.emit('card:select', item),
		});
		return card.render({
			title: item.title,
			image: item.image,
			price: item.price,
			category: item.category,
		});
	});
});

// Открыть карточку продукта

events.on('card:select', (item: IProduct) => {
	appData.setCardPreview(item);
});

// Открыть корзину

events.on('basket:open', () => {
	modal.render({ content: basket.render() });
});



// Отправлена форма заказа
events.on('success:open', () => {
    api.orderProduct(appData.order, appData.contacts, appData.basketModel)
        .then((result) => {
            const success = new Success(cloneTemplate(successTemplate), {
                onClick: () => {
                    modal.close();
                    appData.clearBasket();
                    // events.emit('auction:changed');
                }
            });

            modal.render({
                content: success.render({})
            });
        })
        .catch(err => {
            console.error(err);
        });
});

// Открыть форму заказа с адресом и оплатой

events.on('order:open', () => {
	modal.render(
		// ({ content: order.render() });
		{
			content: order.render({
				address: '',
				payment: '',
				valid: false,
				errors: [],
			}),
		}
	);
});

// Открыть  форму заказа с телефоном и почтой
// условно рабочий вариант
events.on('contacts:open', () => {
	modal.render({
		content: contacts.render({
			phone: '',
			email: '',
			// payment: '',
			valid: false,
			errors: [],
		}),
	});
});

// корзина

events.on('basket:change', () => {
	page.basketCounter = appData.basketModel.items.length

    basket.total = appData.getTotalPrice();
	basket.items = Array.from(appData.basketModel.items).map((basketItem, index) => {
		const item = Array.from(appData.basketModel.items).find(
			(catalogItem) => catalogItem.id === basketItem.id
		);
		const card = new Card(cloneTemplate(cardBasketTemplate), events, item, true, {
			onClick: () => events.emit('basket:change'),
		});
		return card.render({
			index: String(index + 1),
			title: item.title,
			price: item.price,
		});
	});
});

events.on('addInBasket:change', (item: IProduct) => {
	appData.basketModel.add(item);
	events.emit('basket:change');

	const cardBasket = new Card (
		cloneTemplate(cardPreviewTemplate),
		events,
		item,
		appData.cardInBasket(item)
	);
	modal.render({ content: cardBasket.render(item) });
});

events.on('removeFromBasket:change', (item: IProduct) => {
	appData.basketModel.remove(item);
	events.emit('basket:change');
	const cardBasket = new Card (
		cloneTemplate(cardPreviewTemplate),
		events,
		item,
		appData.cardInBasket(item)
	);
	
	modal.render({ content: cardBasket.render(item) });
});

events.on('removeFromBasketInBasket:change', (item: IProduct) => {
	appData.basketModel.remove(item);

});



// // Продукт открыт
events.on('preview:changed', (item: IProduct) => {
	const showItem = (item: IProduct) => {
        const basketItems = appData.basketModel.items;
		const card = new Card (
			cloneTemplate(cardPreviewTemplate),
			events,
			item,
			appData.cardInBasket(item),
		);

		modal.render({
			content: card.render({
				title: item.title,
				image: item.image,
				price: item.price,
				category: item.category,
				description: item.description,
			}),
		});
	};

	if (item) {
		api
			.getCardItem(item.id)
			.then((result) => {
				item.description = result.description;
				showItem(item);
			})
			.catch((err) => {
				console.error(err);
			});
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

// Изменилось состояние валидации формы
events.on('formErrorsAddress:change', (errors: Partial<IOrderForm>) => {
	const { address, payment} = errors;
	order.valid = !address && !payment;
	order.errors = Object.values({ address, payment }).filter((i) => !!i).join('; ');
});

events.on('formErrorsContact:change', (errors: Partial<IContactsForm>) => {
    const { email, phone } = errors;
    contacts.valid = !email && !phone;
    contacts.errors = Object.values({phone, email}).filter(i => !!i).join('; ');
});

// Изменилось одно из полей

events.on(/^order\..*:change/, (data: { field: keyof IOrderForm, value: string }) => {
    appData.setOrderFieldAddressForm(data.field, data.value);
});

events.on(/^contacts\..*:change/, (data: { field: keyof IContactsForm, value: string }) => {
    appData.setOrderFieldContactsForm(data.field, data.value);
});


// выбор оплаты 

events.on('payment:change', () => {

})


