/*** models/SavedNendoroid.js
***/


// require
const mongoose = require( 'mongoose' );
const schemas = require( '../schemas' );


// global variables
var SavedNendoroid = mongoose.model( "SavedNendoroid" , schemas.nendoroid );


/*** FUNCTION createOne()
***/

const createOne = async function( nendoroid ) {
    if ( !nendoroid ) {
        throw new TypeError( `parameter 'nendoroid' is required.` );
    }

    var result = await SavedNendoroid.create( nendoroid );
    return result;
}


/*** FUNCTION readOne()
***/

const readOne = async function( number ) {
    if ( !number ) {
        throw new TypeError( `parameter 'number' is required.` );
    }

    var result = await SavedNendoroid.findOne( { number: number } );
    return result;
}


/*** FUNCTION readAll()
***/

const readAll = async function() {
    var result = await SavedNendoroid.find( {} ).sort( { number: 'descending' } );
    return result;
}


/*** FUNCTION updateNotes()
***/

const updateNotes = async function( number , notes ) {
    if ( !number ) {
        throw new TypeError( `parameter 'number' is required.` );
    }
    if ( !notes ) {
        throw new TypeError( `parameter 'notes' is required.` );
    }

    var result = await SavedNendoroid.findOneAndUpdate( { number: number } , { notes: notes } );
    return result
}


/*** FUNCTION setBought()
***/

const setBought = async function( number ) {
    if ( !number ) {
        throw new TypeError( `parameter 'number' is required.` );
    }

    var result = await SavedNendoroid.findOneAndUpdate( { number: number } , { isBought: true } );
    return result
}


/*** FUNCTION deleteOne()
***/

const deleteOne = async function( number ) {
    if ( !number ) {
        throw new TypeError( `parameter 'number' is required.` );
    }

    var result = await SavedNendoroid.deleteMany( { number: number } );
    return result;
}


/*** FUNCTION deleteAll()
***/

const deleteAll = async function() {
    var result = await SavedNendoroid.deleteMany( {} );
    return result;
}


// export
module.exports = {
    createOne: createOne ,
    readOne: readOne ,
    readAll: readAll ,
    updateNotes: updateNotes ,
    setBought: setBought ,
    deleteOne : deleteOne ,
    deleteAll : deleteAll
};
