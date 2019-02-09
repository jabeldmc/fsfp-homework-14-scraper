/*** models/ScrapedNendoroid.js
***/


// require
const mongoose = require( 'mongoose' );
const schemas = require( '../schemas' );


// global variables
var ScrapedNendoroid = mongoose.model( "ScrapedNendoroid" , schemas.nendoroid );


/*** FUNCTION createOne()
***/

const createOne = async function( nendoroid ) {
    if ( !nendoroid ) {
        throw new TypeError( `parameter 'nendoroid' is required.` );
    }

    var result = await ScrapedNendoroid.create( nendoroid );
    return result;
}


/*** FUNCTION createMany()
***/

const createMany = async function( nendoroids ) {
    if ( !nendoroids ) {
        throw new TypeError( `parameter 'nendoroids' is required.` );
    }

    var result = await ScrapedNendoroid.insertMany( nendoroids );
    return result;
}


/*** FUNCTION readOne()
***/

const readOne = async function( number ) {
    if ( !number ) {
        throw new TypeError( `parameter 'number' is required.` );
    }

    var result = await ScrapedNendoroid.findOne( { number: number } );
    return result;
}


/*** FUNCTION readAll()
***/

const readAll = async function() {
    var result = await ScrapedNendoroid.find( {} ).sort( { number: 'descending' } );
    return result;
}


/*** FUNCTION deleteOne()
***/

const deleteOne = async function( number ) {
    if ( !number ) {
        throw new TypeError( `parameter 'number' is required.` );
    }

    var result = await ScrapedNendoroid.deleteMany( { number: number } );
    return result;
}


/*** FUNCTION deleteAll()
***/

const deleteAll = async function() {
    var result = await ScrapedNendoroid.deleteMany( {} );
    return result;
}


// export
module.exports = {
    createOne: createOne ,
    createMany: createMany ,
    readOne: readOne ,
    readAll: readAll ,
    deleteOne: deleteOne ,
    deleteAll : deleteAll
};
