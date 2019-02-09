/*** config/connection.js
***/


// require
const connectionJSON = require( './connection.json' );


// global variables
const DEFAULT_NODE_ENV = 'development';
const NODE_ENV = ( process.env.NODE_ENV || DEFAULT_NODE_ENV );


// evaluate connection
if (
    connectionJSON[ NODE_ENV ] &&
    connectionJSON[ NODE_ENV ].use_env_variable
) {
    connection = process.env[ connectionJSON[ NODE_ENV ].use_env_variable ];
}
else if ( connectionJSON[ NODE_ENV ] ) {
    connection = connectionJSON[ NODE_ENV ];
}
else {
    throw new TypeError( 'connection string not found.' );
}


// export
// other configs can be added
module.exports = connection;
