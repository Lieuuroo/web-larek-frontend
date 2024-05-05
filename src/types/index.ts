export interface IModal {
    сloseButton: HTMLButtonElement;
	_сontent: HTMLTemplateElement;
	open(): void;
	close(): void;
	render(): HTMLElement;
  }
  
export interface IBasket {
	_list: HTMLElement;
	_total: HTMLElement;
	_button: HTMLButtonElement;
	items: ICard[];
}

  export interface ICard {
      id: string;
      title: string;
	  price: number;
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
  
  export interface IOrder {
	email: string;
	phone: string;
	address: string;
	payment: string;
	total: number;
	items: [];
}

export interface ILarekApi {
	cdn: string;
	getProductList: () => Promise<ICard[]>;
	getProductItem: (id: string) => Promise<ICard>;
}

export interface IAppData {
	items: ICard[];
	catalog: ICard[];
	basket: ICard[];
	preview: null | string;
	order: IOrder;
	setItems(items: ICard[]): [];
	setPreview(item: ICard): void;
	addToBasket(item: ICard): [];
}