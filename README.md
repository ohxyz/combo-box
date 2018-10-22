# Quick start

```
<Combobox items={ [ 'abc', 'abd', 'bcd', 'cde', 'bde' ] } 
          onSelect={ item => console.log( item ) } 
/>
```

# More

```
import React from 'react';
import ReactDOM from 'react-dom';
import { Combobox } from '@ohxyz/combobox';
import '@ohxyz/combobox/style/default.css';

const users = [

    { name: 'abc' },
    { name: 'bcd man', org: 'cde corp' },
    { org: 'bcd org' },
    { name: 'abc', org: 'bcd org' },
    { name: 'Mr abc' },
    { org: 'abc org' },
    { name: 'Ms abc', org: 'abce corp' },
    { others: 'na' }
];

ReactDOM.render(
    <Combobox
        items={ users }
        fields={ [ 'name', 'org' ] }
        indexOfFieldsToSort={ 0 }
        id="my-combobox"
        inputId="my-combobox__input-id"
        inputName="my-combobox__input-name"
        placeholder="Search..."
        strikes={ 2 }
        shouldRenderCount={ true }
        shouldRenderListOnFocus={ false }
        shouldRenderIcon={ true }
        onIconClick= { combobox => { console.log( combobox ); combobox.toggleAllItems(); } }
        onSelect={ ( item, combobox ) => { console.log( item, combobox ); } }
        onChange= { combobox => console.log( combobox ) }
        onFocus={ combobox => console.log( combobox ) }
        onBlur={ combobox => console.log( combobox ) }
    />,
    document.getElementById( 'container' )
);
```