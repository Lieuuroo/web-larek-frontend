# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Об архитектуре 

Взаимодействия внутри приложения происходят через события. Модели инициализируют события, слушатели событий в основном коде выполняют передачу данных компонентам отображения, а также вычислениями между этой передачей, и еще они меняют значения в моделях.

## Основные компоненты

### Базовый код 

- ```Api```: Этот класс предназначен для взаимодействия с API с помощью HTTP-запросов. Он содержит основные функции для работы с API, такие как отправка запросов и обработка ответов. В нем есть свойства: ```baseUrl``` (базовый URL для всех запросов API), ```options```  (параметры запроса, которые можно настроить по умолчанию) и методы: ```get(uri: string)```  (отправляет GET запрос на указанный url и возвращает Promise с обработанными handleResponse данными ответа), ```post(uri: string, data: object, method: ApiPostMethods = 'POST')``` (отправляет POST, PUT или DELETE запросы на указанный url с указанными данными data и возвращает Promise с обработанными handleResponse данными ответа), а также защищенный метод  ```handleResponse(response: Response)```  (обрабатывает ответ API, возвращая JSON данные при успешном запросе или отклоняя Promise при ошибке).

- ```Component```: Это абстрактный базовый класс для создания пользовательских компонентов, которые работают с DOM-элементами. Основные методы класса: ```toggleClass(element: HTMLElement, className: string, force?: boolean)``` (переключает заданный класс для element, если force задан, то класс будет добавлен или удален, в зависимости от значения), ```setText(element: HTMLElement, value: unknown)``` (устанавливает текстовое содержимое element с заданным значением value), ```setDisabled(element: HTMLElement, state: boolean)``` - (изменяет статус блокировки элемента),  ```setHidden(element: HTMLElement)``` (скрывает element),  ```setVisible(element: HTMLElement)``` (показывает element),  ```setImage(element: HTMLImageElement, src: string, alt?: string)``` (устанавливает изображение и альтернативный текст alt для element) ```render(data?: Partial<T>): HTMLElement``` (метод для рендера компонента, который принимает необязательные данные data и возвращает корневой DOM-элемент(container)).

- ```EventEmitter```: Этот класс предоставляет методы для управления событиями в приложении, такие как установка и удаление обработчиков, инициирование событий и прослушивание всех событий. В нем есть свойство ```_events``` (карта (Map) для хранения событий и соответствующих подписчиков (Set)) и методы ```on<T extends object>(eventName: EventName, callback: (event: T) => void)```  (устанавливает обработчик callback для события eventName),  ```off(eventName: EventName, callback: Subscriber)``` (снимает обработчик callback для события eventName), ```emit<T extends object>(eventName: string, data?: T)``` (инициирует событие eventName с переданными данными data), ```onAll(callback: (event: EmitterEvent) => void)``` (устанавливает обработчик callback на все события), ```offAll()``` (сбрасывает все обработчики событий, очищая _events) ```trigger<T extends object>(eventName: string, context?: Partial<T>)``` (возвращает коллбек, который вызывает emit для события eventName с контекстом context).

- ```Sample```: Это абстрактный класс для создания моделей данных с поддержкой событий. Он предназначен для управления данными и уведомления других компонентов об изменениях в моделях.

## Элементы и функции в интерфейсах.

### Классы слоя отображения

1. ```Modal```: Этот класс предназначен для работы с модальными окнами в приложении. Он содержит методы для открытия, закрытия и обновления содержимого модального окна, а также обработки событий. Включает в себя свойства ```_content``` и ```closeButton```, которые отвечают за содержимое модального окна и кнопку закрытия соответственно. Методы класса включают в себя:
- ```openModal()``` (открытие модального окна);
- ```closeModal()``` (закрытие модального окна при клике на оверлей или кнопку закрытия);
- ```render(changeButton)``` (отрисовка содержимого модального окна в зависимости от контекста - в карточке или в корзине);
- сеттер ```content```  (установка содержимого модального окна. При вызове он заменяет текущее содержимое `_content` на переданный HTML-элемент value).

2. ```Basket```: Этот класс отвечает за управление корзиной покупок, включая добавление и удаление элементов, а также отображение их в элементе списка корзины на веб-странице. Содержит свойства ```_list``` (элемент списка корзины (HTMLElement), в котором показываются товары), ```_total``` (элемент, в котором отображается общая стоимость товаров в корзине) и ```_button``` (кнопка для действий с корзиной (HTMLButtonElement)). Методы класса включают в себя:
  - ```set items(items: HTMLElement[])``` (устанавливает элементы в корзину. Если элементы items отсутствуют, выводится сообщение о пустой корзине. В противном случае, заменяет содержимое списка корзины на переданные элементы).
    - ```set total(total: number): void``` (устанавливает общую сумму товаров в корзине);

