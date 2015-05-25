/**
 * Created by CaptainMao on 5/17/15.
 */
requirejs.config({
    baseUrl: 'js',
    shim: {
        d3: {
            exports: 'd3'
        }
    },
    paths: {
        d3: 'lib/d3.min'
    }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['main']);