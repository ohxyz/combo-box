import React from 'react';
import ReactDOM from 'react-dom';
import Combobox from '../../../../src/components/combobox/combobox.js';
import ComboboxList from '../../../../src/components/combobox/combobox-list.js';

require( '../../../../less/components/combobox.less' );

ReactDOM.render(
    <Combobox items={ [ 'abc', 'abd', 'bcd', 'cde', 'bde' ] } />,
    document.getElementById( 'container' )
);

const usersOrgs = [

    { 'org': 'abcde Transport' },
    { 'org': 'abcd Education', name: 'abcd' },
    { 'org': 'abce Health', name: 'abce health people' },
    { 'name': 'Mr abcdg ' },
    { 'name': 'abcd lady', 'org': 'abce LADY GROUP' }
];

ReactDOM.render(
    <Combobox
        items={ usersOrgs }
        fields={ [ 'name' ] }
        id="seach-box-users-orgs"
        inputId="combo-box-input-id"
        inputName="my-box"
        shouldRenderCount={ true }
        shouldRenderListOnFocus={ false }
        shouldRenderIcon={ true }
        onIconClick= { comobbox => { console.log( comobbox ); comobbox.showAllItems(); } }
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
