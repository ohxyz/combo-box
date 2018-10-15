import React from 'react';
import ComboBoxList from '../combo-box-list.js';
import renderer from 'react-test-renderer';

let items = [

    { __content__: 'Item content' },
    { __content__: 'Item content 2' },
    { __content__: 'Item content 3' }
];

it( 'should render with default settings', () => {

    const tree = renderer
        .create( <ComboBoxList items={ items } /> )
        .toJSON();

    expect( tree ).toMatchSnapshot();

} );

describe( 'ComboBoxList instance with 3 items', () => {

    let props = {

        items: items,
    };

    let comboBoxList = new ComboBoxList( props );

    test( 'should have 3 items', () => {

        expect( comboBoxList.state.items.length ).toBe( 3 );

    } );

    test( 'can get item by pressing Arrow Down', () => {

        // Mocks
        comboBoxList.syncScrollBar = new Function();
        comboBoxList.setState = new Function();
        comboBoxList.handleKeyDown( { key: 'ArrowDown' } );

        expect( comboBoxList.itemFocused.__content__ ).toBe( 'Item content' );

    } );

    test( 'can get right selected item', () => {

        // Mocks
        comboBoxList.syncScrollBar = new Function();
        comboBoxList.setState = new Function();
        comboBoxList.state.indexOfItemFocused = 1;

        expect( comboBoxList.render().props.children[ 1 ].props.isFocused ).toBe( true );
        expect( comboBoxList.render().props.children[ 0 ].props.isFocused ).toBe( false );
       
    } );
} );

