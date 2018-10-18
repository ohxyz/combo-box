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
        name="my-combobox-name"
        onSelect={ ( item, self ) => { console.log( self ); } }
        onIconClick= { self => { console.log( self ); self.showAllItems(); } }
        onChange= { self => console.log( self ) }
        placeholder="Search..."
        onFocus={ self => { console.log( self ); } }
        onBlur={ self => console.log( self ) }
        items={ users }
        fields={ [ 'name', 'org' ] }
        indexOfFieldsToSort={ 0 }
        strikes="2"
    />,
    document.getElementById('container')
);
```

## Dev
`npm run dev -- --env.component=combo-box`