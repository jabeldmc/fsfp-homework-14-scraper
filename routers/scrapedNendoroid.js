/*** routers/scrapedNendoroid.js
***/


// require
const express = require( 'express' );
const controllers = require( '../controllers' );


// global variables
var router = express.Router();


/*** POST '/api/scrapedNendoroid'

Create scraped Nendoroid(s).

Create one scraped Nendoroid if body is an object.

Create many scraped Nendoroids if body is an array.

***/

router.post(
    '/api/scrapedNendoroid' ,
    async ( request , response ) => {
        console.group( `# POST '/api/scrapedNendoroid'` );
        console.group( '[DEBUG] request.url:' ); console.debug( request.url ); console.groupEnd();
        console.group( '[DEBUG] request.originalUrl:' ); console.debug( request.originalUrl ); console.groupEnd();
        console.group( '[DEBUG] request.method:' ); console.debug( request.method ); console.groupEnd();
        console.group( '[DEBUG] request.params:' ); console.debug( request.params ); console.groupEnd();
        console.group( '[DEBUG] request.query:' ); console.debug( request.query ); console.groupEnd();
        console.group( '[DEBUG] request.body:' ); console.debug( request.body ); console.groupEnd();

        var scrapedNendoroidData = request.body;

        try {
            var result = await controllers.scrapedNendoroid.create( scrapedNendoroidData );
            console.group( '[DEBUG] result:' ); console.debug( result ); console.groupEnd();
            response.json( result );
        }
        catch( error ) {
            console.group( '[DEBUG] error:' ); console.debug( error ); console.groupEnd();
            response.status( 500 ).json( { error: error.toString() } );
        }

        console.info( `[INFO] POST '/api/scrapedNendoroid' completed.` );
        console.groupEnd();
    }
);


/*** POST '/api/scrapedNendoroid/scrape/:year/:limit'

Scrape Nendoroid data and create scraped Nendoroids.

Scrape Nendoroid data by release year.

Limit amount by `limit`.

***/

router.post(
    '/api/scrapedNendoroid/scrape/:year/:limit' ,
    async ( request , response ) => {
        console.group( `# POST '/api/scrapedNendoroid/scrape/:year/:limit'` );
        console.group( '[DEBUG] request.url:' ); console.debug( request.url ); console.groupEnd();
        console.group( '[DEBUG] request.originalUrl:' ); console.debug( request.originalUrl ); console.groupEnd();
        console.group( '[DEBUG] request.method:' ); console.debug( request.method ); console.groupEnd();
        console.group( '[DEBUG] request.params:' ); console.debug( request.params ); console.groupEnd();
        console.group( '[DEBUG] request.query:' ); console.debug( request.query ); console.groupEnd();
        console.group( '[DEBUG] request.body:' ); console.debug( request.body ); console.groupEnd();

        try {
            var result = await controllers.scrapedNendoroid.scrape( request.params.year , request.params.limit );
            console.group( '[DEBUG] result:' ); console.debug( result ); console.groupEnd();
            response.json( result );
        }
        catch( error ) {
            console.group( '[DEBUG] error:' ); console.debug( error ); console.groupEnd();
            response.status( 500 ).json( { error: error.toString() } );
        }

        console.info( `[INFO] POST '/api/scrapedNendoroid/scrape/:year/:limit' completed.` );
        console.groupEnd();
    }
);


/*** GET '/api/scrapedNendoroid/all'

Read all scraped Nendoroids.

***/

router.get(
    '/api/scrapedNendoroid/all' ,
    async ( request , response ) => {
        console.group( `# GET '/api/scrapedNendoroid/all'` );
        console.group( '[DEBUG] request.url:' ); console.debug( request.url ); console.groupEnd();
        console.group( '[DEBUG] request.originalUrl:' ); console.debug( request.originalUrl ); console.groupEnd();
        console.group( '[DEBUG] request.method:' ); console.debug( request.method ); console.groupEnd();
        console.group( '[DEBUG] request.params:' ); console.debug( request.params ); console.groupEnd();
        console.group( '[DEBUG] request.query:' ); console.debug( request.query ); console.groupEnd();
        console.group( '[DEBUG] request.body:' ); console.debug( request.body ); console.groupEnd();

        try {
            var result = await controllers.scrapedNendoroid.readAll();
            console.group( '[DEBUG] result:' ); console.debug( result ); console.groupEnd();
            response.json( result );
        }
        catch( error ) {
            console.group( '[DEBUG] error:' ); console.debug( error ); console.groupEnd();
            response.status( 500 ).json( { error: error.toString() } );
        }

        console.info( `[INFO] GET '/api/scrapedNendoroid/all' completed.` );
        console.groupEnd();
    }
);


