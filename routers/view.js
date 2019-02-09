/*** routers/view.js
***/


// require
const express = require( 'express' );
const controllers = require( '../controllers' );


// global variables
var router = express.Router();


/*** GET '/'

Render home page

***/
router.get(
    '/' ,
    async ( request , response ) => {
        console.group( `# GET '/'` );
        console.group( '[DEBUG] request.url:' ); console.debug( request.url ); console.groupEnd();
        console.group( '[DEBUG] request.originalUrl:' ); console.debug( request.originalUrl ); console.groupEnd();
        console.group( '[DEBUG] request.method:' ); console.debug( request.method ); console.groupEnd();
        console.group( '[DEBUG] request.params:' ); console.debug( request.params ); console.groupEnd();
        console.group( '[DEBUG] request.query:' ); console.debug( request.query ); console.groupEnd();
        console.group( '[DEBUG] request.body:' ); console.debug( request.body ); console.groupEnd();

        try {
            var scrapedNendoroids = await controllers.scrapedNendoroid.readAll();
            var savedNendoroids = await controllers.savedNendoroid.readAll();
            var handlebarsData = {
                scrapedNendoroids: scrapedNendoroids ,
                savedNendoroids: savedNendoroids
            };
            // console.group( '[DEBUG] handlebarsData:' ); console.debug( handlebarsData ); console.groupEnd();
            response.render( 'bodies/body' , handlebarsData );
        }
        catch( error ) {
            console.group( '[DEBUG] error:' ); console.debug( error ); console.groupEnd();
            response.status( 422 ).json( error );
        }

        console.info( `[INFO] GET '/' completed.` );
        console.groupEnd();
    }
);


// export
module.exports = router;
