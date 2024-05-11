export type FormErrors = Partial<Record<keyof IOrder, string>>;

export type OrderResult = Pick<IOrder, 'total'> & {
	id: string;
};

export interface IModal {
	content: HTMLElement;
}

export interface IBasket {
	total: number;
	items: ICard[];
}

export interface IBasketItem {
	counter: number;
	title: string;
	price: number;
}

export interface IAction {
	onClick(event: MouseEvent): void;
}

export interface ICard {
	id: string;
	title: string;
	price: number | null;
	description?: string;
	image?: string;
	category?: string;
	preview?: string;
	button?: HTMLButtonElement;
}

export interface IPage {
	_cardList: HTMLElement;
	_basket: HTMLElement;
	_basket_counter: HTMLElement;
	_pageWrapper: HTMLElement;
}

export interface IOrder extends IContact, IPayment {
	total: number;
	items: string[];
}

export interface IContact {
	email: string;
	phone: string;
}

export interface IPayment {
	payment: string;
	address: string;
}

export interface ILarekApi {
	cdn: string;
	getProductList: () => Promise<ICard[]>;
	getProductItem: (id: string) => Promise<ICard>;
}

export interface IForm {
	valid: boolean;
	errors: string[];
}

export interface ISuccess {
	totalPrice: number;
}

export interface ISuccessActions {
	onClick: () => void;
}
