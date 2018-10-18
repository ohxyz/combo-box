import React from 'react';
import ComboboxListItem from '../combobox-list-item.js';
import renderer from 'react-test-renderer';

let item = { __content__: 'Item content' };

it( 'should render with default settings', () => {

    const tree = renderer
        .create( <ComboboxListItem item={ item } /> )
        .toJSON();

    expect( tree ).toMatchSnapshot();

} );

describe( 'ComboboxListItem instance', () => {

    let mockCallback = jest.fn();
    let props = { item: item, onSelect: mockCallback }
    let listItem = new ComboboxListItem( props );

    test( 'can call onSelect from props', () => { 

        listItem.handleClick();
        expect( mockCallback.mock.calls.length ).toBe( 1 );

    } );


} );

