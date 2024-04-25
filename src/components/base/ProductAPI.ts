import { CDN_URL } from "../../utils/constants";
import { Api, ApiListResponse } from "./api"
// import { Product, EventEmitter} from "../../types/index";
import { ICard, OpenCard, IOrderResult, IOrder } from "../../types/index";
import { Modal } from './Modal';

export interface IProductAPI {
    getCardList: () => Promise<ICard[]>;
    getCardItem: (id: string) => Promise<ICard>;
    getOpenCard: (id: string) => Promise<OpenCard>;
    // placeBid(id: string, bid: IBid): Promise<LotUpdate>;
    orderCard: (order: IOrder) => Promise<IOrderResult>;
}

export class ProductAPI extends Api implements IProductAPI {
    readonly cdn: string;

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }

    getCardItem(id: string): Promise<ICard> {
        return this.get(`/product/${id}`).then(
            (item: ICard) => ({
                ...item,
                // image: this.cdn + item.image,
                description: item.description
            })
        );
    }

    getOpenBasket(id: string): Promise<ICard> {
        return this.get(`/product/${id}`).then(
            (item: ICard) => ({
                ...item,
                // image: this.cdn + item.image,
                title: item.title,
                price: item.price
            })
        );
    }

    getOpenCard(id: string): Promise<OpenCard> {
        return this.get(`/product/${id}`).then(
            (data: OpenCard) => data
        );
    }

    getCardList(): Promise<ICard[]> {
        return this.get('/product').then((data: ApiListResponse<ICard>) =>
            data.items.map((item) => ({
                ...item,
                image: this.cdn + item.image
            }))
        );
    }

    // placeBid(id: string, bid: IBid): Promise<LotUpdate> {
    //     return this.post(`/lot/${id}/_bid`, bid).then(
    //         (data: ICard) => data
    //     );
    // }

    orderCard(order: IOrder): Promise<IOrderResult> {
        return this.post('/order', order).then(
            (data: IOrderResult) => data
        );
    }
}




//отсюда
// export class CardList {
//     private products: Product[] = [];
//     private api: Api;
//сюда

    // private modal: Modal;

//отсюда
    // constructor(api: Api) {
 //сюда

    // constructor(api: Api, modal: Modal) {

 //отсюда       
        // this.api = api;
//сюда

        // this.modal = modal;
        // Создание экземпляра модального окна
        // const eventEmitter = new EventEmitter();
        // this.modal = new Modal(container, eventEmitter);
        // const modal = new Modal('.modal');
        // const eventEmitter = new EventEmitter();
//отсюда 
    // }
//сюда

//отсюда 
    // fetchProoducts(): Promise<void> {
    //     return this.api.get('/product')
    //       .then((response: ApiListResponse<Product>) => {
    //         console.log("Received products:", response.items);
    //         this.products = response.items;
    //         this.render();
    //       })
    //       .catch(error => console.error('Ошибка в получении списка карточек продуктов:', error));
    // }
    // render() {
    //     const galleryElement = document.querySelector('.gallery');
    //     const template = document.getElementById('card-catalog') as HTMLTemplateElement;
    //     if (!galleryElement || !template) {
    //         console.error('Элементы не найдены');
    //         return;
    //     }
    // galleryElement.innerHTML = '';

    //     this.products.forEach((product) => {
    //         const productElement = document.importNode(template.content, true);
        
    //         const cardButton = productElement.querySelector('.gallery__item.card');
    //         const cardCategory = productElement.querySelector('.card__category');
    //         const cardTitle = productElement.querySelector('.card__title');
    //         const cardImage = productElement.querySelector('.card__image') as HTMLImageElement;
    //         const cardPrice = productElement.querySelector('.card__price');
        
    //         if (cardButton && cardCategory && cardTitle && cardImage && cardPrice) {
    //             cardCategory.textContent = product.category;
    //             cardTitle.textContent = product.title;
    //             cardImage.src = CDN_URL + product.image;
    //             cardImage.alt = product.title;
    //             cardPrice.textContent = `${product.price} синапсов`;
 //сюда               
                // cardButton.addEventListener('click', () => {
                //     console.log(`Product: ${product.title} clicked!`);
                // });

