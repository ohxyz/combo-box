const module = require( '../data-model.js' );

describe( 'ComboboxItem object', () => {

    let ComboboxItem = module.ComboboxItem;

    test( 'can accept an empty argument', () => {

        expect( new ComboboxItem() ).toEqual( { __origin__: undefined, __content__: '', __field__: '' } );
    } );

    
} );

describe( 'makeComboboxItemsByItems function', () => { 

    let items = [

        { name: 'a' },
        { name: 'b' },
        { name: 'c' }
    ];

    let fn = module.makeComboboxItemsByItems;

    test( 'should have 3 ComboboxItems', () => { 

        expect( fn( items ).length ).toBe( 3 );

    } );
} );

describe( 'makeComboboxItemsByFields function', () => {

    let fn = module.makeComboboxItemsByFields;
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
