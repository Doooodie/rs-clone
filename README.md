# Badoone Drive
The project is a Google Drive copy with authorization, ability to upload, download, rename and remove files.

### 6.0. Общее _(максимальный балл - `150`)_.

- Настроен CI/CD. `+10`
  - Каждый PR требует успешного билда. `+5`
  - Каждый PR требует как минимум одного код ревью. `+5`

- Во всём приложении используется единый стиль кода. `+10`
  - Использован ESLint с правилами Airbnb, Typescript, Prettier. `+3`
  - TSConfig настроен на правила `strict` и `noEmplicitAny`. `+3`
  - Использован Stylelint для форматирования CSS кода, подключенный к CRA с помощью CRACO. `+2`
  - Использован EditorConfig. `+2`

- Используется библиотека Material UI. `+40`
  - Приложение выполнено в едином стиле. Все компоненты UI являются компонентами MUI, либо компонентами, совместимыми с ним. `+20`
  - Приложение работает на любых устройствах, вёрстка адаптивная. `+20`

- Для переключения языка и темы используется компонент Drawer библиотеки MUI. `+20`
  - Реализовано переключение тем (светлая/темная). `+10`
  - Реализовано переключение языков при помощи react-i18next. `+10`

- На всех страницах есть Header, реализованный при помощи компонента AppBar библиотеки MUI. `+45`
  - Состояние хедера меняется в зависимости от страницы. На странице диска добавляется строка поиска. `+10`
  - Состояние хедера меняется в зависимости от авторизации. Если пользователь не авторизован - будет кнопка входа. Если авторизован - будет меню пользователя. `+10`
  - Меню пользователя меняет свой цвет в зависимости от его имени. `+10`
  - Меню пользователя содержит первые две буквы его имени. `+5`
  - Через меню пользователя можно выйти из своего аккаунта. `+5`
  - Хедер является липким и всегда остается видимым. `+5`

- Реализован роутинг при помощи react-router. `+15`
  - Переход на диск недоступен, пока пользователь не будет авторизован. `+10`
  - При переходе на диск неавторизованного пользователя произойдет автоматический редирект на лендинг с уже открытым окном авторизации. `+10`
  - При переходе на несуществующую страницу отображается кастомная страница 404. `+5`

### 6.1. Лендинг _(максимальный балл - `200`)_.

- Реализована 3D-анимация глобуса при помощи Three.js и библиотеки react-globe.gl `+50`
  - Глобус меняет текстуру в зависимости от темы. `+10`
  - Глобус меняет свой размер в зависимости от ширины экрана. `+10`
  - Реализованы анимированные полосы. `+10`
  - Расположение и анимация каждой полоски рандомное, и меняется при каждой перезагрузке страницы. `+5`
  - Глобус крутится автоматически. `+5`
  - Глобус можно крутить вручную, причем вне зависимости от направления скролла, анимация будет только горизонтальной. `+5`
  - После скролла глобус продолжает свою idle анимацию. `+5`

- Реализована авторизация и регистрация. `+110`
  - В зависимости от состояния авторизации под кнопкой "Открыть диск" показывается кнопка "Зарегистрироваться", открывающая модальное окно регистрации. `+10`
  - Реализовано модальное окно регистрации/авторизации с полями ввода имени, почты и пароля. `+10`
  - Состояние открытия окна содержится в query-параметрах ссылки. `+10`
  - При вводе имени должно быть не менее трёх символов. `+5`
  - При вводе почты допускается только строка, содержащая в себе почту. `+5`
  - При вводе пароля должно быть не менее 8 символов. Необходима как минимум одна буква верхнего и одна буква нижнего нижнего регистра, а также одно число. `+5`
  - При несоблюдении одной из проверок кнопка войти/зарегистрироваться становится неактивной. `+5`
  - Запросы регистрации и авторизации реализованы через RTK Query. `+60`
    - При успешной регистрации данные о пользователе сохраняются на сервере, и он с этими данными может в дальнейшем заходить на сайт. `+20`
    - При успешной авторизации данные о пользователе сохраняется в localstorage при помощи Redux-Persist. `+20`
    - Если при регистрации/авторизации произошла ошибка на сервере, информация с сервера выводится во всплывающем окне. `+10`
    - После регистрации/авторизации происходит автоматический редирект на страницу диска пользователя. `+10`

- Реализована карусель при помощи react-material-ui-carousel. `+20`
  - Карусель бесконечная. `+5`
  - Есть индикация страниц карусели. `+5`
  - При маленьком размере экрана кнопки перемотки карусели не отображаются. `+5`
  - Карусель можно перематывать при помощи дрэга. `+5`

- Реализован плавный скроллинг при помощи react-scroll `+10`
  - Присутствует плавающая кнопка "Наверх", которая показывается только если страница будет прокручена вниз. `+10`

### 6.2. Проводник _(максимальный балл - `110`)_.

- В проводнике с помощью компонента mui/x-form-data показывается таблица всех файлов пользователя. `+40`
  - В таблице указано имя и расширение каждого файла. `+5`
  - В таблице указана дата изменения каждого файла. `+5`
  - В таблице указан размер каждого файла. `+5`
  - Дата изменения файла интернационализирована. `+5`
  - Размер файла интернационализирован и адаптивен (при размере более 1000 байт указываются килобайты и так далее). `+10`
  - В каждой колонке таблицы есть сортировка. `+10`

- При нажатии правой кнопки мыши или долгом тапе на файле открывается меню файла. `+20`
  - Файл можно переименовать, после чего будет отображаться новое имя. `+10`
  - Файл можно удалить, после чего он пропадет из таблицы. `+10`

- Реализован drag&drop. `+30`
  - При перетаскивании файла в таблицу с файлами открывается модальное окно. `+10`
  - Перетаскивание работает только на таблицу, а не на всю страницу. `+10`
  - Модальное окно содержит анимацию. `+10`

- При нажатии на кнопку "Мой диск" или drag&drop данные о файле оказываются в таблице, включая имя, расширение, размер и дату изменения. `+10`
- Реализован поиск файлов по их имени или расширению. `+10`

### 6.4. Бэкенд _(максимальный балл - `150`)_.

- Реализован сервер nodejs и express. `+30`
- Сервер отдаёт корректные ответы, отдаёт HTTP ошибки с нормальными body, по которым можно понять, что произошло, пишет читаемые логи. `+30`
- Подключение и работа с БД Postgre. `+20`
- Используется ORM Sequelize. `+20`
- Регистрация, аутентификация, авторизация проводятся с помощью JWT. `+20`
- Реализована регистрация. `+5`
- Реализована авторизация. `+5`
- Реализована загрузка файла. `+5`
- Реализовано удаление файла. `+5`
- Реализовано получение списка всех файлов. `+5`
- Работа с файлами ограничивается пользователем. Один пользователь не может получить доступ к файлам другого. `+5`
