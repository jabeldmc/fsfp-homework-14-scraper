/*** controllers/scrapedNendoroid.js
***/


// require
const models = require( '../models' );
const axios = require( 'axios' );
const cheerio = require( 'cheerio' );


/*** FUNCTION asyncForEach()

[Reference](https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404)

***/

const asyncForEach = async function( array , callback ) {
    for ( let index = 0 ; index < array.length ; index++ ) {
        await callback( array[ index ] , index , array );
    }
}


/*** FUNCTION asyncMap()
***/

const asyncMap = async function( array , callback ) {
    result = [];
    for ( let index = 0 ; index < array.length ; index++ ) {
        result.push( await callback( array[ index ] , index , array ) );
    }
    return result;
}



/*** FUNCTION randomNumber()
***/

const randomNumber = function( cardinality ) {
    // check cardinatliy
    if ( !cardinality ) {
        throw new TypeError( 'Parameter \'cardinality\' is required.' );
    }
    if ( cardinality < 1 ) {
        throw new RangeError( 'Parameter \'cardinality\' should be greater than 0.' )
    }

    var randomNumber = ( Math.floor( Math.random() * cardinality ) );
    return randomNumber;
}


/*** FUNCTION randomNumbers()
***/

const randomNumbers = function( length , cardinality , doDistinct ) {
    // check cardinatliy
    if ( !cardinality ) {
        throw new TypeError( 'Parameter \'cardinality\' is required.' );
    }
    if ( cardinality < 1 ) {
        throw new RangeError( 'Parameter \'cardinality\' should be greater than 0.' )
    }
    if (
        ( doDistinct === true ) &&
        ( cardinality < length )
    ) {
        throw new RangeError( 'Parameter \'cardinality\' should be equal or greater than parameter \'length\'.' );
    }

    // default doDistinct
    doDistinct = ( ( doDistinct !== undefined ) && ( doDistinct === true ) );

    // check doDistinct
    if ( doDistinct === false ) {
        // allow duplicate numbers
        var randomNumbers = [];

        while ( randomNumbers.length < length ) {
            var newRandomNumber = randomNumber( cardinality );
            randomNumbers.push( newRandomNumber );
        }
    }
    else {
        // numbers should be unique
        var randomNumbers = [];
        var blackList = [];

        while ( randomNumbers.length < length ) {
            var newRandomNumber = randomNumber( cardinality );

            // ensure unique value
            while( blackList.indexOf( newRandomNumber ) > -1 ) {
                newRandomNumber++;
                // go "around the clock"
                if ( newRandomNumber === cardinality ) {
                    newRandomNumber = 0;
                }
            }

            randomNumbers.push( newRandomNumber );
            blackList.push( newRandomNumber );
        }
    }

    return randomNumbers;
}


/*** FUNCTION scrapeDetailPage()
***/

const scrapeDetailPage = async function( url ) {
    console.log( `[INFO] Scraping detail page at ${url}` );
    var response = await axios.get( url );
    var $ = cheerio.load( response.data );

    // detail page attributes
    var number = $( 'div.itemNum' ).text();
    var name = $( '[itemprop=\'name\']' ).text();
    var description = $( '[itemprop=\'description\']' ).find( 'p' ).first().text();
    var releaseDate = $( '[itemprop=\'releaseDate\']' ).text();
    var price = $( '[itemprop=\'price\']' ).text().replace( /\s{2,}/g , ' ' ).trim();
    var imageUrl = `https:${ $( 'img.itemImg' ).first().attr( 'src' ) }`;

    return {
        number: number ,
        name: name ,
        description: description ,
        releaseDate: releaseDate ,
        price: price ,
        imageUrl: imageUrl
    };
}


/*** FUNCTION scrapeListPage()
***/

