// import { Form } from "./Form"; 
// import {IOrderForm} from "../types";
// import {EventEmitter, IEvents} from "./base/events";
// import { ensureElement, ensureAllElements } from "../utils/utils";
// import { Component } from "./base/Component";

// // interface IButtonPayment {
// //     onClick: (tab: string) => void;
// // }

// export class Order extends Form<IOrderForm> {

//     protected _button: HTMLElement;
//     protected _payment: HTMLButtonElement;
//     // protected _buttons: HTMLElement;

//     constructor(protected container: HTMLFormElement, events: IEvents) {
//         // constructor(protected container: HTMLFormElement, events: IEvents, actions?: IButtonPayment) {
//         super(container, events);

//         this._button = container.querySelector('.order__button');
//         // this._buttons = Array.from(container.querySelectorAll('.button_alt'));
//         this._payment = container.querySelector('.button_alt');

//         if (this._button) {
//             this._button.addEventListener('click', () => {
//                 events.emit('contacts:open');
//                 console.log('ку ку ку')
//             });
//         }

//     // для переключения оплаты
//     //     this._buttons.forEach(button => {
//     //         button.addEventListener('click', () => {
//     //             this._buttons.forEach(btn => btn.classList.remove('button_alt-active'));
//     //             button.classList.add('button_alt-active');
//     //         });
//     //     });
//      // this._buttons.forEach(button => {
//         //     button.addEventListener('click', () => {
//         //         actions?.onClick?.(button.name);
//         //         console.log(button.name);
//         //     });
//         // })

//         // if (this._payment) {
//         //     this._payment.addEventListener('click', () => {
//         //         if (this._payment.name === 'card') {
//         //             // Передача параметра 'card' в событие 'payment:change'
//         //             events.emit('payment:change');
//         //             console.log('card');
//         //         } else if (this._payment.name === 'cash') {
//         //             // Передача параметра 'cash' в событие 'payment:change'
//         //             events.emit('payment:change');
//         //             console.log('cash');
//         //         }
//         //     });
//         // }

//         if (this._payment) {
//             this._payment.addEventListener('click', () => {
//                     events.emit('payment:change');
//                     console.log('Способ оплаты выбран');
//             });}
//     }

//     set payment (name: string) {
//         if (this._payment === name) {
//             if (this._payment)
//             this.toggleClass(this._payment, 'button_alt-active', this._payment.name === name);
//             this.setDisabled(this._payment, this._payment.name === name)
//         }
//     }
    
//     // set payment(name: string) {
//     //     this._buttons.forEach(button => {
//     //         this.toggleClass(button, 'button_alt-active', button.name === name);
//     //         this.setDisabled(button, button.name === name)
//     //     });
//     // }

//     set address(value: string) {
//         (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
//     }
// }

import { Form } from "./Form"; 
import {IOrderForm} from "../types";
import {EventEmitter, IEvents} from "./base/events";
import { ensureElement, ensureAllElements } from "../utils/utils";
import { Component } from "./base/Component";

interface IOrderActions {
    onClick: () => void;
}

export class Order extends Form<IOrderForm> {

    protected _button: HTMLElement;
    protected _payment: HTMLButtonElement[];

    // constructor(protected container: HTMLFormElement, protected events: IEvents) {
                constructor(protected container: HTMLFormElement, events: IEvents, actions?: IButtonPayment) {
        super(container, events);

        this._button = container.querySelector('.button.order__button');
        this._payment = Array.from(container.querySelectorAll('.button.button_alt'));

        if (this._button) {
            this._button.addEventListener('click', () => {
                events.emit('contacts:open');
                console.log('ку ку ку')
            });
        }

        // // Добавляем валидацию для кнопки выбора оплаты
        // this.container.addEventListener('change', () => {
        //     const selectedPayment = this._payment.find(btn => btn.classList.contains('button_alt-active'));
        //     const paymentValid = !!selectedPayment;
        //     const addressValid = !!this.container.elements.namedItem('address').value;

        //     this.valid = paymentValid && addressValid;
        // });

    // для переключения оплаты
        // this._payment.forEach(button => {
        //     button.addEventListener('click', () => {
        //         this._payment.forEach(btn => btn.classList.remove('button_alt-active'));
        //         button.classList.add('button_alt-active');
        //         console.log('Выбрана оплата', button.name)

        //         //    // После изменения оплаты, проверяем валидность формы
        //         //    const addressValid = !!this.container.elements.namedItem('address').value;
        //         //    this.valid = addressValid;
        //     });
        // });
        this._payment.forEach(button => {
            button.addEventListener('click', () => {
                actions?.onClick?.(button.name);

            });
        })


                //    // После изменения оплаты, проверяем валидность формы
                //    const addressValid = !!this.container.elements.namedItem('address').value;
        //         //    this.valid = addressValid;
        //     });
        // });
        
    }


        set payment (name: string) {
        if (this._payment === name) {
            if (this._payment)
            this.toggleClass(this._payment, 'button_alt-active', this._payment.name === name);
            this.setDisabled(this._payment, this._payment.name === name)
        }
    }


    set address(value: string) {
        (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
    }
}
