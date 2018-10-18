import React from 'react';
import ReactDOM from 'react-dom';
import ComboBox from '../../../../src/components/combo-box/combo-box.js';
import ComboBoxList from '../../../../src/components/combo-box/combo-box-list.js';

require( '../../../../less/components/combo-box.less' );

const usersOrgs = [

    { 'org': 'abcde Transport' },
    { 'org': 'abcd Education', name: 'abcd' },
    { 'org': 'abce Health', name: 'abce health people' },
    { 'name': 'Mr abcdg ' },
    { 'name': 'abcd lady', 'org': 'abce LADY GROUP' }
];

ReactDOM.render(

    <ComboBox
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
