/*** schemas/nendoroid.js
***/


// require
const mongoose = require( 'mongoose' );


// create model
var nendoroid = new mongoose.Schema(
    {
        number: { type: String , required: true , index: true } ,
        name: { type: String , required: true } ,
        description: { type: String , required: true } ,
        releaseDate: { type: String , required: true } ,
        price: { type: String , required: true } ,
        imageUrl: { type: String , required: true } ,
        smallImageUrl: { type: String , required: true } ,
        detailPageUrl: { type: String , required: true } ,
        isBought: { type: Boolean , required: true , default: false } ,
        notes: { type: String , required: true , default: 'No notes.' }
    }
);


// export
module.exports = nendoroid;
