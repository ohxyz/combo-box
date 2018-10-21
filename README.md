# Quick start

```
<Combobox items={ [ 'abc', 'abd', 'bcd', 'cde', 'bde' ] } onSelect={ item => console.log( item ) } />
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
        onIconClick= { combobox => { console.log( combobox ); combobox.toggleAllItems(); } }
        onSelect={ ( item, combobox ) => { console.log( combobox ); } }
        onChange= { combobox => console.log( combobox ) }
        placeholder="Search..."
        onFocus={ combobox => console.log( combobox ) }
        onBlur={ combobox => console.log( combobox ) }
        indexOfFieldsToSort={ 0 }
        strikes="2"
    />,
    document.getElementById( 'container' )
);
```