# Quick start


# Example

```
import React from 'react';
import ReactDOM from 'react-dom';
import { Combobox } from '@ohxyz/combobox';

const users = [

    { 'org': 'abcde org' },
    { 'org': 'abcd org', name: 'abcd' },
    { 'org': 'abce corp', name: 'abce man' },
    { 'name': 'Mr abcd ' },
    { 'name': 'Ms abcd', 'org': 'abce corp' }
];

ReactDOM.render(
    <Combobox
        id="my-combobox"
        items={ users }
        onSelect={ ( item, comobobox ) => { console.log( comobobox ); } }
        onIconClick= { comobobox => { console.log( comobobox ); comobobox.showAllItems(); } }
        onChange= { comobobox => console.log( comobobox ) }
        placeholder="Search..."
        onFocus={ comobobox => { console.log( comobobox ); } }
        onBlur={ comobobox => console.log( comobobox ) }
        fields={ [ 'name', 'org' ] }
        strikes="2"
    />,
    document.getElementById( 'container' )
);
```