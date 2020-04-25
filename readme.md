#Gulp 4. Сборка проекта с Panini + SCSS
![alt tag](https://cs7055.userapi.com/c636720/v636720414/68fcf/3FKER3tGqmo.jpg)

##Что включает в себя сборка?

* [gulp-autoprefixer ](https://www.npmjs.com/package/gulp-autoprefixer) - автоматически расставляет вендорные префиксы в CSS в соответствии с сервисом [Can I Use](https://caniuse.com);
* [gulp-cssbeautify](https://www.npmjs.com/package/gulp-cssbeautify) - делаем css красивым;
* [gulp-cssnano](https://www.npmjs.com/package/gulp-cssnano) - сжимает CSS, удаляет пробелы, и последние `;`, делает весь CSS в одну строку;
* [gulp-rename](https://www.npmjs.com/package/gulp-rename) - переименование файлов, добавляет `*.min` к файлам CSS/JS;
* [gulp-strip-css-comments](https://www.npmjs.com/package/gulp-strip-css-comments) - удаляет комментарии в`*.min.css` и `*.min.js`;
* [gulp-sass](https://www.npmjs.com/package/gulp-sass) - компиляция SASS,SCSS в CSS;
* [gulp-group-css-media-queries](https://www.npmjs.com/package/gulp-group-css-media-queries) - обьединяет все медиа запросы по убыванию и записывает в конец файла `style.css` и `style.min.css`;
* [gulp-rigger](https://www.npmjs.com/package/gulp-rigger) -  склеивает разные JS файлы в один;
* [gulp-babel](https://www.npmjs.com/package/gulp-babel); - ES6 => ES5;
* [gulp-uglify](https://www.npmjs.com/package/gulp-uglify) - минификация js;
* [gulp-plumber](https://www.npmjs.com/package/gulp-plumber) - отслеживание ошибок в Gulp;
* [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin) - сжатие и оптимизация изображений;
* [del](https://www.npmjs.com/package/del) - очищает папку Dist;
* [panini](https://www.npmjs.com/package/panini) - Работа с HTML, создает шаблоны и реализует фрагменты кода;
* [gulp-svg-sprite](https://www.npmjs.com/package/gulp-svg-sprite) - создание svg спрайта;
* [gulp-replace](https://www.npmjs.com/package/gulp-replace) - фиксинг возможных багов при сборке svg спрайта;
* [gulp-cheerio](https://www.npmjs.com/package/gulp-cheerio) - удаление лишних атрибутов из svg;
* [gulp-svgmin](https://www.npmjs.com/package/gulp-svgmin) минификация SVG;
* [browser-sync](https://www.npmjs.com/package/browser-sync) - локальный сервер с live reload;
       


##Начало работы
* У вас должны быть установлены Node js и Gulp 
* Устанавливаем пакеты из package.json: `npm i`;
* Основная команда `gulp` запускает слежку за файлами `gulp-watch` и `browserSync`, собирает проект в папку `./dist`;
* Команда `gulp clean` очищает папку `./dist`;

## Как пользоватся?

Работа ведется в папке: **src**; 
### HTML (panini):
* **src/tpl/layouts/default.html** - основной шаблон проекта с подключенными стилями и скриптами. Если вам нужен другой шаблон, то добавляем его в эту же папку

_Пример **default.html**:_
```<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="assets/css/style.min.css">
    ...
</head>
<body>
{{>header}}

{{>body}} <!-- подключение всех страниц -->

{{>footer}}
<script src="assets/js/app.min.js"></script>
</body>
</html>
```
* **src/tpl/** папка для всех страниц проекта. Главная страница index.html с подключенным шаблоном default.html

_Пример **index.html**:_
```
---
layout: default <!-- Указываем название шаблона -->
title: HomePage <!-- Указываем Title страницы -->
---
{{>banner}}
<section>
  <div class="container">
    <!-- подключаем необходимые части -->
    {{>sidebar}}
    {{>content}}
  </div>
</section>
```
* **src/tpl/partial/** директория контентой части проекта и повторяющихся блоков сайта (header, footer), подключаем в нужном месте шаблона  `{{>header}}`, `{{>footer}}` и т.д

_Пример **{{>sidebar}}**:_
```
<div class="sidebar">
    ...
</div>

```
* в папке **partials** можно создавать подпапки для отдельных страниц, на подключение это не влияет
Например создаем папку **../partials/blog/post.html** подключаем просто `{{>post}}` в нужном месте

* Больше информации о плагине **Panini** в [официальном репозитории](https://github.com/foundation/panini);

P.S. с помощью Panini можно создавать повторяющиеся блоки и элементы, миксины, циклы и т.д. Но я еще до конца не раборался в нем

### SCSS:

Основной файл **src/assets/scss/style.scss** все остальные стили импортируем в него
```
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700|Roboto:400,500,700&display=swap&subset=cyrillic");

@import "mixins/media";
@import "utils/variables";
@import "utils/reset";
```
в папке **src/assets/scss/** можно создавать подпапки в любом количестве и импортировать файлы в **style.scss**

Сторонние библиотеки импортируем из папки node_modules.

Например Bootstrap:
* Устанавливаем Bootstrap, пишем в консоли команду `npm install bootstrap --save` 
* Подключаем необходимые блоки:
```
@import "../../../node_modules/bootstrap/scss/functions";
@import "../../../node_modules/bootstrap/scss/variables";
...
```

### JS:
Основной файл  **src/assets/js/app.js** 

в папке **src/assets/js/** можем создавать подпапки и при помощи плагина [gulp-rigger](https://www.npmjs.com/package/gulp-rigger) импортировать части кода в основной файл.

Например создадим папку **components** и добавим туда файл **slider.js**,
Теперь подключаем его в файле **app.js**
```
  //= components/slider.js
```

Сторонние библиотеки так же как и SCSS импортируем в **app.js** из папки node_modules:

```
//= ../../../node_modules/bootstrap/js/dist/util.js
//= ../../../node_modules/bootstrap/js/dist/modal.js
```

### Изображения:
Основная папка:  **src/assets/images** 
Создаем любое количество папок как удобно и пользуемся как обычно)))

Плагин [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin) не много сожмет и оптимизирует ихзображения.
Если вам нужно добавить поддержку других форматов изображений, то идем в **gulpfile.js** и дописывем нужные форматы
```
let path = {
    src: {
        ...
        images: "src/assets/images/**/*.{jpg,jpeg,png,gif,ico,webmanifest,xml}",
    },
    watch: {
        ...
        images: "src/assets/images/**/*.{jpg,jpeg,png,gif,ico,webmanifest,xml}",
}
```
### SVG изображения:
Основная папка:  **src/assets/images/svg** 

Кидаем все svg-изображения в эту папку, на выходе получаем один минифицированный файл **sprite.svg**,
подключаем на странице:
```
<svg class="icon-facebook">
   <use xlink:href="./assets/images/svg/sprite.svg#facebook"></use>
</svg>
```
Где айдишник `#facebook` это изначальное название изображения, который мы скачали и закинули в **src/assets/images/svg**, поменяйте название иконки и поменяется айдишник;

в SCSS создаем файл **icon.scss**, подключаем к **style.scss** и стилизуем выбранную иконку
```
.icon-facebook {
    width: 2rem;
    height: 2rem;
    fill: #fff;
}
```
P.S. У плагина [gulp-cheerio](https://www.npmjs.com/package/gulp-cheerio) есть не большой минус, дело в том что он удалеяет все дефолтные стили изображений, если вам нужно сохранить стили для разноцветных иконок, то лучше подключить такую иконку инлайново на страницу предварительно создав паршел для этой иконки в папке **src/tpl/partials**.