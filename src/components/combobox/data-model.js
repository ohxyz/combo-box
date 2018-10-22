/* Data types only used in the component */

const util = require( '../../helpers/util.js' );

class BaseItem {

    constructor( arg, fields ) {

        this.__string__ = '';
        this.__fields__ = [];
        this.__origin__ = arg;

        let type = typeof arg;

        if ( Array.isArray( fields ) === true ) {

            this.__fields__ = fields;
        }

        if ( type === 'string'
                || type === 'number'
                || type === 'boolean') {

            this.__string__ = arg.toString();
        }
        else if ( arg === null ) {

            this.__string__ = '';
        }
        else if ( util.isObject( arg ) === true || arg instanceof BaseItem === true ) {

            if ( Array.isArray( fields ) === true ) {

                let contents = [];

                for ( let argProp of fields ) {

                    if ( arg[ argProp ] !== undefined ) {
                        
                        contents.push( arg[ argProp ].toString() );
                    }

                    this.__string__ = contents.join( ', ' );
                }
            }
            else {

                this.__string__ = JSON.stringify( arg );
            }

            Object.assign( this, arg );
        }
    }

    toString() {

        return this.__string__;
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

    let itemsHandled = new Set();

    for ( let item of items ) {

        for ( let fieldName of fields ) { 

            if ( item.hasOwnProperty( fieldName ) === false ) {

                continue;
            }

            itemsHandled.add( item );
        }
    }

    let baseItems = [];

    for ( let item of itemsHandled ) {

        baseItems.push( new BaseItem( item, fields ) );
    }

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