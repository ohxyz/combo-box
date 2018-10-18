import React from 'react';
import ComboboList from '../combobox-list.js';
import renderer from 'react-test-renderer';

let items = [

    { __content__: 'Item content' },
    { __content__: 'Item content 2' },
    { __content__: 'Item content 3' }
];

it( 'should render with default settings', () => {

    const tree = renderer
        .create( <ComboboList items={ items } /> )
        .toJSON();

    expect( tree ).toMatchSnapshot();

} );

describe( 'ComboboList instance with 3 items', () => {

    let props = {

        items: items,
    };

    let comboboxList = new ComboboxList( props );

    test( 'should have 3 items', () => {

        expect( comboboxList.state.items.length ).toBe( 3 );

    } );

    test( 'can get item by pressing Arrow Down', () => {

        // Mocks
        comboboxList.syncScrollBar = new Function();
        comboboxList.setState = new Function();
        comboboxList.handleKeyDown( { key: 'ArrowDown' } );

        expect( comboboxList.itemFocused.__content__ ).toBe( 'Item content' );

    } );

    test( 'can get right selected item', () => {

        // Mocks
        comboboxList.syncScrollBar = new Function();
        comboboxList.setState = new Function();
        comboboxList.state.indexOfItemFocused = 1;

        expect( comboboxList.render().props.children[ 1 ].props.isFocused ).toBe( true );
        expect( comboboxList.render().props.children[ 0 ].props.isFocused ).toBe( false );
       
    } );
} );

