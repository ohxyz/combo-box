import React from 'react';
import ReactDOM from 'react-dom';
import Combobox from '../../../../src/components/combobox/combobox.js';
import ComboboxList from '../../../../src/components/combobox/combobox-list.js';

require( '../../../../less/components/combobox.less' );

const users = [ 'abc', 'abd', 'bcd', 'bce', 'bde' ];

const usersOrgs = [

    { 'org': 'abcde Transport' },
    { 'org': 'abcd Education', name: 'abcd' },
    { 'org': 'abce Health', name: 'abce health people' },
    { 'name': 'Mr abcdg ' },
    { 'name': 'abcd lady', 'org': 'abce LADY GROUP' }
];

ReactDOM.render(
    <Combobox items={ users } />,
    document.getElementById( 'combobox-1' )
);

ReactDOM.render(
    <Combobox
        id="seach-box-users-orgs"
        inputId="combo-box-input-id"
        inputName="my-box"
        onSelect={ ( item, self ) => { console.log( self ); } }
        onIconClick= { self => { console.log( self ); self.showAllItems(); } }
        onChange= { self => console.log( self ) }
        placeholder="Search..."
        onFocus={ self => { console.log( self ); } }
        onBlur={ self => console.log( self ) }
        items={ usersOrgs }
        fields={ [ 'name' ] }
        indexOfFieldsToSort={ 0 }
        strikes="2"
    />,
    document.getElementById( 'combobox-2' )
);
