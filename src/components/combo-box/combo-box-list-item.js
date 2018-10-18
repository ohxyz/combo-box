import React from 'react';

export default class ComboBoxListItem extends React.Component {

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
        let content = item.__content__;
        let isFocused = this.props.isFocused;

        let className = this.props.isFocused === true
                      ? 'combo-box__list-item combo-box__list-item--focused'
                      : 'combo-box__list-item';

        return (

            <div className={ className } onClick={ this.handleClick } ref={ elem => this.domElement = elem }>
                { content }
            </div>
        )
    }

}