const scrapeListPage = async function( url , limit ) {
    console.log( `[INFO] Scraping list page at ${url}, limit ${limit}.` );
    var response = await axios.get( url );
    var $ = cheerio.load( response.data );

    // scrape list page data
    // listPageData = $( 'div.hitItem.nendoroid.nendoroid_series' ).slice( 0 , limit ).map(
    listPageData = $( 'div.hitItem.nendoroid.nendoroid_series' ).map(
        // cannot use $.map with async functions
        // will scrape detail page elements afterwards using asyncMap()
        ( index , element ) => {
            var detailPageUrl = $( element ).find( 'a' ).first().attr( 'href' );
            var smallImageUrl = `https:${ $( element ).find( 'img.itemImg' ).first().data().original }`;

            return {
                detailPageUrl: detailPageUrl ,
                smallImageUrl: smallImageUrl
            };
        }
    )
    .get();
    console.log( `[INFO] List page has ${listPageData.length} Nendoroids.` );

    // randomly select list page elements. As many as 'limit'.
    var listPageIndexesLength;
    if( listPageData.length <= limit ) {
        listPageIndexesLength = listPageData.length;
    }
    else {
        listPageIndexesLength = limit;
    }
    var listPageIndexes = randomNumbers( listPageIndexesLength , listPageData.length , true );
    listPageData = listPageIndexes.map(
        ( listPageIndex , listPageIndexIndexIndex ) => listPageData[ listPageIndex ]
    );

    // scrape detail page data
    var nendoroidData = await asyncMap(
        listPageData ,
        async ( element , index ) => {
            var detailPageData = await scrapeDetailPage( element.detailPageUrl );

            return {
                number: detailPageData.number ,
                name: detailPageData.name ,
                description: detailPageData.description ,
                releaseDate: detailPageData.releaseDate ,
                price: detailPageData.price ,
                imageUrl: detailPageData.imageUrl ,
                smallImageUrl: element.smallImageUrl ,
                detailPageUrl: element.detailPageUrl
            };
        }
    );

    return nendoroidData;
}


/*** FUNCTION create()

Creates scraped Nendoroid(s).

Creates one scraped Nendoroid if data is an object.

Creates many scraped Nendoroids if data is an array.

***/

const create = async function( data ) {
    // check data
    if ( !data ) {
        throw new TypeError( 'Parameter \'data\' is required.' );
    }

    var result;

    if ( Array.isArray( data ) ) {
        result = await models.ScrapedNendoroid.createMany( data );
    }
    else {
        result = await models.ScrapedNendoroid.createOne( data );
    }

    return result;
}


/*** FUNCTION scrape()

Scrapes Nendoroid data and creates scraped Nendoroids.

Scrapes Nendoroid data by release year.

Limits amount by `limit`.

***/

const scrape = async function( year , limit ) {
    // check year
    if ( !year ) {
        throw new TypeError( 'Parameter \'year\' is required.' );
    }
    // check limit
    if ( !limit ) {
        throw new TypeError( 'Parameter \'limit\' is required.' );
    }

    var url = `https://www.goodsmile.info/en/products/category/nendoroid_series/released/${year}`;
    var data = await scrapeListPage( url , limit );
    var result = await models.ScrapedNendoroid.createMany( data );
    return result;
}


/*** FUNCTION readOne()

Reads one scraped Nendoroid.

Finds by number.

***/

const readOne = async function( number ) {
    // check number
    if ( !number ) {
        throw new TypeError( 'Parameter \'number\' is required.' );
    }

    var result = await models.ScrapedNendoroid.readOne( number );
    return result;
}


/*** FUNCTION readAll()

Reads all scraped Nendoroids.

***/

const readAll = async function() {
    var result = await models.ScrapedNendoroid.readAll();
    return result;
}


/*** FUNCTION save()

Moves one Nendoroid from scrapedNendoroid collection to savedNenoroid
collection.

Finds by number.

***/

const save = async function( number ) {
    // check number
    if ( !number ) {
        throw new TypeError( 'Parameter \'number\' is required.' );
    }

    var scrapedNendoroidData = await models.ScrapedNendoroid.readOne( number );
    var savedNendoroidData = {
        number: scrapedNendoroidData.number ,
        name: scrapedNendoroidData.name ,
        description: scrapedNendoroidData.description ,
        releaseDate: scrapedNendoroidData.releaseDate ,
        price: scrapedNendoroidData.price ,
        imageUrl: scrapedNendoroidData.imageUrl ,
        smallImageUrl: scrapedNendoroidData.smallImageUrl ,
        detailPageUrl: scrapedNendoroidData.detailPageUrl ,
        isBought: scrapedNendoroidData.isBought ,
        notes: scrapedNendoroidData.notes
    }
    var createOneResult = await models.SavedNendoroid.createOne( savedNendoroidData );
    var deleteOneResult = await models.ScrapedNendoroid.deleteOne( number );
    var result = createOneResult;
    return result;
}


/*** FUNCTION deleteAll()

Deletes all scraped Nendoroids.

***/

const deleteAll = async function() {
    var result = await models.ScrapedNendoroid.deleteAll();
    return result;
}


// export
module.exports = {
    create: create ,
    scrape: scrape ,
    readOne: readOne ,
    readAll: readAll ,
    save: save ,
    deleteAll: deleteAll
};
