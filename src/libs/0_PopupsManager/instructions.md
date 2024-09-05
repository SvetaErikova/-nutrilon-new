#Popup Manager - класс для управления попапами на сайте

##Инструкции по использованию:

1. Создать HTML-элементы для попапа. Обычно все попапы выносятся в отдельный файл в проекте. 
Так как попапы обычно позиционируеются фиксированно относительно окна, то и не размещаются внутри блока.
   * Создаем попап:<br>
     `div.popup(data-popup="name")` - базовая обертка на всю видимую область экрана, обычно используется для затенения и создания зоны, которая закрывает попап на клик вне контента. Дата-атрибут для блока `.popup` указывает какой попап открывать, параметр обязателен и уникален, не должно существовать несколько попапов с одним именем. Например, если внутри меняется только контент, то манипуляции с ним проводятся через хуки в настройках попапа.<br>
   `div.popup__content` - обертка для блока с контентом (например: формой, картинкой или текстом)<br>
   * Создаем кнопки, которые его открывают:<br>
     `(data-openpopup="name")` - дата-атрибут для кнопки, которая указывает какой попап открывать, параметр обязателен
   * Создаем кнопки, Которые его закрывают:<br>
     `(data-closepopup)` - вешается на кнопки, которые должны закрывать попап, например кнопку-крестик или просто кнопку внутри попапа
   * `(data-popup_params="{}")` - атрибут для блока кнопки, который указывает дополнительные параметры для открытия, параметр опционален<br>

2. Стилизовать HTML-элемент попапа. 
   * В базовые стили отнесены (файл стилей находится внутри бибилиотеки, он не редактируется):<br>
     `.noscroll` - класс вешается на <html> и блокирует скролл страницы<br>
     `.popup`, `.popup__content` - центрирование попапа по центру окна и размеры/возможность скролла элемента
   * Внешние стили - стили элементов внутри такие как затемнение, текста, бордеры, настройка кнопки закрытия прописываются к каждому проекту в компонент в проекте, так как сильно отличаются из проекта в проект
   
3. Зарегистрировать попап в JS 
   * Регистрация попапа: структура<br> `PopupManager.register(name, options: {}, hooks: {})`<br>
      Создает объект, с которым работает менеджер<br>
      Пример: `PopupManager.register('popup_for_cookie');`<br>
      **name** - обязательное имя попапа, оно используется в js для нахождения конкретного попапа, который нужно открыть, в примере - `'popup_for_cookie'`<br>
      **options** - необязательные параметры, стандартные параметры, которые могут быть у каждого попапа<br>
      **hooks** - необязательные уникальные дополнительные функции, которые что-то делают с попапом<br>
   
4. Опции:<br>
   is_block_scroll - блокирует скролл на странице пока попап открыт<br>
   close_controls - убирает закрытие по клику на поле вне контента и кнопку Esc, закрытие становится возможно только по клику на кнопку закрытия

5. Хуки:<br>
   Хуки - это функции, которые позволяют совершать манипуляции с конкретным попапом.<br>
   В проекте предусмотрены 2 хука: <br>
   **on_open** - срабатывает до открытия попапа, с помощью него например совершаются манипуляции с контектом до открытия попапа<br>
   **on_close** - срабатывает после закрытия попапа (например очищает форму или контент)<br>

   Пример хука на открытие:<br/>
   `on_open: (popup_element, params) => {
   popup_element.scrollTop = 0;
   let content = document.querySelector("footer")
   let block_content = content.cloneNode(true);
   popup_element.querySelector(".popup__content").append(block_content);
   }` - помещает футер целиком в попап<br>

   Пример хука на закрытие:<br/>
  `on_close: (popup_element, params) => {
   setTimeout(()=>{
   popup_element.querySelector('footer').remove()
   },100)
   }` - удаляет футер из попапа после закрытия<br>
  В функцию передается элемент попапа popup_element, и параметры (например, текст, ссылка на блок и проч.)

6. Ошибки, которые выдаются в консоль, при неправильной работе с менеджером<br>
   PopupManager: No popup registered - отсутствует код регистрации попапа;<br>
   PopupManager: No html element for popup with that name exist - на странице отсутствует html код для попапа с таким именем;<br>

### Распространенные примеры использования
####Простой попап на кнопку
Создаем html-элемент попапа<br>
  ` <div class="popup popup--form" data-popup="popup_for_form"> <div class="popup__content"><div class="popup__close" data-closepopup></div><Form/></div></div>`<br>
Регистрируем попап в js <br>
`PopupManager.register('popup_for_form', {
   is_block_scroll: true, //Блокируем скролл окна
   close_controls: false, //Разрешает закрытие на темную зону и кнопку esc
   }
   );`<br>
Создаем html-элемент кнопку для открытия попапа<br>
  ` <button data-openpopup="popup_for_form">Открыть попап формы</button>`<br>

#### Открытие попапа через js после загрузки страницы с учетом адреса страницы, сессии и таймаута на открытие
  Создаем html-элемент попапа<br>
  ` <div class="popup popup--welcoming" data-popup="popup_for_welcoming"> <div class="popup__content"><div class="popup__close" data-closepopup></div><Banner/></div></div>`<br>
  Регистрируем попап в js <br>
  `PopupManager.register('popup_for_welcoming', {
  is_block_scroll: true, //Блокируем скролл окна
  close_controls: false, //Разрешает закрытие на темную зону и кнопку esc
  }
  );`
  Открываем попап после закрузки страницы <br>
  ` window.addEventListener("load", function(e){ 
      /* Проверка на адрес */
      if ( !window.location.href.match(/booking/) ) {
       /* Проверка на сессию */
       if (!sessionStorage.getItem('popState') != 'shown') {
         /* Таймаут открытия в милисекундах */
         setTimeout(PopupManager.open('popup_for_welcoming'), 5000);
         sessionStorage.setItem('popState','shown');
       }
     }`
#### Открытия сообщения об отправке формы со сменой текста через хуки
Создаем html-элемент попапа<br>
` <div class="popup popup--notification" data-popup="popup_for_notification"> <div class="popup__content"><div class="popup__close" data-closepopup></div><p class="popup__text"></p></div></div>`<br>
Регистрируем попап в js <br>
`PopupManager.register('popup_for_notification', {
is_block_scroll: true, //Блокируем скролл окна
close_controls: false, //Разрешает закрытие на темную зону и кнопку esc
},{
on_open: (popup_element, params) => {
let message_box = popup_element.querySelector('.popup__text');
message_box.textContent = params.text;
},
on_close: (popup_element, params) => {
let message_box = popup_element.querySelector('.popup__text');
message_box.textContent = "";
}
});`
Открываем попап после отправки формы и пишем текст в зависимости от результата <br>
` success: ()=>{
PopupManager.open('popup_for_notification', {text: "Ваше сообщение успешно отправлено})
},
error: ()=>{
PopupManager.open('popup_for_notification', {text: "Что-то пошшло не так, попробуйте обновить страницу})
}`
