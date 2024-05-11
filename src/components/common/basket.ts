import { IAction, IBasket, IBasketItem, ICard } from '../../types/index';
import { ensureElement, cloneTemplate } from '../../utils/utils';
import { Component } from '../base/component';
import { IEvents } from '../base/events';

export class BasketItem extends Component<IBasketItem> {
	protected _counter: HTMLElement;
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected _deleteButton: HTMLButtonElement;

	constructor(container: HTMLElement, actions?: IAction) {
		super(container);

		this._counter = container.querySelector('.basket__item-index');
		this._title = ensureElement<HTMLElement>('.card__title', container);
		this._price = container.querySelector('.card__price');
		this._deleteButton = container.querySelector('.basket__item-delete');

		this._deleteButton.addEventListener('click', actions.onClick);
	}

	set counter(value: string) {
		this.setText(this._counter, value);
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	set price(value: string) {
		if (value === null) {
			this.setText(this._price, 'Бесценно');
		} else {
			this.setText(this._price, value + ' синапсов');
		}
	}
}

export class Basket extends Component<IBasket> {
	protected _list: HTMLElement;
	protected _total: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);
		this._list = ensureElement<HTMLElement>('.basket__list', this.container);
		this._total = this.container.querySelector('.basket__price');
		this._button = this.container.querySelector('.basket__button');

		this._button.addEventListener('click', () => {
			events.emit('order:open');
		});

		this.items = [];
	}

	set items(items: ICard[]) {
		this._list.replaceChildren();
		if (items.length) {
			const cardBasketTemplate =
				ensureElement<HTMLTemplateElement>('#card-basket');
			items.forEach((item, index) => {
				const basketItem = new BasketItem(cloneTemplate(cardBasketTemplate), {
					onClick: () => this.events.emit('item:remove', item),
				});
				const basketItemNode = basketItem.render({
					title: item.title,
					price: item.price,
					counter: index + 1,
				});
				this.setDisabled(this._button, false);
				this._list.append(basketItemNode);
			});
		} else {
			this.setDisabled(this._button, true);
		}
	}

	set total(total: number) {
		this.setText(this._total, total + ' синапсов');
	}
}
