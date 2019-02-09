/*** controllers/savedNendoroid.js
***/


// require
const models = require( '../models' );


/*** FUNCTION create()

Creates saved Nendoroid(s).

Creates one saved Nendoroid if data is an object.

Creates many saved Nendoroids if data is an array.

***/

const create = async function( data ) {
    // check data
    if ( !data ) {
        throw new TypeError( 'Parameter \'data\' is required.' );
    }

    var result;

    if ( Array.isArray( data ) ) {
        result = await models.SavedNendoroid.createMany( data );
    }
    else {
        result = await models.SavedNendoroid.createOne( data );
    }

    return result;
}


/*** FUNCTION readOne()

Reads one saved Nendoroid.

Finds by number.

***/

const readOne = async function( number ) {
    // check number
    if ( !number ) {
        throw new TypeError( 'Parameter \'number\' is required.' );
    }

    var result = await models.SavedNendoroid.readOne( number );
    return result;
}


/*** FUNCTION readAll()

Reads all saved Nendoroids.

***/

const readAll = async function() {
    var result = await models.SavedNendoroid.readAll();
    return result;
}


/*** FUNCTION updateNotes()

Updates notes of one Nendoroid.

Finds by number.

***/

const updateNotes = async function( number , notes ) {
    // check number
    if ( !number ) {
        throw new TypeError( 'Parameter \'number\' is required.' );
    }
    // check notes
    if ( !notes ) {
        throw new TypeError( 'Parameter \'notes\' is required.' );
    }

    var result = await models.SavedNendoroid.updateNotes( number , notes );
    return result;
}


/*** FUNCTION buy()

Updates one Nendoroid as bought.

Finds by number.

***/

const buy = async function( number ) {
    // check number
    if ( !number ) {
        throw new TypeError( 'Parameter \'number\' is required.' );
    }

    var result = await models.SavedNendoroid.setBought( number );
    return result;
}


/*** FUNCTION deleteAll()

Deletes all scraped Nendoroids.

***/

const deleteAll = async function() {
    var result = await models.SavedNendoroid.deleteAll();
    return result;
}


// export
module.exports = {
    create: create ,
    readOne: readOne ,
    readAll: readAll ,
    updateNotes: updateNotes ,
    buy: buy ,
    deleteAll: deleteAll
};
