const { src, dest, watch, parallel, series }  = require('gulp');

const scss          = require('gulp-sass')(require('sass'));
const concat        = require('gulp-concat');
const browserSync   = require('browser-sync').create();
const uglify        = require('gulp-uglify-es').default;
const autoprefixer  = require('gulp-autoprefixer');
const imagemin      = require('gulp-imagemin');
const del           = require('del');
const rename        = require('gulp-rename');

function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'app',
        },
        // proxy: "http://localhost:8888",
        port: 8888,
        open: true,
        notify: false
    });
}

function cleanDist() {
    return del('dist')
}

function images() {
    return src('app/images/**/*')
        .pipe(imagemin(
            [
                imagemin.gifsicle({ interlaced: true }),
                imagemin.mozjpeg({ quality: 75, progressive: true }),
                imagemin.optipng({ optimizationLevel: 5 }),
                imagemin.svgo({
                    plugins: [
                        { removeViewBox: true },
                        { cleanupIDs: false }
                    ]
                })
            ]
        ))
        .pipe(dest('dist/images'))
}

function scripts() {
    return src([
        'app/js/global.js',
        'app/js/home.js',
        'app/js/about-us.js',
        'app/js/faq.js',
        'app/js/article.js'
    ])
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream())
}
function scripts__libs() {
    return src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/slick-carousel/slick/slick.js'
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream())
}


function styles() {
    return src('app/scss/style.scss')
        .pipe(scss({outputStyle: 'compressed'}))
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 version'],
            grid: true
        }))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}
function styles__libs(){
    return src([
        'node_modules/slick-carousel/slick/slick.scss'
    ])
        .pipe(concat('_libs.scss'))
        .pipe(dest('app/scss'))
        .pipe(browserSync.stream())
}

function build() {
    return src([
        'app/css/style.min.css',
        'app/fonts/**/*',
        'app/js/**/*.min.js',
        'app/js/libs.min.js',
        'app/*.html'
    ], {base: 'app'})
        .pipe(dest('dist'))
}

function watching() {
    watch(['app/scss/**/*.scss'], styles);
    watch(['app/js/**/*.js', '!app/js/**/*.min.js'], scripts);
    watch(['app/*.html']).on('change', browserSync.reload);
}

exports.styles = styles;
exports.styles__libs = styles__libs;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.scripts__libs = scripts__libs;
exports.images = images;
exports.cleanDist = cleanDist;


exports.build = series(cleanDist, images, build);
exports.default = parallel(styles__libs ,styles ,scripts__libs ,scripts ,browsersync, watching);

