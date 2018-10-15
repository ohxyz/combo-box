const module = require( '../data-model.js' );

describe( 'SearchItem object', () => {

    let SearchItem = module.SearchItem;

    test( 'can accept an empty argument', () => {

        expect( new SearchItem() ).toEqual( { __origin__: undefined, __content__: '', __field__: '' } );
    } );

    
} );

describe( 'makeSearchItemsByItems function', () => { 

    let items = [

        { name: 'a' },
        { name: 'b' },
        { name: 'c' }
    ];

    let fn = module.makeSearchItemsByItems;

    test( 'should have 3 SearchItems', () => { 

        expect( fn( items ).length ).toBe( 3 );

    } );
} );

describe( 'makeSearchItemsByFields function', () => {

    let fn = module.makeSearchItemsByFields;
    let items = [

        { first: 'name',  next: 'address',  last: 'number'  },
        { first: 'name2', next: 'address2', last: 'number2' } 
    ];

    test( 'return [] when fields do not contain a property in objects in items', () => {

        let itemsMade = fn( items, [ 'empty' ] );
        expect( itemsMade ).toEqual( [] );
    });

    test( 'can create __field__ ', () => {

        let fields = [ 'first', 'last' ];
        let itemsMade = fn( items, fields );

        expect( itemsMade[2].__field__ ).toBe( 'first' );

    } );

    test( 'can create __origin__ ', () => {

        let fields = [ 'first', 'last' ];
        let itemsMade = fn( items, fields );

        expect( itemsMade[2].__origin__ ).toEqual( { first: 'name2', next: 'address2', last: 'number2' }  );

    } );


} );
