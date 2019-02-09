/*** routers/savedNendoroid.js
***/


// require
const express = require( 'express' );
const controllers = require( '../controllers' );


// global variables
var router = express.Router();


/*** POST '/api/savedNendoroid'

Create saved Nendoroids.

Create one saved Nendoroid if body is an object.

Create many saved Nendoroids if body is an array.

***/

router.post(
    '/api/savedNendoroid' ,
    async ( request , response ) => {
        console.group( `# POST '/api/savedNendoroid'` );
        console.group( '[DEBUG] request.url:' ); console.debug( request.url ); console.groupEnd();
        console.group( '[DEBUG] request.originalUrl:' ); console.debug( request.originalUrl ); console.groupEnd();
        console.group( '[DEBUG] request.method:' ); console.debug( request.method ); console.groupEnd();
        console.group( '[DEBUG] request.params:' ); console.debug( request.params ); console.groupEnd();
        console.group( '[DEBUG] request.query:' ); console.debug( request.query ); console.groupEnd();
        console.group( '[DEBUG] request.body:' ); console.debug( request.body ); console.groupEnd();

        var savedNendoroidData = request.body;

        try {
            var result = await controllers.savedNendoroid.create( savedNendoroidData );
            console.group( '[DEBUG] result:' ); console.debug( result ); console.groupEnd();
            response.json( result );
        }
        catch( error ) {
            console.group( '[DEBUG] error:' ); console.debug( error ); console.groupEnd();
            response.status( 500 ).json( { error: error.toString() } );
        }

        console.info( `[INFO] POST '/api/savedNendoroid' completed.` );
        console.groupEnd();
    }
);


/*** GET '/api/savedNendoroid/all'

Read all saved Nendoroids.

***/

router.get(
    '/api/savedNendoroid/all' ,
    async ( request , response ) => {
        console.group( `# GET '/api/savedNendoroid/all'` );
        console.group( '[DEBUG] request.url:' ); console.debug( request.url ); console.groupEnd();
        console.group( '[DEBUG] request.originalUrl:' ); console.debug( request.originalUrl ); console.groupEnd();
        console.group( '[DEBUG] request.method:' ); console.debug( request.method ); console.groupEnd();
        console.group( '[DEBUG] request.params:' ); console.debug( request.params ); console.groupEnd();
        console.group( '[DEBUG] request.query:' ); console.debug( request.query ); console.groupEnd();
        console.group( '[DEBUG] request.body:' ); console.debug( request.body ); console.groupEnd();

        try {
            var result = await controllers.savedNendoroid.readAll();
            console.group( '[DEBUG] result:' ); console.debug( result ); console.groupEnd();
            response.json( result );
        }
        catch( error ) {
            console.group( '[DEBUG] error:' ); console.debug( error ); console.groupEnd();
            response.status( 500 ).json( { error: error.toString() } );
        }

        console.info( `[INFO] GET '/api/savedNendoroid/all' completed.` );
        console.groupEnd();
    }
);


/*** GET '/api/savedNendoroid/:number'

Read one saved Nendoroid.

Find by number.

***/

router.get(
    '/api/savedNendoroid/:number' ,
    async ( request , response ) => {
        console.group( `# GET '/api/savedNendoroid/:number'` );
        console.group( '[DEBUG] request.url:' ); console.debug( request.url ); console.groupEnd();
        console.group( '[DEBUG] request.originalUrl:' ); console.debug( request.originalUrl ); console.groupEnd();
        console.group( '[DEBUG] request.method:' ); console.debug( request.method ); console.groupEnd();
        console.group( '[DEBUG] request.params:' ); console.debug( request.params ); console.groupEnd();
        console.group( '[DEBUG] request.query:' ); console.debug( request.query ); console.groupEnd();
        console.group( '[DEBUG] request.body:' ); console.debug( request.body ); console.groupEnd();

        try {
            var result = await controllers.savedNendoroid.readOne( request.params.number );
            console.group( '[DEBUG] result:' ); console.debug( result ); console.groupEnd();
            response.json( result );
        }
        catch( error ) {
            console.group( '[DEBUG] error:' ); console.debug( error ); console.groupEnd();
            response.status( 500 ).json( { error: error.toString() } );
        }

        console.info( `[INFO] GET '/api/savedNendoroid/:number' completed.` );
        console.groupEnd();
    }
);


