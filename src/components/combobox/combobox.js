import React from 'react';
import ComboboxList from './combobox-list.js';
import { componentManager } from '../core/component-manager.js';
import { generateRandomString, setDefault, isDescendant } from '../../helpers/util.js';
import { BaseItem, makeBaseItems } from './data-model.js';

const DEFAULT_NUMBER_OF_STRIKES = 1;

export default class Combobox extends React.Component {

    constructor( props ) {

        super( props );
        
        this.handleTextInputChange = this.handleTextInputChange.bind( this );
        this.handleSelect = this.handleSelect.bind( this );
        this.handleIconClick = this.handleIconClick.bind( this );
        this.handleClickOutside = this.handleClickOutside.bind( this );
        this.handleTextInputFocus = this.handleTextInputFocus.bind( this );
        this.handleTextInputBlur = this.handleTextInputBlur.bind( this );
        this.handleListItemFocus = this.handleListItemFocus.bind( this );
        this.handleKeyDown = this.handleKeyDown.bind( this );

        this.textInputElement = null;
        this.textInputElementId = setDefault( props.inputId, undefined );
        this.textInputElementName = setDefault( props.inputName, undefined );
        this.text = '';

        this.items = setDefault( props.items, [] );
        this.fields = setDefault( props.fields, [] );
        this.baseItems = makeBaseItems( props.items, this.fields );
        
        this.comboBoxListElement = null;
        this.domElement = null;
        this.itemFocused = null;
        this.isTextInputFocused = false;
        this.isIconClicked = false;
        this.iconStyle = setDefault( props.iconStyle, '' );
        this.domElementId = setDefault( props.id, undefined );
        this.placeholder = setDefault( props.placeholder, '');
        this.indexOfFieldsToSort = setDefault( props.indexOfFieldsToSort, -1 );

        this.onPropsSelect = setDefault( props.onSelect, new Function() );
        this.onPropsIconClick =  setDefault( props.onIconClick, new Function() );
        this.onPropsChange = setDefault( props.onChange, new Function() );
        this.onPropsFocus = setDefault( props.onFocus, new Function() );
        this.onPropsBlur = setDefault( props.onBlur, new Function() );

        this.shouldRenderListOnFocus = setDefault( 
            props.shouldRenderListOnFocus, true 
        );

        this.numberOfStrikes = parseInt( props.strikes, 10 );

        if ( isNaN( this.numberOfStrikes ) || this.numberOfStrikes < 1 ) {

            this.numberOfStrikes = DEFAULT_NUMBER_OF_STRIKES;
        }

        this.state = {

            itemsFiltered: [],
            shouldRenderList: setDefault( props.shouldRenderList, false ),
            shouldRenderCount: setDefault( props.shouldRenderCount, false ),
            shouldRenderIcon: setDefault( props.shouldRenderIcon, false )
        };
        
        this.id = setDefault( props.id, generateRandomString() );
        
        componentManager.addComponent( this.id, this );
    }

    updateItems( items, fields ) {

        let fieldArray = [];

        if ( Array.isArray( fields ) === false ) {

            fieldArray = this.fields;
        }

        this.items = items;
        this.baseItems = makeBaseItems( items, fieldArray );

        let itemsFiltered = this.filterBaseItemsByText( baseItems, text );

        this.setState( { 

            itemsFiltered: itemsFiltered
        } );
    }

    showComboboxList( items ) {

        if ( Array.isArray( items ) === true && items.length > 0 ) {

            this.setState( { 

                itemsFiltered: items,
                shouldRenderList: true
            } );
        }
    }

    clearComboboxList() {

        this.setState( { 

            itemsFiltered: [],
            shouldRenderList: false
        } );
    }

    handleTextInputChange( event ) {

        this.itemFocused = null;

        let text = event.target.value;
        let itemsFiltered = [];

        this.text = text;

        if ( text.length < this.numberOfStrikes ) {

            this.clearComboboxList();
        }
        else { 

            itemsFiltered = this.filterBaseItemsByText( this.baseItems, text );

            if ( itemsFiltered.length > 0 ) {

                this.showComboboxList( itemsFiltered );
            }
            else { 

                this.clearComboboxList();
            }
        }

        this.onPropsChange( this );
    }

    handleTextInputFocus() {

        this.isTextInputFocused = true;

        if ( this.shouldRenderListOnFocus === true && this.text === '' ) {

            this.showAllItems();
        }
        else if ( this.state.itemsFiltered.length > 0 ) {

            this.setState( {

                shouldRenderList: true
            } );
        }

        this.onPropsFocus( this );
    }

    handleTextInputBlur() {

        this.isTextInputFocused = false;
        this.onPropsBlur( this );
    }

    filterBaseItemsByText( baseItems, text ) {

        let itemsFiltered = [];

        for ( let i = 0; i < baseItems.length; i ++ ) {

            let baseItem = baseItems[ i ];
            let content = baseItem.__content__.toLowerCase();

            if ( content.indexOf( text.toLowerCase() ) >= 0 ) {

                itemsFiltered.push( baseItem );
            }
        }

        return itemsFiltered;
    }

