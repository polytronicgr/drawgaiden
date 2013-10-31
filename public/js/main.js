require.config({

    baseUrl: 'js',

    paths: {

        'flight': 'contrib/flight/lib',
        'socket.io': '/socket.io/socket.io',
        'simplify': 'contrib/simplify-js/simplify',
        'class': 'contrib/class/class'

    }

});

require([

    'app/app',
    'app/ui/header',
    'app/ui/login',
    'app/ui/canvases',
    'app/ui/usercanvas'

], function ( App, Header, Login, Canvases, UserCanvas ) {
    
    App.init();

    // Attach components
    Header.attachTo( 'header' );
    Login.attachTo( '#user-login' );
    Canvases.attachTo( '#canvases' );
    UserCanvas.attachTo( '#user-canvas' );

});