/*** PUT '/api/savedNendoroid/notes/:number'

Update notes of one Nendoroid.

Find by number.

***/

router.put(
    '/api/savedNendoroid/notes/:number' ,
    async ( request , response ) => {
        console.group( `# PUT '/api/savedNendoroid/notes/:number'` );
        console.group( '[DEBUG] request.url:' ); console.debug( request.url ); console.groupEnd();
        console.group( '[DEBUG] request.originalUrl:' ); console.debug( request.originalUrl ); console.groupEnd();
        console.group( '[DEBUG] request.method:' ); console.debug( request.method ); console.groupEnd();
        console.group( '[DEBUG] request.params:' ); console.debug( request.params ); console.groupEnd();
        console.group( '[DEBUG] request.query:' ); console.debug( request.query ); console.groupEnd();
        console.group( '[DEBUG] request.body:' ); console.debug( request.body ); console.groupEnd();

        try {
            var result = await controllers.savedNendoroid.updateNotes( request.params.number , request.body.notes );
            console.group( '[DEBUG] result:' ); console.debug( result ); console.groupEnd();
            response.json( result );
        }
        catch( error ) {
            console.group( '[DEBUG] error:' ); console.debug( error ); console.groupEnd();
            response.status( 500 ).json( { error: error.toString() } );
        }

        console.info( `[INFO] PUT '/api/savedNendoroid/notes/:number' completed.` );
        console.groupEnd();
    }
);


/*** PUT '/api/savedNendoroid/buy/:number'

Update one Nendoroid as bought.

Find by number.

***/

router.put(
    '/api/savedNendoroid/buy/:number' ,
    async ( request , response ) => {
        console.group( `# PUT '/api/savedNendoroid/buy/:number'` );
        console.group( '[DEBUG] request.url:' ); console.debug( request.url ); console.groupEnd();
        console.group( '[DEBUG] request.originalUrl:' ); console.debug( request.originalUrl ); console.groupEnd();
        console.group( '[DEBUG] request.method:' ); console.debug( request.method ); console.groupEnd();
        console.group( '[DEBUG] request.params:' ); console.debug( request.params ); console.groupEnd();
        console.group( '[DEBUG] request.query:' ); console.debug( request.query ); console.groupEnd();
        console.group( '[DEBUG] request.body:' ); console.debug( request.body ); console.groupEnd();

        try {
            var result = await controllers.savedNendoroid.buy( request.params.number , request.body.notes );
            console.group( '[DEBUG] result:' ); console.debug( result ); console.groupEnd();
            response.json( result );
        }
        catch( error ) {
            console.group( '[DEBUG] error:' ); console.debug( error ); console.groupEnd();
            response.status( 500 ).json( { error: error.toString() } );
        }

        console.info( `[INFO] PUT '/api/savedNendoroid/buy/:number' completed.` );
        console.groupEnd();
    }
);


/*** DELETE '/api/savedNendoroid/all'

Delete all saved Nendoroids.

***/

router.delete(
    '/api/savedNendoroid/all' ,
    async ( request , response ) => {
        console.group( `# DELETE '/api/savedNendoroid/all'` );
        console.group( '[DEBUG] request.url:' ); console.debug( request.url ); console.groupEnd();
        console.group( '[DEBUG] request.originalUrl:' ); console.debug( request.originalUrl ); console.groupEnd();
        console.group( '[DEBUG] request.method:' ); console.debug( request.method ); console.groupEnd();
        console.group( '[DEBUG] request.params:' ); console.debug( request.params ); console.groupEnd();
        console.group( '[DEBUG] request.query:' ); console.debug( request.query ); console.groupEnd();
        console.group( '[DEBUG] request.body:' ); console.debug( request.body ); console.groupEnd();

        try {
            var result = await controllers.savedNendoroid.deleteAll();
            console.group( '[DEBUG] result:' ); console.debug( result ); console.groupEnd();
            response.json( result );
        }
        catch( error ) {
            console.group( '[DEBUG] error:' ); console.debug( error ); console.groupEnd();
            response.status( 500 ).json( { error: error.toString() } );
        }

        console.info( `[INFO] DELETE '/api/savedNendoroid/all' completed.` );
        console.groupEnd();
    }
);


// export
module.exports = router;