    sortByIndexOfFields( { items, fields, index } ) {

        let indexOfFields = parseInt( index, 10 );

        if ( Array.isArray( fields ) === true 
                && indexOfFields <= fields.length - 1 ) {

            let fieldName = fields[ indexOfFields ];

            items.sort( ( a, b ) => {

                if ( a instanceof BaseItem === true 
                        && b instanceof BaseItem === true ) {

                    return a.__content__.localeCompare( b.__content__ );
                }
                else if ( typeof a !== 'object' || typeof b !== 'object' ) {

                    return false;
                }
                else if ( a.hasOwnProperty( fieldName ) === false 
                            || b.hasOwnProperty( fieldName ) === false ) {

                    return false;
                }
                else {

                    return a[ fieldName ].localeCompare( b[ fieldName ] );
                }

            } );
        }
    }

    handleSelect( item ) {

        this.textInputElement.value = item.__content__;
        this.textInputElement.dataset.text = item.__content__;
        let itemsFiltered = this.filterBaseItemsByText( this.baseItems, item.__content__ );

        this.setState( {

            itemsFiltered: itemsFiltered,
            shouldRenderList: false,
        } );

        this.onPropsSelect( item, this );
    }

    clearSearch() {

        this.textInputElement.value = '';
        this.textInputElement.dataset.text = '';

        this.clearComboboxList();
    }

    showAllItems() {

        this.setState( {

            itemsFiltered: this.baseItems,
            shouldRenderList: true
        } );
    }

    toggleAllItems() {

        this.setState( {

            itemsFiltered: this.baseItems,
            shouldRenderList: !this.state.shouldRenderList
        } );
    }

    handleIconClick() {

        this.onPropsIconClick( this );
    }

    handleClickOutside( event ) {

        if ( isDescendant( event.target, this.domElement ) === false ){
                        
            this.setState( {

                shouldRenderList: false
            } );
        }
    }

    handleKeyDown( event ) {

        if ( this.isTextInputFocused === false ) {

            return;
        }

        if ( event.key === 'Enter'
                && ( this.itemFocused instanceof BaseItem ) === true ) {

            this.handleSelect( this.itemFocused );
        }
    }

    handleListItemFocus( item ) {

        if ( item instanceof BaseItem === false ) {

            return;
        }

        this.itemFocused = item;
        this.textInputElement.value = item.__content__;
    }

    componentDidMount() {
        
        document.addEventListener( 'mouseup', this.handleClickOutside );
        document.addEventListener( 'keydown', this.handleKeyDown );
    }
    
    componentWillUnmount() {

        document.removeEventListener( 'mouseup', this.handleClickOutside );
        document.removeEventListener( 'keydown', this.handleKeyDown );
    }

    renderCount() {

        if ( this.state.shouldRenderCount === false ) {

            return;
        }

        let count = this.state.itemsFiltered.length;

        return (

            <div className="combobox__count">
                <span className="combobox__count-number">{ count }</span>
                <span className="combobox__count-text"> found</span>
            </div>
        );
    }

    renderIcon() {

        if ( this.state.shouldRenderIcon === false ) {

            return;
        }

        return (
            <span className="combobox__icon" onClick={ this.handleIconClick }>
                { this.renderIconStyle() }
            </span>
        );
    }

    renderIconStyle() {

        return <span className="combobox__icon-style">{ this.iconStyle }</span>;
    }

    renderHeader() {

        return (

            <div className="combobox__header">
                <input
                    id={ this.textInputElementId }
                    type="text" 
                    className="combobox__field"
                    name={ this.textInputElementName }
                    data-text={ this.text }
                    placeholder={ this.placeholder }
                    onChange={ this.handleTextInputChange }
                    onFocus={ this.handleTextInputFocus }
                    onBlur={ this.handleTextInputBlur }
                    ref={ elem => this.textInputElement = elem }
                />
                { this.renderIcon() }
            </div>
        );
    }

    renderContent() {

        if ( this.state.shouldRenderList === false 
                || this.state.itemsFiltered.length === 0 ) {

            return;
        }

        this.sortByIndexOfFields( {

            items: this.state.itemsFiltered,
            fields: this.fields,
            index: this.indexOfFieldsToSort

        } );

        return (

            <div className="combobox__content">
                <ComboboxList
                    items={ this.state.itemsFiltered }
                    onSelect={ this.handleSelect }
                    onListItemFocus={ this.handleListItemFocus }
                    ref={ elem => { this.comboboxListElement = elem; } }
                />
            </div>
        );
    }

    render() {

        return (

            <div id={ this.domElementId } 
                className="combobox" 
                ref={ elem => { this.domElement = elem; } } 
            >
                { this.renderCount() }
                { this.renderHeader() }
                { this.renderContent() }
            </div>
        );
    }
}

export {

    Combobox
};