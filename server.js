/*** server.js
***/


// check environment variables
console.group( '# Environment Variables' );
console.group( '[DEBUG] process.env.PORT :' ); console.debug( process.env.PORT ); console.groupEnd();
console.group( '[DEBUG] process.env.NODE_ENV:' ); console.debug( process.env.NODE_ENV ); console.groupEnd();
console.group( '[DEBUG] process.env.MONGODB_URI:' ); console.debug( process.env.MONGODB_URI ); console.groupEnd();
console.groupEnd();


// require
const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const expressHandlebars = require( 'express-handlebars' );
const mongoose = require( 'mongoose' );
const config = require( './config' );


// global variables
const DEFAULT_PORT = 8080;
var app;

/*** FUNCTION initialize()
***/

const initialize = function() {
    // create Express app
    app = express();

    // data handlers
    app.use( bodyParser.urlencoded( { extended : true } ) );    // MIME type application/x-www-form-urlencoded
    app.use( express.json() );    // MIME type application/json

    // static directory
    app.use( express.static( 'static' ) );

    // render engine
    var handlebars = expressHandlebars.create(
        {
            defaultLayout: 'index' ,
            helpers: {
                toJSON: function( object ) {
                    return JSON.stringify( object );
                }
            }
        }
    );
    app.engine( 'handlebars' , handlebars.engine );
    app.set( 'view engine' , 'handlebars' );

    /*
    app.engine( 'handlebars' , expressHandlebars( { defaultLayout : 'index' } ) );
    app.set( 'view engine' , 'handlebars' );
    */

    // routers
    var routers = require( './routers' );
    app.use( routers );
}


/*** FUNCTION start()
***/

const start = async function() {
    // port
    const PORT = ( process.env.PORT || DEFAULT_PORT );
    console.group( '[DEBUG] PORT:' ); console.debug( PORT ); console.groupEnd();

    // connect to database
    console.group( '[DEBUG] config.connection:' ); console.debug( config.connection ); console.groupEnd();
    mongoose.connect( config.connection , { useNewUrlParser: true } );

    // start Express app
    app.listen(
        PORT ,
        () => {
            console.info( `[INFO] Express app listening to port ${PORT}` );
        }
    );
}


// start
initialize();
start();
