/* Data types only used in the component */

const util = require( '../../helpers/util.js' );

class SearchItem {

    constructor( arg ) {

        this.__content__ = '';
        this.__field__ = '';
        this.__origin__ = arg;

        let type = typeof arg;

        if ( type === 'string'
                || type === 'number'
                || type === 'boolean') {

            this.__content__ = arg.toString();
        }
        else if ( arg === null ) {

            this.__content__ = 'null';
        }
        else if ( util.isObject( arg ) === true || arg instanceof SearchItem === true ) {

            this.__content__ = JSON.stringify( arg );

            Object.assign( this, arg );
        }
    }
}

function makeSearchItemsByItems( items ) {

    if ( Array.isArray( items ) === false ) {

        return [];
    }

    let searchItems = items.map( item => {

        return new SearchItem( item );
    } );

    return searchItems;
}



function makeSearchItemsByFields( items, fields ) {

    let searchItems = [];

    items.map( item => {

        fields.map( fieldName => { 

            if ( item.hasOwnProperty( fieldName ) === false ) {

                return ;
            }

            let searchItem = new SearchItem( item );
            searchItem.__content__ = item[ fieldName ];
            searchItem.__field__ = fieldName;

            searchItems.push( searchItem );

        } );

    } );

    return searchItems;
}


function makeSearchItems( items, fields ) {

    if ( Array.isArray( fields ) === true && fields.length > 0 ) {

        return makeSearchItemsByFields( items, fields );
    }

    return makeSearchItemsByItems( items );

}

module.exports = {

    SearchItem,
    makeSearchItems,
    makeSearchItemsByItems,
    makeSearchItemsByFields,
};