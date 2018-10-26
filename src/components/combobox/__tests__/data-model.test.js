const dataModel = require( '../data-model.js' );

describe( 'ComboboxItem object', () => {

    let ComboboxItem = dataModel.ComboboxItem;

    test( 'can add a wrapper', () => { 

        let item = new ComboboxItem( { a: 'abcd - bc' } );
        let result = item.wrap( 'bc', '<span>${0}</span>' );

        expect( result ).toBe( 'a<span>bc</span>d - <span>bc</span>' );
    } );
} );

describe( 'makeComboboxItemsByItems function', () => { 

    let items = [

        { name: 'a' },
        { name: 'b' },
        { name: 'c' }
    ];

    let fn = dataModel.makeComboboxItemsByItems;

    test( 'should have 3 ComboboxItems', () => { 

        expect( fn( items ).length ).toBe( 3 );

    } );
} );

describe( 'makeComboboxItemsByFields function', () => {

    let fn = dataModel.makeComboboxItemsByFields;
    let items = [

        { first: 'name',  next: 'address',  last: 'number'  },
        { first: 'name2', next: 'address2', last: 'number2' } 
    ];

    test( 'return [] when fields do not contain a property in objects in items', () => {

        let itemsMade = fn( items, [ 'empty' ] );
        expect( itemsMade ).toEqual( [] );
    });

    test( 'can create __origin__ ', () => {

        let fields = [ 'first', 'last' ];
        let itemsMade = fn( items, fields );

        expect( itemsMade[2].__origin__ ).toEqual( { first: 'name2', next: 'address2', last: 'number2' }  );

    } );
} );
