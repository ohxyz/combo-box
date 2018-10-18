/* Data types only used in the component */

const util = require( '../../helpers/util.js' );

class BaseItem {

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
        else if ( util.isObject( arg ) === true || arg instanceof BaseItem === true ) {

            this.__content__ = JSON.stringify( arg );

            Object.assign( this, arg );
        }
    }
}

function makeBaseItemsByItems( items ) {

    if ( Array.isArray( items ) === false ) {

        return [];
    }

    let baseItems = items.map( item => {

        return new BaseItem( item );
    } );

    return baseItems;
}



function makeBaseItemsByFields( items, fields ) {

    let baseItems = [];

    items.map( item => {

        fields.map( fieldName => { 

            if ( item.hasOwnProperty( fieldName ) === false ) {

                return ;
            }

            let baseItem = new BaseItem( item );
            baseItem.__content__ = item[ fieldName ];
            baseItem.__field__ = fieldName;

            baseItems.push( baseItem );

        } );

    } );

    return baseItems;
}


function makeBaseItems( items, fields ) {

    if ( Array.isArray( fields ) === true && fields.length > 0 ) {

        return makeBaseItemsByFields( items, fields );
    }

    return makeBaseItemsByItems( items );

}

module.exports = {

    BaseItem,
    makeBaseItems,
    makeBaseItemsByItems,
    makeBaseItemsByFields,
};