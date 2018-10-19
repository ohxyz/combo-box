import React from 'react';
import ReactDOM from 'react-dom';
import Combobox from '../../../../src/components/combobox/combobox.js';
import ComboboxList from '../../../../src/components/combobox/combobox-list.js';

require( '../../../../less/components/combobox.less' );

ReactDOM.render(
    <Combobox items={ [ 'abc', 'abd', 'bcd', 'cde', 'bde' ] } />,
    document.getElementById( 'container' )
);

const users = [

    { 'org': 'abcde org' },
    { 'org': 'abcd org', name: 'abc' },
    { 'org': 'abce corp', name: 'bcd man' },
    { 'name': 'Mr abcd ' },
    { 'name': 'Ms cde', 'org': 'abce corp' }
];

ReactDOM.render(
    <Combobox
        items={ users }
        fields={ [ 'name' ] }
        id="my-combobox"
        inputId="my-combobox__input-id"
        inputName="my-combobox__input-name"
        shouldRenderCount={ true }
        shouldRenderListOnFocus={ false }
        shouldRenderIcon={ true }
        onIconClick= { comobbox => { console.log( comobbox ); comobbox.toggleAllItems(); } }
        onSelect={ ( item, comobbox ) => { console.log( comobbox ); } }
        onChange= { comobbox => console.log( comobbox ) }
        placeholder="Search..."
        onFocus={ comobbox => console.log( comobbox ) }
        onBlur={ comobbox => console.log( comobbox ) }
        indexOfFieldsToSort={ 0 }
        strikes="2"
    />,
    document.getElementById( 'container-2' )
);
