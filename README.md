# Quick start

```
<Combobox items={ [ 'abc', 'abd', 'bcd', 'cde', 'bde' ] } />
```

# More

```
import React from 'react';
import ReactDOM from 'react-dom';
import { Combobox } from '@ohxyz/combobox';
import '@ohxyz/combobox/style/default.css';

const users = [
    { 'org': 'abcde org' },
    { 'org': 'abcd org', name: 'abc' },
    { 'org': 'abce corp', name: 'bcd man' },
    { 'name': 'Mr abcd' },
    { 'name': 'Ms cde', 'org': 'abce corp' },
    { 'other': 'na' }
];

ReactDOM.render(
    <Combobox
        items={ users }
        fields={ [ 'name', 'org' ] }
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
    document.getElementById( 'container' )
);
```