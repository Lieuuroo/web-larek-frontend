import { Component } from './base/component';
import { IEvents } from './base/events';
import { ensureElement } from '../utils/utils';

interface IPage {
	productList: HTMLElement[];
	basket: HTMLElement;
}

export class Page extends Component<IPage> {
	protected _cardList: HTMLElement;
	protected _basket: HTMLElement;
	protected _counter: HTMLElement;
	protected _pageWrapper: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this._counter = ensureElement<HTMLElement>('.header__basket-counter');
		this._cardList = ensureElement<HTMLElement>('.gallery');
		this._basket = ensureElement<HTMLElement>('.header__basket');
		this._pageWrapper = ensureElement<HTMLElement>('.page__wrapper');

		this._basket.addEventListener('click', () => {
			this.events.emit('basket:open');
		});
	}

	set counter(value: number) {
		this.setText(this._counter, String(value));
	}

	set productList(items: HTMLElement[]) {
		this._cardList.replaceChildren(...items);
	}

	set locked(value: boolean) {
		if (value === true) {
			this._pageWrapper.classList.add('page__wrapper_locked');
		} else {
			this._pageWrapper.classList.remove('page__wrapper_locked');
		}
	}
}
