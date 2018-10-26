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

const persons = [
    { height:  175,       name:    'Andrea'                    },
    { height:  167,       name:    'Anthony',  sex:     'Male' },
    { name:   'Annie',    sex:     'Female',   height:   180   },
    { name:   'Campbell', height:   175                        },
    { sex:    'Female',   name:    'Bennie',   height:   175   },
    { name:   'Cameron',  height:   173,       sex:     'Male' },
    { name:   'Benjamin', sex:     'Male',     height:   167   },
    { name:   'Anna',     sex:     'Female',   height:   169   },
    { name:   'Benson',   sex:     'Male'                      }
];

ReactDOM.render(
    <Combobox
        items={ persons }
        fields={ [ 'name', 'height' ] }
        indexOfFieldsToSort={ 1 }
        id="my-combobox"
        inputId="my-combobox__input-id"
        inputName="my-combobox__input-name"
        placeholder="Search people..."
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

# Inheritance
```
class MyCombobox extends Combobox {

    renderItem( item ) {
        return (
            <div className="combobox__item">
                <div>{ item.name }</div>
                { item.sex && <div>{ { Male: 'Man', Female: 'Woman' }[ item.sex ] }</div> }
                { item.height && <div>Height: { item.height }CM</div> }
            </div>
        );
    }
}

ReactDOM.render(
    <MyCombobox items={ persons } />,
    document.getElementById( 'container-3' )
);
```