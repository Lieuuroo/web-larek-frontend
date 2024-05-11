import './scss/styles.scss';

import { LarekApi } from './components/larekApi';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { AppData } from './components/appData';
import { Page } from './components/page';
import { Modal } from './components/common/modal';
import { cloneTemplate, ensureElement } from './utils/utils';
import { ICard, IOrder, IContact } from './types/index';
import { Card } from './components/card';
import { Basket } from './components/common/basket';
import { PaymentForm } from './components/payment';
import { ContactsForm } from './components/order';
import { Success } from './components/success';

const events = new EventEmitter();
const api = new LarekApi(CDN_URL, API_URL);

const cardCatalog = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreview = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const order = ensureElement<HTMLTemplateElement>('#order');
const contacts = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const modalContent = ensureElement<HTMLElement>('#modal-container');

const data = {};
const page = new Page(document.body, events);
const appData = new AppData(data, events);
const modal = new Modal(modalContent, events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const paymentForm = new PaymentForm(cloneTemplate(order), events);
const contactsForm = new ContactsForm(cloneTemplate(contacts), events);

events.onAll(({ eventName, data }) => {
	console.log(eventName, data);
});

events.on('items:change', (items: ICard[]) => {
	page.productList = items.map((item) => {
		const card = new Card(cloneTemplate(cardCatalog), {
			onClick: () => events.emit('card:select', item),
		});
		return card.render(item);
	});
});

events.on('item:add', (item: ICard) => {
	appData.addToBasket(item);
	modal.close();
});

events.on('item:remove', (item: ICard) => {
	appData.removeItem(item.id);
	modal.render({
		content: basket.render({
			items: appData.basket,
			total: appData.getTotal(),
		}),
	});
});

events.on('basket:open', (items: HTMLElement[]) => {
	modal.render({
		content: basket.render({
			items: appData.basket,
			total: appData.getTotal(),
		}),
	});
});

events.on('basketList:changed', (items: ICard[]) => {
	page.counter = Object.keys(items).length;
	appData.basket = items;
});

events.on('card:select', (item: ICard) => {
	appData.setPreview(item);
});

events.on('order:open', () => {
	modal.render({
		content: paymentForm.render({
			payment: '',
			address: '',
			valid: false,
			errors: [],
		}),
	});
});

events.on('paymentMethod:changed', (paymentType: HTMLButtonElement) => {
	paymentForm.setPaymentButton(paymentType.name);
	appData.setPaymentMethod(paymentType.name);
});

events.on('contacts:open', () => {
	modal.render({
		content: contactsForm.render({
			email: '',
			phone: '',
			valid: false,
			errors: [],
		}),
	});
});

events.on('contacts:submit', () => {
	appData.setOrderData();
	api
		.sendOrder(appData.order)
		.then(() => {
			const success = new Success(
				cloneTemplate(successTemplate),
				{
					onClick: () => {
						modal.close();
						appData.clearOrder();
					},
				},
				appData.getTotal()
			);

			modal.render({
				content: success.render({}),
			});

			paymentForm.setPaymentButton('');
			appData.clearOrder();
		})
		.catch((err) => {
			console.error(err);
		});
});

events.on('preview:changed', (item: ICard) => {
	const card = new Card(cloneTemplate(cardPreview), {
		onClick: () => events.emit('item:add', item),
	});
	const showCard = (item: ICard) => {
		modal.render({
			content: card.render({
				image: item.image,
				category: item.category,
				title: item.title,
				description: item.description,
				price: item.price,
			}),
		});
	};

	if (appData.isItemSelected(item)) {
		card.setDisabled(card._button, true);
		card.markAsSelected();
	} else {
		card.setDisabled(card._button, false);
	}

	if (item) {
		api
			.getProductItem(item.id)
			.then((result) => {
				item.description = result.description;
				showCard(item);
			})
			.catch((err) => {
				console.error(err);
			});
	} else {
		modal.close();
	}
});

events.on('formErrors:change', (errors: Partial<IOrder>) => {
	const { email, phone, address, payment } = errors;
	paymentForm.valid = !address && !payment;
	contactsForm.valid = !email && !phone;
	paymentForm.errors = Object.values({ address, payment })
		.filter((i) => !!i)
		.join('; ');
	contactsForm.errors = Object.values({ phone, email })
		.filter((i) => !!i)
		.join('; ');
});

events.on(
	/^contacts\..*:change/,
	(data: { field: keyof IContact; value: string }) => {
		appData.setContacts(data.field, data.value);
	}
);

events.on(/^order\..*:change/, (data: { value: string }) => {
	appData.setAddress(data.value);
});

events.on('modal:open', () => {
	page.locked = true;
});

events.on('modal:close', () => {
	page.locked = false;
});

api
	.getProductList()
	.then(appData.setItems.bind(appData))
	.catch((err) => console.log(err));
