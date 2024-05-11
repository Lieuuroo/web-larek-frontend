import { Form } from './common/form';
import { IPayment } from '../types/index';
import { IEvents } from './base/events';

export class PaymentForm extends Form<IPayment> {
	protected _buttonsPayment: HTMLButtonElement[];
	protected _buttonChange: HTMLButtonElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
		this._buttonsPayment = Array.from(
			container.querySelectorAll('.button_alt')
		);
		this._buttonsPayment.forEach((button) => {
			button.addEventListener('click', () => {
				events.emit('paymentMethod:changed', button);
			});
		});

		this._buttonChange = container.querySelector('.order__button');

		this._buttonChange.addEventListener('click', () => {
			events.emit('contacts:open');
		});
	}

	set address(value: string) {
		(this.container.elements.namedItem('address') as HTMLInputElement).value =
			value;
	}

	setPaymentButton(name: string): void {
		this._buttonsPayment.forEach((button) => {
			this.toggleClass(button, 'button_alt-active', button.name === name);
		});
	}
}
