// Sources
const SRC_DIR = `_src`;
const DEST_DIR = '_dist';
const CSS_GLOB = `${ SRC_DIR }/assets/styles/main.css`;
const CSS_DEST = `${ DEST_DIR }/assets/styles`;
const CSS_SRC = `${ SRC_DIR }/assets/styles`;
const SCRIPTS_SRC = `${ SRC_DIR }/assets/scripts`;
const SCRIPTS_DEST = `${ DEST_DIR }/assets/scripts`;
const HTML_SRC = `${ SRC_DIR }/html`;
const HTML_DEST = `${ DEST_DIR }`;
const MEDIA_SRC = `${ SRC_DIR }/assets/media`;
const MEDIA_DEST = `${ DEST_DIR }/assets/media`;

let production = false;

module.exports = {
    isProduction: production,
    dir: {
        src: SRC_DIR,
        dest: DEST_DIR
    },

    build: {
        dev: 'development',
        prod: 'production'
    },

    browserSync: {
        server: {
            baseDir: DEST_DIR
        },
        startPath: '',
        port: 3000,
        browser: "google chrome",
        ghostMode: {
            clicks: false,
            scroll: false,
            links: false,
            forms: false
        },
        reload: {
            stream: true,
            once: true
        }

    },

    styles: {
        src: {
            partials: `${ CSS_SRC }/**/*.scss`,
            development: `${ CSS_SRC }/main-dev.scss`,
            production: `${ CSS_SRC }/main.scss`
        },
        dest: CSS_DEST,
        destFileName: 'main',
        watchFiles: [
            `${ CSS_SRC }/main-dev.scss`,
            `${ CSS_SRC }/**/*.scss`,
            `${ CSS_SRC }/**/**/*.scss`
        ],
        autoprefixer: 'last 2 versions'
    },

    html: {
        src: [
            `${ HTML_SRC }/**/*.jade`,
            `!${ HTML_SRC }/base/**/*.jade`,
            `!${ HTML_SRC }/**/_*.jade`,
        ],
        dest: HTML_DEST,
        data: `${ HTML_DEST }/`,
        watchFiles: [
            `${ HTML_SRC }/**/*.jade`,
            `${ HTML_SRC }/**/*.yml`,
            `${ HTML_SRC }/**/*.json`
        ],
        options: { pretty: true }
    },

    browserify: {
        transform: ['babelify'],
        bundleConfigs: [
            {
                entries: [`${ SCRIPTS_SRC }/main.babel.js`],
                dest: `${ SCRIPTS_DEST }/`,
                outputName: 'main.js',
                // require: ['config','libs/modernzr'],
                extensions: ['.js']
            },
            {
                entries: [`${ SCRIPTS_SRC }/head.babel.js`],
                dest: `${ SCRIPTS_DEST }/`,
                outputName: 'head.js',
                // require: ['jquery'],
                extensions: ['.js']
            }
        ]
    },

    copyImg: {
        src: [
            `${ MEDIA_SRC }/images/**/*.{gif,jpeg,jpg,png,svg,webp}`,
            `${ MEDIA_SRC }/images/icons/*.{ico,png,svg}`
        ],
        dest: `${ MEDIA_DEST }/images`,
        watch: [
            `${ MEDIA_SRC }/images/*.{gif,jpeg,jpg,png,svg,webp}`
        ],
        svgoPlugins: [
            { removeViewBox: false },
            { removeUselessStrokeAndFill: false },
            { cleanupIDs: false },
            { removeHiddenElems: false }
        ],
        pngquant: {
            quality: '60-80',
            speed: 4
        }
    },

    copyFonts: {
        src: [ `${ MEDIA_SRC }/fonts/*.{eot,ttf,otf,cff,afm,lwfn,ffil,fon,pfm,pfb,woff,svg,std,pro,xsf}` ],
        dest: `${ MEDIA_DEST }/fonts`
    },

    del: {
        dest: DEST_DIR
    }
}
