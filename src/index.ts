import './scss/styles.scss';

import { LarekApi } from './components/larekApi';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { AppData } from './components/appData';
import { Page } from './components/page';
import { Modal } from './components/common/modal';
import { cloneTemplate, createElement, ensureElement } from './utils/utils';
import { ICard } from './types/index';
import { Card } from './components/card';
import { Basket } from './components/common/basket';

const events = new EventEmitter();
const api = new LarekApi(CDN_URL, API_URL);

const cardCatalog = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreview = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasket = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const order = ensureElement<HTMLElement>('#order');
const contacts = ensureElement<HTMLElement>('#contacts');
const success = ensureElement<HTMLElement>('#success');
const modalContent = ensureElement<HTMLElement>('#modal-container');
const test = ensureElement<HTMLElement>('.basket');

const data = {};
const page = new Page(document.body, events);
const appData = new AppData(data, events);
const modal = new Modal(modalContent, events);
const basket = new Basket(cloneTemplate(basketTemplate), events);

events.onAll(({ eventName, data }) => {
	console.log(eventName, data);
});
