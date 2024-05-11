import { ICard, IOrder, FormErrors, IContact } from '../types/index';
import { ISample } from './base/sample';

export class AppData extends ISample<ICard> {
	items: ICard[] = [];
	catalog: ICard[] = [];
	basket: ICard[] = [];

	preview: null | string;

	order: IOrder = {
		email: '',
		phone: '',
		address: '',
		payment: 'card',
		total: 0,
		items: [],
	};

	formErrors: FormErrors = {};

	setItems(items: ICard[]) {
		this.items = items;
		this.events.emit('items:change', this.items);
		return this.items;
	}

	setPreview(item: ICard) {
		this.preview = item.id;
		this.events.emit('preview:changed', item);
	}

	addToBasket(item: ICard) {
		if (this.basket.includes(item)) return;
		this.basket.push(item);
		this.events.emit('basketList:changed', this.basket);
	}

	removeItem(id: string): void {
		this.basket = this.basket.filter((item) => item.id !== id);
		this.emitChanges('basketList: changed', this.basket);
	}

	getTotal(): number {
		return this.basket.reduce((acc, curr) => acc + curr.price, 0);
	}

	validatePaymentForm() {
		const errors: typeof this.formErrors = {};
		if (!this.order.address) {
			errors.address = 'Необходимо указать адрес';
		}
		if (!this.order.payment) {
			errors.payment = 'Необходимо выбрать метод оплаты';
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

	isItemSelected(item: ICard): boolean {
		return this.basket.includes(item);
	}

	setAddress(value: string): void {
		this.order.address = value;
		this.validatePaymentForm();
	}

	setPaymentMethod(value: string): void {
		this.order.payment = value;
		this.validatePaymentForm();
	}

	setContacts(field: keyof IContact, value: string) {
		this.order[field] = value;
		this.validateContactsForm();
	}

	setOrderData(): void {
		this.order.items = [];
		this.basket.forEach((item) => {
			if (item.price !== null) {
				this.order.items.push(item.id);
			}
		});

		this.order.total = this.getTotal();
	}

	clearOrderForm(): void {
		this.order = {
			payment: '',
			address: '',
			email: '',
			phone: '',
			items: [],
			total: 0,
		};
	}

	clearOrder(): void {
		this.basket = [];
		this.emitChanges('basketList: changed', this.basket);
		this.clearOrderForm();
	}
}
