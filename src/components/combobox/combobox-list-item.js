import React from 'react';
import util from '../../helpers/util.js';

export default class ComboboxListItem extends React.Component {

    constructor( props ) {

        super( props );
        this.handleClick = this.handleClick.bind( this );

        this.domElement = null;
    }

    handleClick() {

        this.props.onSelect( this.props.item );
    }

    render() {

        let item = this.props.item;
        let content = item.__string__;
        let isFocused = this.props.isFocused;

        let className = this.props.isFocused === true
                      ? 'combobox__list-item combobox__list-item--focused'
                      : 'combobox__list-item';

        return (

            <div className={ className } 
                 onClick={ this.handleClick } 
                 ref={ elem => this.domElement = elem }
            >
                { content }
            </div>
        )
    }

}