require.config({
    baseUrl: '/wp-content/themes/rlt/scripts/js/',
    shim: {
        "jquery": {
            exports: '$'
        },
        "chosen": ['jquery'],
    },
    urlArgs: "bust=" + (new Date()).getTime()
});
require(['main']);