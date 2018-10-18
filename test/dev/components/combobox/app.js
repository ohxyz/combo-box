import React from 'react';
import ReactDOM from 'react-dom';
import Combobox from '../../../../src/components/combobox/combobox.js';
import ComboboxList from '../../../../src/components/combobox/combobox-list.js';

require( '../../../../less/components/combobox.less' );

const usersOrgs = [

    { 'org': 'abcde Transport' },
    { 'org': 'abcd Education', name: 'abcd' },
    { 'org': 'abce Health', name: 'abce health people' },
    { 'name': 'Mr abcdg ' },
    { 'name': 'abcd lady', 'org': 'abce LADY GROUP' }
];

ReactDOM.render(

    <Combobox
        id="seach-box-users-orgs"
        inputId="combo-box-input-id"
        name="my-box"
        onSelect={ ( item, self ) => { console.log( '*', item ); } }
        onIconClick= { obj => { console.log( '**', obj ); obj.showAllItems(); } }
        onChange= { obj => console.log( '***', obj ) }
        placeholder="Search users by name, department or agency"
        onFocus={ self => { console.log( 'focus', self ); } }
        onBlur={ self => console.log( 'blur', self ) }
        items={ usersOrgs }
        fields={ [ 'name' ] }
        indexOfFieldsToSort={ 0 }
        strikes="2"
    />,
    document.getElementById( 'combo-box-1' )
);
