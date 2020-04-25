# Gulp 4. Сборка проекта с Panini + SCSS
![alt tag](https://cs7055.userapi.com/c636720/v636720414/68fcf/3FKER3tGqmo.jpg)

## Что включает в себя сборка?

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
       


## Начало работы
* У вас должны быть установлены Node js и Gulp 
* Устанавливаем пакеты из package.json: `npm i`;
* Основная команда `gulp` запускает слежку за файлами **gulp-watch** и **browserSync**, собирает проект в папку **/dist**;
* Команда `gulp clean` очищает папку `/dist`;

## Как пользоватся?
Работа ведется в папке: **src**; 
### HTML (Panini):

Panini не является полноценным шаблонизатором как PUG, но зато использует привычный HTML синтаксис и позволяет немного автоматизировать работу.

### Шаблон
**src/tpl/layouts/default.html** - основной шаблон проекта с подключенными стилями и скриптами.  Если вам нужен другой шаблон, то добавляем его в эту же папку

Пример **default.html**:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="./assets/css/style.min.css">
    ...
    <title>{{ title }}</title>
</head>
<body>
    {{>header}} <!-- Подключаем header ко всем страницам -->
    
    {{>body}} <!-- подключение страниц -->
    
    {{>footer}} <!-- Подключаем footer ко всем страницам -->
    <script src="./assets/js/app.min.js"></script>
</body>
</html>
```
**src/tpl/** папка для всех страниц проекта.  Главная страница **index.html** с подключенным шаблоном **default.html**  
Сюда же добавляем все другие страницы (**blog.html**, **contact.html** и пр... )

_Пример **index.html**:_
```html
---
layout: default <!-- Указываем название шаблона -->
title: HomePage <!-- Указываем Title страницы -->
---
{{>banner}}
<section>
  <div class="container">
    <!-- подключаем необходимые части -->
    {{>sidebar}}
    {{>blog}
  </div>
</section>
```
### Partials(части)

 **src/tpl/partials/** директория контентой части проекта и повторяющихся блоков сайта (header, footer), подключаем в нужном месте шаблона  `{{>header}}`, `{{>footer}}` и т.д  
Например создадим паршел **sidebar.html** из примера выше

Пример **{{>sidebar}}**:
```html
<div class="sidebar">
    ...
</div>

```
* в папке **partials** можно создавать подпапки для отдельных страниц, на подключение это не влияет  
Например создаем папку blog и паршел post.html **src/tpl/partials/blog/post.html** подключаем просто `{{>post}}` в нужном месте
* Так же можно подключать паршел в паршеле:
```html
<div class="blog">
    {{>post}}
</div>
```

* Больше информации о плагине **Panini** в [официальном репозитории](https://github.com/foundation/panini);

P.S. с помощью Panini можно создавать повторяющиеся блоки и элементы, циклы и т.д. Но я еще до конца не раборался в нем

### SCSS:

Основной файл **src/assets/scss/style.scss** все остальные стили импортируем в него
```scss
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700|Roboto:400,500,700&display=swap&subset=cyrillic");
@import "mixins/media";
@import "utils/variables";
@import "utils/reset";
```
в папке **src/assets/scss/** можно создавать подпапки в любом количестве и импортировать файлы в **style.scss**

Сторонние библиотеки импортируем из папки node_modules.

Например Bootstrap:
* Устанавливаем Bootstrap, пишем в консоли команду `npm install bootstrap --save` 
* Подключаем необходимые блоки в **style.scss**:
```scss
@import "../../../node_modules/bootstrap/scss/functions";
@import "../../../node_modules/bootstrap/scss/variables";
```

### JS:
Основной файл  **src/assets/js/app.js** 

в папке **src/assets/js/** можем создавать подпапки и при помощи плагина [gulp-rigger](https://www.npmjs.com/package/gulp-rigger) импортировать части кода в основной файл.

Например создадим папку **components** и добавим туда файл **slider.js**,
Теперь подключаем его в файле **app.js**
```javascript
document.addEventListener("DOMContentLoaded", () => {

  //= components/slider.js

})
```

Сторонние библиотеки так же как и SCSS импортируем в **app.js** из папки node_modules прописывая путь:

```javascript
//= ../../../node_modules/bootstrap/js/dist/util.js
//= ../../../node_modules/bootstrap/js/dist/modal.js
```
* если вам по каким либо причинам нужен jQuery в 2020+ году  
Пишем в консоли:
```
npm install jQuery --save
```
идем в app.js, подключаем jQuery из node_modules и пользуемся как обычно, импортируем нужные компоненты:

```javascript
//= ../../../node_modules/jquery/dist/jquery.js
$(function() {

    //= components/slider.js

})
```
p.s. `//=` это не комментарий, это rigger так подключает файлы)))

### Изображения:
Основная папка:  **src/assets/images** 
Создаем любое количество папок как удобно и пользуемся как обычно)))
```html
    <img src="./assets/images/banner.jpg" alt="banner">

    <img src="./assets/images/product/tomato.png" alt="product">
```
 или SCSS
