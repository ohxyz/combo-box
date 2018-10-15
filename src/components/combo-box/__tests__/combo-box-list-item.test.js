import React from 'react';
import ComboBoxListItem from '../combo-box-list-item.js';
import renderer from 'react-test-renderer';

let item = { __content__: 'Item content' };

it( 'should render with default settings', () => {

    const tree = renderer
        .create( <ComboBoxListItem item={ item } /> )
        .toJSON();

    expect( tree ).toMatchSnapshot();

} );

describe( 'ComboBoxListItem instance', () => {

    let mockCallback = jest.fn();
    let props = { item: item, onSelect: mockCallback }
    let listItem = new ComboBoxListItem( props );

    test( 'can call onSelect from props', () => { 

        listItem.handleClick();
        expect( mockCallback.mock.calls.length ).toBe( 1 );

    } );


} );