/*** GET '/api/scrapedNendoroid/:number'

Read one scraped Nendoroid.

Find by number.

***/

router.get(
    '/api/scrapedNendoroid/:number' ,
    async ( request , response ) => {
        console.group( `# GET '/api/scrapedNendoroid/:number'` );
        console.group( '[DEBUG] request.url:' ); console.debug( request.url ); console.groupEnd();
        console.group( '[DEBUG] request.originalUrl:' ); console.debug( request.originalUrl ); console.groupEnd();
        console.group( '[DEBUG] request.method:' ); console.debug( request.method ); console.groupEnd();
        console.group( '[DEBUG] request.params:' ); console.debug( request.params ); console.groupEnd();
        console.group( '[DEBUG] request.query:' ); console.debug( request.query ); console.groupEnd();
        console.group( '[DEBUG] request.body:' ); console.debug( request.body ); console.groupEnd();

        try {
            var result = await controllers.scrapedNendoroid.readOne( request.params.number );
            console.group( '[DEBUG] result:' ); console.debug( result ); console.groupEnd();
            response.json( result );
        }
        catch( error ) {
            console.group( '[DEBUG] error:' ); console.debug( error ); console.groupEnd();
            response.status( 500 ).json( { error: error.toString() } );
        }

        console.info( `[INFO] GET '/api/scrapedNendoroid/:number' completed.` );
        console.groupEnd();
    }
);


/*** PUT '/api/scrapedNendoroid/save/:number'

Move one Nendoroid from scrapedNendoroid collection to savedNenoroid
collection.

Find by number.

***/

router.put(
    '/api/scrapedNendoroid/save/:number' ,
    async ( request , response ) => {
        console.group( `# PUT '/api/scrapedNendoroid/save/:number'` );
        console.group( '[DEBUG] request.url:' ); console.debug( request.url ); console.groupEnd();
        console.group( '[DEBUG] request.originalUrl:' ); console.debug( request.originalUrl ); console.groupEnd();
        console.group( '[DEBUG] request.method:' ); console.debug( request.method ); console.groupEnd();
        console.group( '[DEBUG] request.params:' ); console.debug( request.params ); console.groupEnd();
        console.group( '[DEBUG] request.query:' ); console.debug( request.query ); console.groupEnd();
        console.group( '[DEBUG] request.body:' ); console.debug( request.body ); console.groupEnd();

        try {
            var result = await controllers.scrapedNendoroid.save( request.params.number );
            console.group( '[DEBUG] result:' ); console.debug( result ); console.groupEnd();
            response.json( result );
        }
        catch( error ) {
            console.group( '[DEBUG] error:' ); console.debug( error ); console.groupEnd();
            response.status( 500 ).json( { error: error.toString() } );
        }

        console.info( `[INFO] PUT '/api/scrapedNendoroid/save/:number' completed.` );
        console.groupEnd();
    }
);


/*** DELETE '/api/scrapedNendoroid/all'

Delete all scraped Nendoroids.

***/

router.delete(
    '/api/scrapedNendoroid/all' ,
    async ( request , response ) => {
        console.group( `# DELETE '/api/scrapedNendoroid/all'` );
        console.group( '[DEBUG] request.url:' ); console.debug( request.url ); console.groupEnd();
        console.group( '[DEBUG] request.originalUrl:' ); console.debug( request.originalUrl ); console.groupEnd();
        console.group( '[DEBUG] request.method:' ); console.debug( request.method ); console.groupEnd();
        console.group( '[DEBUG] request.params:' ); console.debug( request.params ); console.groupEnd();
        console.group( '[DEBUG] request.query:' ); console.debug( request.query ); console.groupEnd();
        console.group( '[DEBUG] request.body:' ); console.debug( request.body ); console.groupEnd();

        try {
            var result = await controllers.scrapedNendoroid.deleteAll();
            console.group( '[DEBUG] result:' ); console.debug( result ); console.groupEnd();
            response.json( result );
        }
        catch( error ) {
            console.group( '[DEBUG] error:' ); console.debug( error ); console.groupEnd();
            response.status( 500 ).json( { error: error.toString() } );
        }

        console.info( `[INFO] DELETE '/api/scrapedNendoroid/all' completed.` );
        console.groupEnd();
    }
);


// export
module.exports = router;