3. ```BasketItem``` : Этот компонент для отображения отдельного товара в корзине покупок. Обеспечивает возможность отображения информации о товаре и выполнения действий с ним. Содержит свойства `````, `````, `````, ````` и методы:
  - ```set counter(value: string): void``` (устанавливает значение счетчика товара);
  - ```set title(value: string): void``` (устанавливает название товара);
  - ```set price(value: string): void``` (устанавливает цену товара).

4. ```Card```: Этот класс управляет карточками в приложении, настраивает их атрибуты, такие как идентификатор, заголовок, цена, изображение, описание и категория. Предоставляет методы для взаимодействия с карточками и их элементами. Обязательные свойства класса: ```_id```, ```_title```, ```_price```. Необязательные: ```_description```, ```_image```, ```_category```, ```_button``` и ```_categoryColor```  (Карта Map для соответствия категорий классам стилей). В классе также есть сеттеры и геттеры для установки значений свойств.

5. ```PaymentForm``` Это специализация формы для управления данными о платеже. Он наследует функциональность базового класса Form<IPayment> и предоставляет дополнительные возможности для управления кнопками выбора метода оплаты и полями адреса доставки. Свойства: ```container``` - HTML-элемент формы данных о платеже, ```events``` - Объект для работы с событиями. Методы:
  - ```set address(value: string)``` (устанавливает значение поля "адрес доставки");
  - ```setPaymentButton(name: string)``` (устанавливает активное состояние для кнопок выбора метода оплаты).

6. ```ContactsForm``` Это специализация формы для управления контактными данными заказа. Наследует классу Form<IOrder>. Содержит свойства ```container``` - HTML-элемент формы контактных данных, и ```events``` - объект для работы с событиями. Методы:
  - ```set phone(value: string)``` (устанавливает значение поля "телефон");
  - ```set email(value: string)``` (устанавливает значение поля "электронная почта").

7. ```Page```: Этот класс управляет страницей в приложении, включая настройку списка продуктов, блокировку и разблокировку страницы, а также обработку событий, связанных с корзиной. Содержит свойства ```_cardList``` (элемент списка карточек продуктов (HTMLElement), в котором отображаются товары на странице), ```_basket``` (элемент корзины (HTMLElement) в header), ```_basket_counter``` (элемент, показывающий количество товаров в корзине) и ```_pageWrapper``` (элемент обертки страницы (HTMLElement), который может быть заблокирован). Методы класса включают в себя:
  - ```set productList(items: HTMLElement[])``` (устанавливает список продуктов, заменяя содержимое списка карточек на переданные элементы):
  - ```set locked(value: boolean)``` (устанавливает состояние блокировки страницы). 

8. ```Success``` Компонент для отображения сообщения об успешном завершении операции или процесса. Наследует классу Component<ISuccess> и обеспечивает возможность закрытия сообщения и отображения общей суммы операции. Не содержит методов. Содержит свойства:
  - ```container``` HTML-элемент, в который будет рендериться сообщение об успешном завершении операции; 
  - ```actions``` Объект, содержащий действия, которые могут быть выполнены при взаимодействии с сообщением (например, закрытие)
  - ```total``` Общая сумма операции, которая будет отображаться в сообщении.

### Классы слоя данных

1. ```LarekApi```: Этот класс предназначен для взаимодействия с API приложения и получения информации о товарах и списках товаров. Он учитывает расположение CDN для правильного формирования путей к изображениям товаров, обеспечивая корректное взаимодействие с внешними сервисами и источниками данных. Включает свойство ```cdn``` только для чтения и следующие методы:
  - ```getProductItem(id: string): Promise<ICard>``` (получает данные о товаре по его идентификатору (id) и возвращает объект с информацией о товаре (ICard), включая URL изображения, сформированный на основе CDN и пути к изображению);
  - ```getProductList(): Promise<ICard[]>``` (получает список товаров из API и возвращает массив объектов с данными о товарах (ICard[]), включая полные URL изображений товаров, которые построенны на CDN и путях к изображениям);
  - ```sendOrder(order: IOrder)``` (выполняет отправку заказа на сервер. Он принимает объект order типа IOrder, который содержит информацию о заказе, а затем выполняет POST-запрос к серверу, отправляя этот объект).