```scss
   $product: apple, lemon, tomato, potatoes;
 
   .image  {
     padding: 1rem 0;
     @each $product in $products {
       &--#{$product} {
         background: url('../images/products/#{$product}.png') center / cover;
       }
     }
   }
```

Плагин [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin) не много сожмет и оптимизирует изображения.  
Если вам нужно добавить поддержку других форматов изображений, то идем в **gulpfile.js** и дописываем нужные форматы
```javascript
let path = {
    src: {
        images: "src/assets/images/**/*.{jpg,jpeg,png,gif}",
    },
    watch: {
        images: "src/assets/images/**/*.{jpg,jpeg,png,gif}",
    }
}
```
### SVG иконки:
Основная папка:  **src/assets/images/svg** 

Кидаем все svg-изображения в эту папку, на выходе получаем один минифицированный файл **sprite.svg**,
подключаем на странице:
```html
<svg class="icon-facebook">
   <use xlink:href="./assets/images/svg/sprite.svg#facebook"></use>
</svg>
```
Где айдишник `#facebook` это изначальное название иконки, который мы скачали и закинули в **src/assets/images/svg/**, поменяйте название иконки и поменяется айдишник;

в SCSS создаем файл **icon.scss**, подключаем к **style.scss** и стилизуем выбранную иконку
```scss
.icon-facebook {
    width: 2rem;
    height: 2rem;
    fill: #fff;
    stroke: #000;
    stroke-width: 2;
}
```
P.S. У плагина [gulp-cheerio](https://www.npmjs.com/package/gulp-cheerio) есть не большой минус, дело в том что он удалеяет все дефолтные стили изображений, если вам нужно сохранить стили для разноцветных иконок либо анимировать svg, то лучше подключить такую иконку инлайново на страницу предварительно создав паршел для этой иконки в папке **src/tpl/partials**.

Пример: создали паршел **logo.html:** в **partials/all-page/** подключили в нужном месте(в данном примере в хедере):
```html
<header>
  {{>logo}} <!-- Наш паршел logo -->
  <nav class="nav">
    <a class="nav__link" href="">Home</a>
    <a class="nav__link" href="">About</a>
    <a class="nav__link" href="">Contact</a>
  </nav>
</header>
```
и сам паршел **logo.html** (не путать со спрайтом)
```html
<div class="header__logo">
  <svg class="logo"  viewBox="0 0 622 158" xmlns="http://www.w3.org/2000/svg">
    <path d="M38.024 116.296C31.976 116.296 26.552 115.288 21.752 113.272C16.952 111.16 13.16 108.28 10.376 104.632C7.59201 100.888 6.05601 96.616 5.76801 91.816H19.304C19.688 95.752 21.512 98.968 24.776 101.464C28.136 103.96 32.504 105.208 37.88 105.208C42.872 105.208 46.808 104.104 49.688 101.896C52.568 99.688 54.008 96.904 54.008 93.544C54.008 90.088 52.472 87.544 49.4 85.912C46.328 84.184 41.576 82.504 35.144 80.872C29.288 79.336 24.488 77.8 20.744 76.264C17.096 74.632 13.928 72.28 11.24 69.208C8.64801 66.04 7.35201 61.912 7.35201 56.824C7.35201 52.792 8.55201 49.096 10.952 45.736C13.352 42.376 16.76 39.736 21.176 37.816C25.592 35.8 30.632 34.792 36.296 34.792C45.032 34.792 52.088 37 57.464 41.416C62.84 45.832 65.72 51.88 66.104 59.56H53C52.712 55.432 51.032 52.12 47.96 49.624C44.984 47.128 40.952 45.88 35.864 45.88C31.16 45.88 27.416 46.888 24.632 48.904C21.848 50.92 20.456 53.56 20.456 56.824C20.456 59.416 21.272 61.576 22.904 63.304C24.632 64.936 26.744 66.28 29.24 67.336C31.832 68.296 35.384 69.4 39.896 70.648C45.56 72.184 50.168 73.72 53.72 75.256C57.272 76.696 60.296 78.904 62.792 81.88C65.384 84.856 66.728 88.744 66.824 93.544C66.824 97.864 65.624 101.752 63.224 105.208C60.824 108.664 57.416 111.4 53 113.416C48.68 115.336 43.688 116.296 38.024 116.296Z"/>
    <path d="M101.306 46.888V93.4C101.306 97.24 102.122 99.976 103.754 101.608C105.386 103.144 108.218 103.912 112.25 103.912H121.898V115H110.09C102.794 115 97.3224 113.32 93.6744 109.96C90.0264 106.6 88.2024 101.08 88.2024 93.4V46.888H77.9784V36.088H88.2024V16.216H101.306V36.088H121.898V46.888H101.306Z"/>
    <path d="M172.191 116.296C164.799 116.296 158.08 114.616 152.032 111.256C146.08 107.896 141.375 103.144 137.919 97C134.559 90.76 132.88 83.56 132.88 75.4C132.88 67.336 134.608 60.232 138.064 54.088C141.616 47.848 146.416 43.096 152.464 39.832C158.512 36.472 165.28 34.792 172.768 34.792C180.256 34.792 187.024 36.472 193.072 39.832C199.12 43.096 203.872 47.8 207.327 53.944C210.879 60.088 212.656 67.24 212.656 75.4C212.656 83.56 210.832 90.76 207.184 97C203.632 103.144 198.784 107.896 192.64 111.256C186.496 114.616 179.679 116.296 172.191 116.296ZM172.191 104.776C176.895 104.776 181.311 103.672 185.439 101.464C189.568 99.256 192.88 95.944 195.376 91.528C197.968 87.112 199.264 81.736 199.264 75.4C199.264 69.064 198.016 63.688 195.52 59.272C193.024 54.856 189.76 51.592 185.728 49.48C181.696 47.272 177.328 46.168 172.624 46.168C167.824 46.168 163.408 47.272 159.376 49.48C155.44 51.592 152.272 54.856 149.872 59.272C147.472 63.688 146.271 69.064 146.271 75.4C146.271 81.832 147.424 87.256 149.728 91.672C152.128 96.088 155.296 99.4 159.232 101.608C163.168 103.72 167.487 104.776 172.191 104.776Z"/>
    <path d="M259.261 102.904L283.741 36.088H297.709L266.749 115H251.485L220.525 36.088H234.637L259.261 102.904Z"/>
    <path d="M326.588 46.888V93.4C326.588 97.24 327.404 99.976 329.036 101.608C330.668 103.144 333.5 103.912 337.532 103.912H347.18V115H335.372C328.076 115 322.604 113.32 318.956 109.96C315.308 106.6 313.484 101.08 313.484 93.4V46.888H303.26V36.088H313.484V16.216H326.588V36.088H347.18V46.888H326.588Z"/>
    <path d="M397.473 116.296C390.081 116.296 383.361 114.616 377.313 111.256C371.361 107.896 366.657 103.144 363.201 97C359.841 90.76 358.161 83.56 358.161 75.4C358.161 67.336 359.889 60.232 363.345 54.088C366.897 47.848 371.697 43.096 377.745 39.832C383.793 36.472 390.561 34.792 398.049 34.792C405.537 34.792 412.305 36.472 418.353 39.832C424.401 43.096 429.153 47.8 432.609 53.944C436.161 60.088 437.937 67.24 437.937 75.4C437.937 83.56 436.113 90.76 432.465 97C428.913 103.144 424.065 107.896 417.921 111.256C411.777 114.616 404.961 116.296 397.473 116.296ZM397.473 104.776C402.177 104.776 406.593 103.672 410.721 101.464C414.849 99.256 418.161 95.944 420.657 91.528C423.249 87.112 424.545 81.736 424.545 75.4C424.545 69.064 423.297 63.688 420.801 59.272C418.305 54.856 415.041 51.592 411.009 49.48C406.977 47.272 402.609 46.168 397.905 46.168C393.105 46.168 388.689 47.272 384.657 49.48C380.721 51.592 377.553 54.856 375.153 59.272C372.753 63.688 371.553 69.064 371.553 75.4C371.553 81.832 372.705 87.256 375.009 91.672C377.409 96.088 380.577 99.4 384.513 101.608C388.449 103.72 392.769 104.776 397.473 104.776Z" />
    <path d="M468.27 48.904C470.574 44.392 473.838 40.888 478.062 38.392C482.382 35.896 487.614 34.648 493.758 34.648V48.184H490.302C475.614 48.184 468.27 56.152 468.27 72.088V115H455.166V36.088H468.27V48.904Z"/>
    <path d="M543.301 116.296C535.909 116.296 529.189 114.616 523.141 111.256C517.189 107.896 512.485 103.144 509.029 97C505.669 90.76 503.989 83.56 503.989 75.4C503.989 67.336 505.717 60.232 509.173 54.088C512.725 47.848 517.525 43.096 523.573 39.832C529.621 36.472 536.389 34.792 543.877 34.792C551.365 34.792 558.133 36.472 564.181 39.832C570.229 43.096 574.981 47.8 578.437 53.944C581.989 60.088 583.765 67.24 583.765 75.4C583.765 83.56 581.941 90.76 578.293 97C574.741 103.144 569.893 107.896 563.749 111.256C557.605 114.616 550.789 116.296 543.301 116.296ZM543.301 104.776C548.005 104.776 552.421 103.672 556.549 101.464C560.677 99.256 563.989 95.944 566.485 91.528C569.077 87.112 570.373 81.736 570.373 75.4C570.373 69.064 569.125 63.688 566.629 59.272C564.133 54.856 560.869 51.592 556.837 49.48C552.805 47.272 548.437 46.168 543.733 46.168C538.933 46.168 534.517 47.272 530.485 49.48C526.549 51.592 523.381 54.856 520.981 59.272C518.581 63.688 517.381 69.064 517.381 75.4C517.381 81.832 518.533 87.256 520.837 91.672C523.237 96.088 526.405 99.4 530.341 101.608C534.277 103.72 538.597 104.776 543.301 104.776Z"/>
    <path d="M608.05 23.272C605.554 23.272 603.442 22.408 601.714 20.68C600.082 18.952 599.266 16.84 599.266 14.344C599.266 11.848 600.082 9.73599 601.714 8.00799C603.442 6.27999 605.554 5.41599 608.05 5.41599C610.546 5.41599 612.61 6.27999 614.242 8.00799C615.97 9.73599 616.834 11.848 616.834 14.344C616.834 16.84 615.97 18.952 614.242 20.68C612.61 22.408 610.546 23.272 608.05 23.272ZM614.53 132.136C614.53 139.144 612.754 144.28 609.202 147.544C605.65 150.808 600.466 152.44 593.65 152.44H586.018V141.352H591.49C595.138 141.352 597.682 140.632 599.122 139.192C600.658 137.752 601.426 135.304 601.426 131.848V36.088H614.53V132.136Z"/>
  </svg>
</div>
```
и анимируем наш логотип при помощи CSS:
```scss

.logo {
  padding-left: 1rem;
  width: 100%;
  height: auto;
  stroke-width: 4;
  fill: transparent;
  stroke: #fff;
  position: relative;
  z-index: 5;
  animation: fill .5s ease forwards 3.5s;
}

.logo path:nth-child(1) {
  stroke-dasharray: 418;
  stroke-dashoffset: 418;
  animation: line-animation 2s ease forwards .1s;
}

.logo path:nth-child(2) {
  stroke-dasharray: 314;
  stroke-dashoffset: 314;
  animation: line-animation 2s ease forwards .8s;
}

.logo path:nth-child(3) {
  stroke-dasharray: 433;
  stroke-dashoffset: 433;
  animation: line-animation 2s ease forwards .6s;
}

.logo path:nth-child(4) {
  stroke-dasharray: 355;
  stroke-dashoffset: 355;
  animation: line-animation 2s ease forwards .9s;
}

.logo path:nth-child(5) {
  stroke-dasharray: 314;
  stroke-dashoffset: 314;
  animation: line-animation 2s ease forwards 1.2s;
}

.logo path:nth-child(6) {
  stroke-dasharray: 433;
  stroke-dashoffset: 433;
  animation: line-animation 2s ease forwards 1.5s;
}

.logo path:nth-child(7) {
  stroke-dasharray: 246;
  stroke-dashoffset: 246;
  animation: line-animation 2s ease forwards 1.8s;
}

.logo path:nth-child(8) {
  stroke-dasharray: 433;
  stroke-dashoffset: 433;
  animation: line-animation 2s ease forwards 2.1s;
}

.logo path:nth-child(9) {
  stroke-dasharray: 334;
  stroke-dashoffset: 334;
  animation: line-animation 2s ease forwards 2.4s;
}

@keyframes line-animation {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes fill {
  from {
    fill: transparent;
  }
  to {
    fill: #fff;
  }
}

```

### Шрифты:
Основная папка:  **src/assets/fonts**   
Просто закидываем нужные шрифты в эту папку и подключаем в **style.scss**.