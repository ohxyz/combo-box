import React from 'react';
import util from '../../helpers/util.js';

export default class ComboboxListItem extends React.Component {

    constructor(props) {

        super(props);
        this.handleClick = this.handleClick.bind(this);

        this.domElement = null;
        this.wrapper = '<span class="combobox__word-matched">${0}</span>';
    }

    handleClick() {

        this.props.onSelect(this.props.item);
    }

    render() {

        let item = this.props.item;
        let content = item.wrap(this.props.wordMatched, this.wrapper);
        let isFocused = this.props.isFocused;

        let className = this.props.isFocused === true ? 'combobox__list-item combobox__list-item--focused' : 'combobox__list-item';

        return React.createElement('div', { className: className,
            onClick: this.handleClick,
            ref: elem => this.domElement = elem,
            dangerouslySetInnerHTML: { __html: content }
        });
    }

}

ComboboxListItem.defaultProps = {

    wordMatched: ''
};