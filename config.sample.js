module.exports = {

    logDirectory : '/var/log/drawgaiden',

    db : {
        // RethinkDB Instance
        rethinkdb: {
            host : 'localhost',
            port : 28015,
            db   : 'drawgaiden'
        },
        // Redis Instance
        redis: {
            host : 'localhost',
            port : 6379
        }
    },

    // Port to run Draw Gaiden on
    port : 3000,

    // Canvas Size
    canvasSize : {
        width  : 2000,
        height : 2000
    },

    // Enabled Tools
    tools : {
        pencil      : true,
        rectangle   : true,
        circle      : true,
        eraser      : true,
        colorpicker : true
    }

};