//отсюда 
                // cardButton.addEventListener('click', () => {


                //    console.log('работает')
 //сюда

                    // this.modal.content = productElement.cloneNode(true) as HTMLElement;
                    // this.modal.open();
                    // const productDetails = document.importNode(document.getElementById('card-preview').content, true);
                    // const productCard = document.getElementById('card-preview') as HTMLTemplateElement;
                    // const productDetails = document.importNode(productCard.content, true);
                    // this.prepareProductDetails(productDetails, product);

                    // this.modal.content(productCard);
                    // this.modal.open();

//отсюда 
    //             });

    //             galleryElement.appendChild(productElement);
    //         } else {
    //             console.error('Элемент не найден');
    //         }
    //     });
    // }
//сюда



























//     private prepareProductDetails(element: DocumentFragment, product: Product) {
//     const previewTemplate = document.getElementById('card-preview') as HTMLTemplateElement;
//     const modal = document.importNode(previewTemplate.content, true);
//     const modalImage = modal.querySelector('.modal__container.card__image') as HTMLImageElement;
//     const modalCategory = modal.querySelector('.modal__container.card__category') as HTMLElement;
//     const modalTitle = modal.querySelector('.modal__container.card__title') as HTMLElement;
//     const modalText = modal.querySelector('.modal__container.card__text') as HTMLElement;
//     const modalPrice = modal.querySelector('.modal__container.card__price') as HTMLElement;
//     const modalButton = modal.querySelector('.button') as HTMLElement;
//     const modalClose = modal.querySelector('.modal__close') as HTMLElement;
    
//     modalTitle.textContent = product.title;
//     modalText.textContent = product.description;
//     modalPrice.textContent = `${product.price} синапсов`;
//     modalCategory.textContent = product.category;
//     modalImage.src = CDN_URL + product.image;
//     modalButton.addEventListener('click', () => 
//         console.log('В корзину'));
//     modalClose.addEventListener('click', () => 
//         console.log('Закрыть'));
// // }
// }

// private prepareProductDetails(element: DocumentFragment, product: Product) {
//     const previewTemplate = document.getElementById('card-preview') as HTMLTemplateElement;
//     const modal = document.importNode(previewTemplate.content, true);
//     const modalImage = modal.querySelector('.modal__container.card__image') as HTMLImageElement;
//     const modalCategory = modal.querySelector('.modal__container.card__category') as HTMLElement;
//     const modalTitle = modal.querySelector('.modal__container.card__title') as HTMLElement;
//     const modalText = modal.querySelector('.modal__container.card__text') as HTMLElement;
//     const modalPrice = modal.querySelector('.modal__container.card__price') as HTMLElement;
//     const modalButton = modal.querySelector('.button') as HTMLElement;
//     const modalClose = modal.querySelector('.modal__close') as HTMLElement;
    
//     modalTitle.textContent = product.title;
//     modalText.textContent = product.description;
//     modalPrice.textContent = `${product.price} синапсов`;
//     modalCategory.textContent = product.category;
//     modalImage.src = CDN_URL + product.image;
//     modalButton.addEventListener('click', () => 
//         console.log('В корзину'));
//     modalClose.addEventListener('click', () => 
//         console.log('Закрыть'));
// }



// function showPreview(product) {
//     const modalContainer = document.querySelector('.modal__container');
//     const modal = document.querySelector('.modal');
//     const template = document.getElementById('card-preview').content.cloneNode(true);
  
//     modal.querySelector('.card__image').src = CDN_URL + product.image;
//     modal.querySelector('.card__category').textContent = product.category;
//     modal.querySelector('.card__title').textContent = product.title;
//     modal.querySelector('.card__text').textContent = product.description;  // Добавьте описание в объект продукта, если нужно
//     modal.querySelector('.card__price').textContent = `${product.price} синапсов`;

//     document.querySelector('.modal__close').addEventListener('click', function() {
//         modal.style.display = 'none';
//     });

//     modal.style.display = 'flex';
// }
