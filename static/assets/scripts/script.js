/*** /static/asset/script/script.js
***/


/*** FUNCTION createObject()

Converts from serialized format (array of `{ name , value }`) to
object format (`{ name: value , ... }`)

***/

const createObject = function( formData ) {
    console.group( 'createObject()' );

    var formDataObject = {};
    formData.forEach(
        ( formElement , formElementIndex ) => {
            formDataObject[ formElement.name ] = formElement.value;
        }
    );

    console.groupEnd();
    return formDataObject;
}


/*** FUNCTION handleScrapeFormSubmit()
***/

const handleScrapeFormSubmit = async function( event ) {
    console.group( 'handleScrapeFormSubmit()' );

    // set DOM event handling
    event.stopPropagation();
    event.preventDefault();

    // deactivate button
    $( '#scrape-form-submit' ).prop( 'disabled' , true );
    $( '#scrape-form-submit' ).text( 'Scraping...' );

    // get form data
    var formData = createObject( $( this ).serializeArray() );
    console.log( 'formData:' , formData );

    // scrape
    await $.ajax(
        {
            url: `/api/scrapedNendoroid/scrape/${formData.year}/${formData.limit}` ,
            method: 'POST' ,
            // data: requestData ,
            dataType: 'json'
        }
    )
    .then(
        ( data , textStatus , jqXHR ) => {
            console.log( 'data: ' , data );
            console.log( 'textStatus: ' , textStatus );
        }
    );

    // refresh window
    location.reload();

    console.groupEnd();
}


/*** FUNCTION handleClearScrapedListClick()
***/

const handleClearScrapedListClick = async function( event ) {
    console.group( 'handleClearScrapedListClick()' );

    // scrape
    await $.ajax(
        {
            url: 'api/scrapedNendoroid/all' ,
            method: 'DELETE' ,
            // data: requestData ,
            dataType: 'json'
        }
    )
    .then(
        ( data , textStatus , jqXHR ) => {
            console.log( 'data: ' , data );
            console.log( 'textStatus: ' , textStatus );
        }
    );

    // refresh window
    location.reload();

    console.groupEnd();
}


/*** FUNCTION handleSaveClick()
***/

const handleSaveClick = async function( event ) {
    console.group( 'handleSaveClick()' );

    // get element data
    var data = $( this ).data();
    console.log( 'data:' , data );

    // save Nendoroid
    await $.ajax(
        {
            url: `api/scrapedNendoroid/save/${data.number}` ,
            method: 'PUT' ,
            // data: requestData ,
            dataType: 'json'
        }
    )
    .then(
        ( data , textStatus , jqXHR ) => {
            console.log( data );
            console.log( textStatus );
        }
    );

    // refresh window
    location.reload();

    console.groupEnd();
}


/*** FUNCTION handleNotesFormSubmit()
***/

const handleNotesFormSubmit = async function( event ) {
    console.group( 'handleNotesFormSubmit()' );

    // set DOM event handling
    event.stopPropagation();
    event.preventDefault();

    // get element data
    var data = $( this ).data();
    console.log( 'data:' , data );

    // get form data
    var formData = createObject( $( this ).serializeArray() );
    console.log( 'formData:' , formData );

    // scrape
    await $.ajax(
        {
            url: `/api/savedNendoroid/notes/${data.number}` ,
            method: 'PUT' ,
            data: formData ,
            dataType: 'json'
        }
    )
    .then(
        ( data , textStatus , jqXHR ) => {
            console.log( 'data: ' , data );
            console.log( 'textStatus: ' , textStatus );
        }
    );

    // refresh window
    location.reload();

    console.groupEnd();
}


/*** FUNCTION handleBuyClick()
***/

const handleBuyClick = async function( event ) {
    console.group( 'handleBuyClick()' );

    // get element data
    var data = $( this ).data();

    // buy Nendoroid
    await $.ajax(
        {
            url: `api/savedNendoroid/buy/${data.number}` ,
            method: 'PUT' ,
            // data: requestData ,
            dataType: 'json'
        }
    )
    .then(
        ( data , textStatus , jqXHR ) => {
            console.log( data );
            console.log( textStatus );
        }
    );

    // refresh window
    location.reload();

    console.groupEnd();
}


/*** FUNCTION handleReady()
***/

const handleReady = function( event ) {
    console.group( 'handleReady()' );

    // scrape form
    $( '#scrape-form' ).on( 'submit' , handleScrapeFormSubmit );
    // clear scraped button
    $( '#clear-scraped' ).on( 'click' , handleClearScrapedListClick );
    // save buttons
    $( document ).on( 'click' , '.button-save' , handleSaveClick );
    // notes forms
    $( '.notes-form' ).on( 'submit' , handleNotesFormSubmit );
    // bought buttons
    $( document ).on( 'click' , '.button-buy' , handleBuyClick );

    console.groupEnd();
}


/*** Start
***/

$( handleReady );    // $( document ).ready( handleReady )
