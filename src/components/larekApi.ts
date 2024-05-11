import { Api, ApiListResponse } from './base/api';
import { ICard, ILarekApi, IOrder, OrderResult } from '../types/index';

export class LarekApi extends Api implements ILarekApi {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getProductItem(id: string): Promise<ICard> {
		return this.get(`/product/${id}`).then((item: ICard) => ({
			...item,
			image: this.cdn + item.image,
		}));
	}

	getProductList(): Promise<ICard[]> {
		return this.get('/product').then((data: ApiListResponse<ICard>) =>
			data.items.map((item: ICard) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}

	sendOrder(order: IOrder): Promise<OrderResult> {
		return this.post('/order', order).then((data: OrderResult) => data);
	}
}
