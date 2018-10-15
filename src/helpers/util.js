/* Utilities 
 *
 * CommonJS styles
 */

/* Check if it is an object like { a: 1, b: 2 }, not function, null, array, etc 
 *
 * @link https://stackoverflow.com/questions/8834126/how-to-efficiently-check-if-variable-is-array-or-object-in-nodejs-v8
 */
function isObject( a ) {

    return ( !!a ) && ( a.constructor === Object );
};


function generateRandomString() {

    return Math.random().toString( 36 ).slice( 2 );
}


function setDefault( defaultValue, otherValue ) {
    
    if ( defaultValue === undefined ) {
        
        return otherValue;
    }
    
    return defaultValue;
}


function isDescendant( childElem, parentElem ) {
    
    let node = childElem.parentNode;
    
    while ( node !== null && node.parentNode !== undefined ) {
        
        if ( node === parentElem ) {

            return true;
        }
        
        node = node.parentNode;
    }
    
    return false;
}


function isNotEmptyArray( arg ) {

    return Array.isArray( arg ) && arg.length > 0;
}

// Does not include Symbol comparison
function compareArrayOfNonObjects( array1, array2 ) {

    if ( Array.isArray( array1 ) === false || Array.isArray( array2 ) === false ) {

        throw new TypeError( '[MSP][Util] Both arguements should be arrays.' );
    }
    else if ( array1.length !== array2.length ) {

        return false;
    }

    for ( let i = 0 ; i < array1.length ; i ++ ) {

        let itemOfArray1 = array1[ i ];
        let itemOfArray2 = array2[ i ];

        if ( typeof itemOfArray1 === 'number'
                && typeof itemOfArray2 === 'number'
                && isNaN( itemOfArray1 ) === true 
                && isNaN( itemOfArray2 ) === true ) {

            continue;
        }
        else if ( itemOfArray1 === null || itemOfArray2 === null ) {

            // Do nothing
        }
        else if ( typeof itemOfArray1 === 'object' || typeof itemOfArray2 === 'object' ) {

            throw new Error( '[MSP][Util] This function should not contain an object or an array.' );
        }

        if ( itemOfArray1 !== itemOfArray2 ) {

            return false;
        }
    }

    return true;
}


function findIndexFromArrayOfArray( item, arrayOfArray ) {

    if ( Array.isArray( arrayOfArray ) === false ) {

        throw new TypeError( '[MSP][Util] 2nd argument should be an array.' );
    }
    else if ( Array.isArray( item ) === false ) {

        return -1;
    }

    for ( let i = 0; i < arrayOfArray.length; i ++ ) {

        let array = arrayOfArray[ i ];

        try { 

            if ( compareArrayOfNonObjects( item, array ) === true ) {

                return i;
            }
        }
        catch ( error ) {

            return -1;
        }

    }

    return -1;
}

function unionArrayOfArray( array1, array2 ) {

    let union = array2.slice();

    for ( let eachArray of array1 ) {

        let index = findIndexFromArrayOfArray( eachArray, array2 );

        if ( index === -1 ) {

            union.push( eachArray.slice() );
        }
    }

    return union;
}

module.exports = {

    isDescendant,
    isObject,
    generateRandomString,
    setDefault,
    isNotEmptyArray,
    compareArrayOfNonObjects,
    findIndexFromArrayOfArray,
    unionArrayOfArray
};