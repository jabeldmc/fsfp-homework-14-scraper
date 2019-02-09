/*** routers/index.js
***/


// export
// other routers can be added
// exporting an array since `Express.Application.use()` requires
// a module or an array of modules
module.exports = [
    require( './scrapedNendoroid' ) ,
    require( './savedNendoroid' ) ,
    require( './view' )
];