2. ```AppData```: Это основной класс для работы с данными в приложении. Содержит свойства и методы:
  - ```items``` - массив товаров (ICard[]), в котором находятся все товары; 
  - ```catalog``` - массив каталога товаров (ICard[]); 
  - ```basket``` - массив корзины товаров (ICard[]); 
  - ```preview``` - предварительный просмотр идентификатора выбранного товара (null или строка);
  - ```order``` - объект заказа (IOrder) с информацией о текущем заказе: email, телефон, адрес, способ оплаты, общая стоимость и список товаров
  - ```setItems(items: ICard[]): ICard[]``` - устанавливает список элементов для отображения в приложении; 
  - ```setPreview(item: ICard): void``` - устанавливает предпросмотр выбранного элемента;
  - ```addToBasket(item: ICard): void``` - добавляет элемент в корзину;
  - ```removeItem(id: string): void``` - удаляет элемент из корзины по его идентификатору;
  - ```getTotal(): number``` - вычисляет общую стоимость элементов в корзине;
  - ```validatePaymentForm(): boolean``` - проверяет форму оплаты на наличие ошибок и генерирует соответствующие события; 
  - ```validateContactsForm(): boolean``` - проверяет форму контактных данных на наличие ошибок и генерирует соответствующие события; 
  - ```isItemSelected(item: ICard): boolean``` - проверяет, выбран ли указанный элемент;
  - ```setAddress(value: string): void``` - устанавливает значение адреса доставки;
  - ```setPaymentMethod``` - устанавливает метод оплаты;
  - ```setContacts(field: keyof IContact, value: string): void``` - устанавливает значение указанного поля контактных данных и выполняет проверку формы контактов; 
  - ```setOrderData(): void``` - устанавливает данные заказа на основе элементов в корзине и общей суммы; 
  - ```clearOrderForm(): void``` - очищает данные о заказе (форму заказа);
  - ```clearOrder(): void``` - очищает корзину и данные о заказе; 

3. ```Form``` : Это абстрактный класс, создает экземпляр формы, который обрабатывает ввод данных пользователя и отображает сообщения об ошибках. Он принимает два параметра ```container``` (HTML-элемент формы)  и ```events``` (oбъект для работы с событиями). Класс предоставляет следующие методы и свойства: 
  - ```valid``` Свойство для управления доступностью кнопки отправки формы; 
  - ```errors``` Свойство для установки сообщений об ошибках;
  - ```render(state: Partial<T> & IForm)``` Метод для отображения формы с учетом переданного состояния.

Класс также содержит внутренние методы для обработки событий ввода данных и отправки формы. Эти методы генерируют соответствующие события, что позволяет другим частям приложения реагировать на изменения в форме.

## Слой Presenter

Слой Presenter в проекте содержится в файле index.ts и реализуется в основном через объект класса EventEmitter, связывающий даанные и отображение между собой по иницилаизации тех или иных событий.

Список инициируемых событий:

1. ```items:change``` - изменениее массива товаров.  Запускает сеттер объектра класса Page, рендерит карточки товаров в галеерее.

2. ```card:select``` - "выбирает" карточку по клику. Получает данные о товаре, которые необходимо подставить в модальное окно.

3. ```preview:changed``` - получает с сервера данные для конкретногоотвара по id, открывает модально окно, отрендерив в нем карточку конкретного товара.

4. ```item:add``` - срабатывает по клику на кнопку "Купить". Добавляет данные конкретного товара в корзину

5. ```item:remove``` - срабатывает по клику на кнопку удаления в карточке товара в корзине. Удаляет товар и данные о нем.

6. ```modal:open``` - открывает модальное окно приклике на соответстсвующую область. Включает блокировку прокрутки при открытом модальном окне

7. ```modal:close``` - закрывает модальное окно. Отключает блокировку прокрутки

8. ```order:open``` - срабатывает при клике на кнопку "оформить" в корзине, инициирует переключение содержимого модального окна на первую вкладку оформления заказа.

9. ```contacts:open``` - переключает содержимое мощдального окна на форму с контактными данными

10. ```contacts:submit``` - переключает содержимое модального окна на заглушку с сообщением об успешном выполнении заказа.

11. ```basket:open``` - инициируется кликом по иконке корзины и ее открытием. Рендерит в модальное окно добавленные товары, запускает "проверку на пустоту" - при пустой корзине кнопка оформления становится неактивна

12. ```basketList:changed``` - вызывается при изменении содержимого корзины (добавление или удаление товара.)

13. ```paymentMethod:changed``` - инициируется кликом по кнопке того или иного способа оплатыы товара

14. ```formErrors:change``` - вызывается при изменении ошибок в форме.

15. ```/^contacts\..*:change/``` - вызывается при изменении значения поля в форме контактных данных.

16. ```/^order\..*:change/``` - вызывается при изменении значения поля в форме оформления заказа.