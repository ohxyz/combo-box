import React from 'react';
import ReactDOM from 'react-dom';
import Combobox from '../../../../src/components/combobox/combobox.js';

require( '../../../../less/components/combobox.less' );

ReactDOM.render(
    <Combobox items={ [ 'abc', 'abd', 'bcd', 'cde', 'bde' ] } 
              onSelect={ item => console.log( item ) } 
    />,
    document.getElementById( 'container-1' )
);

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
    document.getElementById( 'container-2' )
);
