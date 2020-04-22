"use strict";
const {src, dest} = require("gulp"); // чтение и запись исходников
const gulp = require("gulp"); // подключает GULP
const autoprefixer = require("gulp-autoprefixer"); //автопрефикс
const cssbeautify = require("gulp-cssbeautify"); //делаем css красиво
const removeComments = require('gulp-strip-css-comments'); //удалет комментарии в *.min.css
const rename = require("gulp-rename"); // добавляет *.min к файлам
const sass = require("gulp-sass"); // компилятор SASS
const cssnano = require("gulp-cssnano"); // сжимет CSS и удалет пробелы, и последние (;), делает весь CSS в одну строку
const rigger = require("gulp-rigger"); // склеивает разные JS файлы в один
const babel = require('gulp-babel'); // ES6 => ES5
const uglify = require('gulp-uglify'); // Js minification
const plumber = require("gulp-plumber"); // при ошибке в JS не слетают Таски в Gulp
const imagemin = require("gulp-imagemin"); // сжатие и оптимизация изображений
const del = require("del"); // очищает папку Dist
const panini = require("panini"); //  Работа с HTML, создает шаблоны и реализует фрагменты кода
const browsersync = require("browser-sync").create(); // локальный сервер с live reload
const replace = require("gulp-replace"); // меняет '&gt;', '>' в SVG
const cheerio = require("gulp-cheerio"); // удаляет стили из SVG
const svgSprite = require("gulp-svg-sprite"); // собирает все SVG в один файл
const svgmin = require('gulp-svgmin'); // минификация SVG

/* Paths */
let path = {
    build: {
        html: "dist/",
        js: "dist/assets/js/",
        css: "dist/assets/css/",
        images: "dist/assets/images/",
        svg: "dist/assets/images/svg/"
    },
    src: {
        html: "src/*.html",
        js: "src/assets/js/*.js",
        css: "src/assets/scss/style.scss",
        images: "src/assets/images/**/*.{jpg,jpeg,png,gif,ico,webmanifest,xml}",
        svg: "src/assets/images/svg/*.svg"
    },
    watch: {
        html: "src/**/*.html",
        js: "src/assets/js/**/*.js",
        css: "src/assets/scss/**/*.scss",
        images: "src/assets/images/**/*.{jpg,jpeg,png,gif,ico,webmanifest,xml}",
        svg: "src/assets/images/svg/*.svg"
    },
    clean: "./dist"
};

/* Tasks */
function browserSync(done) {
    browsersync.init({
        server: {
            baseDir: "./dist/"
        },
        port: 3000
    });
}

function browserSyncReload(done) {
    browsersync.reload();
}

function html() {
    panini.refresh();
    return src(path.src.html, {
        base: "src/"
    })
        .pipe(plumber())
        .pipe(panini({
            root: 'src/',
            layouts: 'src/tpl/layouts/',
            partials: 'src/tpl/partials/',
            helpers: 'src/tpl/helpers/',
            data: 'src/tpl/data/'
        }))
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream());
}

function css() {
    return src(path.src.css, {
        base: "src/assets/scss/"
    })
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 8 versions'],
            cascade: true
        }))
        .pipe(cssbeautify())
        .pipe(dest(path.build.css))
        .pipe(cssnano({
            zindex: false,
            discardComments: {
                removeAll: true
            }
        }))
        .pipe(removeComments())
        .pipe(rename({
            suffix: ".min",
            extname: ".css"
        }))
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream());
}

function js() {
    return src(path.src.js, {
        base: './src/assets/js/'
    })
        .pipe(plumber())
        .pipe(rigger())
        .pipe(gulp.dest(path.build.js))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min",
            extname: ".js"
        }))
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream());
}

function images() {
    return src(path.src.images)
        .pipe(imagemin())
        .pipe(dest(path.build.images));
}

function svg() {
    return src(path.src.svg)
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
            },
            parserOptions: {xmlMode: true}
        }))
        .pipe(replace('&gt;', '>'))
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: "../sprite.svg",
                }
            }
        }))
        .pipe(dest(path.build.svg));
}


function clean() {
    return del(path.clean);
}

function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.images], images);
    gulp.watch([path.watch.svg], svg);
}

const build = gulp.series(clean, gulp.parallel(html, css, js, images, svg));
const watch = gulp.parallel(build, watchFiles, browserSync);

/* Exports Tasks */
exports.html = html;
exports.css = css;
exports.js = js;
exports.images = images;
exports.svg = svg;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = watch;