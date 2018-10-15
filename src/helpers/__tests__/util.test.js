const util = require( '../util.js' );

describe( 'setDefault function', () => { 

    test( 'sets a default value when a variable is undefined', () => { 

        let a = undefined;

        expect( util.setDefault( a, 1) ).toBe( 1 );
    } );

    test( 'sets a default value when an object not having a property', () => { 

        let a = {};

        expect( util.setDefault( a.x, 2) ).toBe( 2 );
    } );

} );

describe( 'generateRandomString function', () => { 

    test( 'returns a string that at least has 1 character', () => { 

        expect( util.generateRandomString().length ).toBeGreaterThan( 0 );
    } );

} );

describe( 'isDescendant function', () => { 

    test( 'will return false when childElem\'s parentNode is empty', () => {

        let child = {

            parentNode: {

                parentNode: {}
            }
        };

        let result = util.isDescendant( child, {} );
        expect( result ).toBe( false );

    } );

} );

describe( 'isObject function', () => { 

    test( 'is false when argument is null', () => { 

        expect( util.isObject( null ) ).toBe( false );

    } );

    test( 'is false when argument is function', () => { 

        expect( util.isObject( new Function() ) ).toBe( false );

    } );

} );

describe( 'isNotEmptyArray function', () => { 

    test( 'has null as argument', () => { 

        expect( util.isNotEmptyArray( null ) ).toBe( false );
    } );

    test( 'has an array ', () => { 

        expect( util.isNotEmptyArray( [ null ] ) ).toBe( true );
    } );

    test( 'has an empty array ', () => { 

        expect( util.isNotEmptyArray( [] ) ).toBe( false );
    } );

} )

describe( 'compareArrayOfNonObjects function', () => {

    test( 'returns true when two arrays are all empty', () => { 

        let arr1 = [];
        let arr2 = [];

        expect( util.compareArrayOfNonObjects( arr1, arr2 ) ).toBe( true );
    } );

    test( 'returns false when two arrays of different size', () => { 

        let arr1 = [ 1, 2 ];
        let arr2 = [ 3 ];

        expect( util.compareArrayOfNonObjects( arr1, arr2 ) ).toBe( false );
    } );

    test( 'returns true when two arrays have same items', () => { 

        let arr1 = [ -1, null, '', NaN,  ];
        let arr2 = [ -1, null, '', NaN,  ];

        expect( util.compareArrayOfNonObjects( arr1, arr2 ) ).toBe( true );

    } );

    test( 'returns false', () => { 

        let arr1 = [ 'AA', 'BB' ];
        let arr2 = [ 'CC', 'DD' ];

        expect( util.compareArrayOfNonObjects( arr1, arr2 ) ).toBe( false );

    } );

} );

describe( 'findIndexFromArrayOfArray function', () => {

    test( 'returns false when 1st argument is not an array', () => { 

        expect( util.findIndexFromArrayOfArray( undefined, [] ) ).toBe( -1 );
    } );

    test( 'returns 1 when array is found', () => {

        let item = [ 1, 2 ];

        let array = [

            [ 3, 4 ],
            [ 1, 2 ],
            [ 5, 6 ],
            [ 1, 2 ]
        ];

        expect( util.findIndexFromArrayOfArray( item, array ) ).toBe( 1 );
    } );


    test( 'returns 3 when array is found', () => {

        let item = [ 1, 2, 'a' ];

        let array = [

            [ 3, 4 ],
            [ 1, 2 ],
            [ 5, 6 ],
            [ 1, 2, 'a' ]
        ];

        expect( util.findIndexFromArrayOfArray( item, array ) ).toBe( 3 );
    } );

} );

describe( 'unionArrayOfArray function', () => { 

    test( 'case 1', () => { 

        let a1 = [ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ] ];
        let a2 = [ [ 0, 0 ], [ 1, 2 ], [ 7, 8 ] ];

        expect( util.unionArrayOfArray( a1, a2 ).length )
            .toBe( util.unionArrayOfArray( a2, a1 ).length );

    } );

    test( 'case 2', () => { 

        let a1 = [ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ] ];
        let a2 = [ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ] ];

        expect( util.unionArrayOfArray( a1, a2 ).length ).toBe( a2.length );

    } );

    test( 'case 3', () => { 

        let a1 = [ [ 1, 2 ], [ 3, 4 ], [ 5, '6' ] ];
        let a2 = [ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ] ];

        expect( util.unionArrayOfArray( a1, a2 ).length ).toBe( a2.length + 1 );

    } );

    test( 'case 4', () => { 

        let a1 = [ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ] ];
        let a2 = [];

        expect( util.unionArrayOfArray( a1, a2 ).length ).toBe( a1.length );

    } );

    test( 'case 5', () => { 

        let a1 = [];
        let a2 = [ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ] ];

        expect( util.unionArrayOfArray( a1, a2 ).length ).toBe( a2.length );

    } );

} );


