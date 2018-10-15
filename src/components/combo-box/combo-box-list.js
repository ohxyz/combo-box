import React from 'react';
import ComboBoxListItem from './combo-box-list-item.js';

export default class ComboBoxList extends React.Component {

    constructor( props ) {

        super( props );
        this.handleKeyDown = this.handleKeyDown.bind( this );
        this.syncScrollBar = this.syncScrollBar.bind( this );

        this.itemFocused = null;
        this.domElement = null;
        this.comboBoxListItemElement = null;

        this.comboBoxListItemHeight = 0;

        this.state = {

            indexOfItemFocused: -1,
            items: props.items
        }
    }

    static getDerivedStateFromProps( nextProps, prevState ) {
        
        return {

            items: nextProps.items
        };
    }

    handleKeyDown( event ) {

        let countOfItems = this.state.items.length;
        let indexOfItemFocused = this.state.indexOfItemFocused;

        if ( event.key === 'ArrowDown' ) {

            if ( indexOfItemFocused < countOfItems - 1 ) {

                indexOfItemFocused ++;
            }

        }
        else if ( event.key === 'ArrowUp' ) {

            if ( indexOfItemFocused > 0 ) {

                indexOfItemFocused --;
            }

        }
        else {

            return;
        }

        this.itemFocused = this.state.items[ indexOfItemFocused ];

        if ( this.props.onListItemFocus instanceof Function ) {

            this.props.onListItemFocus( this.itemFocused );
        }

        this.setState( {

            indexOfItemFocused: indexOfItemFocused

        } );

        this.syncScrollBar( indexOfItemFocused );

    }

    syncScrollBar( indexOfItem ) {

         this.domElement.scrollTop = indexOfItem * this.comboBoxListItemHeight;
    }
    
    componentDidMount() {

        // Check this.comboBoxListItemElement.domElement in case there is no ComboBoxListItem
        if ( this.comboBoxListItemElement === null 
                || this.comboBoxListItemElement.domElement === null ) {

            return;
        }

        let style = window.getComputedStyle( this.comboBoxListItemElement.domElement );

        this.comboBoxListItemHeight = parseInt( style.height, 10 );

        document.addEventListener( 'keydown', this.handleKeyDown );
    }
    
    componentWillUnmount() {

        document.removeEventListener( 'keydown', this.handleKeyDown );
    }

    render() {

        let items = this.state.items;
        let onPropsSelect = new Function();

        if ( this.props.onSelect instanceof Function ) {

            onPropsSelect = this.props.onSelect;
        }

        return (

            <div 
                className="combo-box__list"
                ref={ elem => { this.domElement = elem; } }
            >
            {
                
                items.map( ( item, key ) => {

                    let isFocused = false;

                    if ( key === this.state.indexOfItemFocused ) {

                        isFocused = true;
                    }

                    return (

                        <ComboBoxListItem 
                            key={ key }
                            item={ item }
                            isFocused={ isFocused }
                            onSelect={ onPropsSelect }
                            ref={ elem => this.searchListItemElement = elem }
                        />
                    );
                    
                } )
            }
            </div>
        )
    }
}