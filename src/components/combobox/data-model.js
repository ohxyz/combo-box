/**
 * Data types only used in the component 
 *
 */

const util = require( '../../helpers/util.js' );

class ComboboxItem {

    constructor( arg ) {

        this.__string__ = '';
        this.__origin__ = arg;

        let type = typeof arg;

        if ( type === 'string'
                || type === 'number'
                || type === 'boolean') {

            this.__string__ = arg.toString();
        }
        else if ( arg === null ) {

            this.__string__ = '';
        }
        else if ( util.isObject( arg ) === true || arg instanceof ComboboxItem === true ) {

            let string = JSON.stringify( arg );
            let copy = JSON.parse( string );
            let contents = [];

            for ( let prop in copy ) {

                if ( copy[ prop ] !== undefined ) {
                    
                    contents.push( copy[ prop ].toString() );
                }

                this.__string__ = contents.join( ', ' );
            }

            Object.assign( this, copy );
        }
    }

    toString() {

        return this.__string__;
    }

    wrap( text, htmlMarkup ) {

        if ( text === '' || text == undefined ) {

            return this.__string__;
        }

        let regex = new RegExp( text, 'ig' );
        let replaced = this.__string__.replace( regex, htmlMarkup ).replace( /\$\{[0]\}/ig, text );

        return replaced;
    }
}

function makeComboboxItemsByItems( items ) {

    if ( Array.isArray( items ) === false ) {

        return [];
    }

    let comboboxItems = items.map( item => {

        return new ComboboxItem( item );
    } );

    return comboboxItems;
}

function makeComboboxItemsByFields( items, fields ) {

    let itemsHandled = new Set();

    for ( let item of items ) {

        for ( let fieldName of fields ) { 

            if ( item.hasOwnProperty( fieldName ) === false ) {

                continue;
            }

            itemsHandled.add( item );
        }
    }

    let comboboxItems = [];

    for ( let item of itemsHandled ) {

        comboboxItems.push( new ComboboxItem( item ) );
    }

    return comboboxItems;
}


function makeComboboxItems( items, fields ) {

    if ( Array.isArray( fields ) === true && fields.length > 0 ) {

        return makeComboboxItemsByFields( items, fields );
    }

    return makeComboboxItemsByItems( items );
}

module.exports = {

    ComboboxItem,
    makeComboboxItems,
    makeComboboxItemsByItems,
    makeComboboxItemsByFields,
};