var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import { componentManager } from '../core/component-manager.js';
import { ComboboxItem, makeComboboxItems } from './data-model.js';
import { generateRandomString, replaceChars, isDescendant, sliceProps, isUndefinedStringNumberBooleanOrNull } from '../../helpers/util.js';

export default class Combobox extends React.Component {

    constructor(props) {

        super(props);

        this.handleTextInputChange = this.handleTextInputChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleIconClick = this.handleIconClick.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleTextInputFocus = this.handleTextInputFocus.bind(this);
        this.handleTextInputBlur = this.handleTextInputBlur.bind(this);
        this.handleListItemFocus = this.handleListItemFocus.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleItemNavigation = this.handleItemNavigation.bind(this);

        this.textInputElement = null;
        this.text = '';
        this.listElement = null;

        // https://github.com/facebook/react/issues/9328
        this.listItemRef = React.createRef();
        this.listItemHeight = 0;

        this.comboboxItems = makeComboboxItems(props.items, props.fields);

        this.comboBoxListElement = null;
        this.domElement = null;
        this.itemFocused = null;
        this.isTextInputFocused = false;

        this.state = {

            comboboxItemsFiltered: [],
            indexOfItemFocused: -1,
            shouldRenderList: false
        };

        componentManager.addComponent(this.props.id, this);
    }

    showComboboxList(comboboxItems) {

        if (Array.isArray(comboboxItems) === true && comboboxItems.length > 0) {

            this.setState({

                comboboxItemsFiltered: comboboxItems,
                shouldRenderList: true
            });
        }
    }

    clearComboboxList() {

        this.setState({

            comboboxItemsFiltered: [],
            shouldRenderList: false,
            indexOfItemFocused: -1
        });
    }

    handleTextInputChange(event) {

        this.itemFocused = null;

        let text = event.target.value;
        let comboboxItemsFiltered = [];

        this.text = text;

        let numberOfStrikes = parseInt(this.props.strikes, 10);

        if (isNaN(numberOfStrikes) || numberOfStrikes < 1) {

            numberOfStrikes = DEFAULT_NUMBER_OF_STRIKES;
        }

        if (text.length < numberOfStrikes) {

            this.clearComboboxList();
        } else {

            comboboxItemsFiltered = this.filterComboboxItemsByText(this.comboboxItems, text);

            if (comboboxItemsFiltered.length > 0) {

                this.showComboboxList(comboboxItemsFiltered);
            } else {

                this.clearComboboxList();
            }
        }

        this.props.onChange(this);
    }

    handleTextInputFocus() {

        this.isTextInputFocused = true;

        if (this.props.shouldRenderListOnFocus === true && this.text === '') {

            this.showAllItems();
        } else if (this.state.comboboxItemsFiltered.length > 0) {

            this.setState({

                shouldRenderList: true
            });
        }

        this.props.onFocus(this);
    }

    handleTextInputBlur() {

        this.isTextInputFocused = false;
        this.props.onBlur(this);
    }

    filterComboboxItemsByText(comboboxItems, text) {

        let comboboxItemsFiltered = [];

        for (let i = 0; i < comboboxItems.length; i++) {

            let comboboxItem = comboboxItems[i];
            let content = comboboxItem.__string__.toLowerCase();

            if (content.indexOf(text.toLowerCase()) >= 0) {

                comboboxItemsFiltered.push(comboboxItem);
            }
        }

        return comboboxItemsFiltered;
    }

    sortByIndexOfFields({ comboboxItems, fields, index }) {

        // To make undefined value to the bottom of list
        const BIG_COMPARATOR = '\uFFFF';
        let indexOfFields = parseInt(index, 10);

        if (Array.isArray(fields) === true && indexOfFields <= fields.length - 1) {

            let fieldName = fields[indexOfFields];

            comboboxItems.sort((a, b) => {

                let ao = a.__origin__;
                let bo = b.__origin__;

                if (ao[fieldName] === undefined && bo[fieldName] !== undefined) {

                    return BIG_COMPARATOR.localeCompare(bo[fieldName].toString());
                } else if (ao[fieldName] !== undefined && bo[fieldName] === undefined) {

                    return ao[fieldName].toString().localeCompare(BIG_COMPARATOR);
                } else if (ao[fieldName] !== undefined && bo[fieldName] !== undefined) {

                    return ao[fieldName].toString().localeCompare(bo[fieldName].toString());
                } else {

                    return false;
                }
            });
        }
    }

    handleSelect(comboboxItem) {

        this.textInputElement.value = comboboxItem.__string__;
        this.textInputElement.dataset.text = comboboxItem.__string__;
        let comboboxItemsFiltered = this.filterComboboxItemsByText(this.comboboxItems, comboboxItem.__string__);

        this.setState({

            comboboxItemsFiltered: comboboxItemsFiltered,
            shouldRenderList: false
        });

        if (isUndefinedStringNumberBooleanOrNull(comboboxItem.__origin__) === true) {

            this.props.onSelect(comboboxItem.__origin__, this);
        } else {

            this.props.onSelect(comboboxItem, this);
        }
    }

    showAllItems() {

        this.setState({

            comboboxItemsFiltered: this.comboboxItems,
            shouldRenderList: true,
            indexOfItemFocused: -1
        });
    }

    toggleAllItems() {

        this.setState({

            comboboxItemsFiltered: this.comboboxItems,
            shouldRenderList: !this.state.shouldRenderList,
            indexOfItemFocused: -1
        });
    }

    handleIconClick() {

        this.props.onIconClick(this);
    }

    handleClickOutside(event) {

        if (isDescendant(event.target, this.domElement) === false) {

            this.setState({

                shouldRenderList: false
            });
        }
    }

    handleKeyDown(event) {

        if (this.isTextInputFocused === false) {

            return;
        }

        this.handleItemNavigation(event);

        if (event.key === 'Enter' && this.itemFocused instanceof ComboboxItem === true) {

            this.handleSelect(this.itemFocused);
        }
    }

    handleItemNavigation(event) {

        if (this.state.shouldRenderList === false) {

            return;
        }

        let countOfItems = this.state.comboboxItemsFiltered.length;
        let indexOfItemFocused = this.state.indexOfItemFocused;

        if (event.key === 'ArrowDown') {

            if (indexOfItemFocused < countOfItems - 1) {

                indexOfItemFocused++;
            }
        } else if (event.key === 'ArrowUp') {

            if (indexOfItemFocused > 0) {

                indexOfItemFocused--;
            }
        } else {

            return;
        }

        this.itemFocused = this.state.comboboxItemsFiltered[indexOfItemFocused];
        this.textInputElement.value = this.itemFocused.toString();

        this.setState({

            indexOfItemFocused: indexOfItemFocused
        });

        this.syncScrollBar(indexOfItemFocused);
    }

    handleListItemFocus(item) {

        if (item instanceof ComboboxItem === false) {

            return;
        }

        this.itemFocused = item;
        this.textInputElement.value = item.__string__;
    }

    syncScrollBar(indexOfItem) {

        // Also need to check `current` that could be a possible bug in React
        if (this.listItemRef === null || this.listItemRef.current === null) {

            return;
        }

        let style = window.getComputedStyle(this.listItemRef.current);

        this.listItemHeight = parseInt(style.height, 10);
        this.listElement.scrollTop = indexOfItem * this.listItemHeight;
    }

    renderCount() {

        let count = this.state.comboboxItemsFiltered.length;

        return React.createElement(
            'div',
            { className: 'combobox__count' },
            React.createElement(
                'span',
                { className: 'combobox__count-number' },
                count
            ),
            React.createElement(
                'span',
                { className: 'combobox__count-text' },
                ' found'
            )
        );
    }

    renderIcon() {

        return React.createElement(
            'span',
            { className: 'combobox__icon', onClick: this.handleIconClick },
            React.createElement('span', { className: 'combobox__icon-style' })
        );
    }

    renderHeader() {

        let inputProps = sliceProps(this.props, 'input');

        return React.createElement(
            'div',
            { className: 'combobox__header' },
            React.createElement('input', _extends({
                type: 'text',
                className: 'combobox__field',
                'data-text': this.text,
                onChange: this.handleTextInputChange,
                onFocus: this.handleTextInputFocus,
                onBlur: this.handleTextInputBlur,
                ref: elem => this.textInputElement = elem
            }, inputProps)),
            this.props.shouldRenderIcon && this.renderIcon()
        );
    }

    renderContent() {

        if (this.state.shouldRenderList === false || this.state.comboboxItemsFiltered.length === 0) {

            return;
        }

        if (this.props.indexOfFieldsToSort >= 0) {

            this.sortByIndexOfFields({

                comboboxItems: this.state.comboboxItemsFiltered,
                fields: this.props.fields,
                index: this.props.indexOfFieldsToSort
            });
        }

        return React.createElement(
            'div',
            { className: 'combobox__content' },
            this.renderList()
        );
    }

    renderListItem(comboboxItem, key) {

        let className = key === this.state.indexOfItemFocused ? 'combobox__list-item combobox__list-item--focused' : 'combobox__list-item';

        return React.createElement(
            'div',
            { key: key,
                className: className,
                onClick: () => {
                    this.handleSelect(comboboxItem);
                },
                ref: this.listItemRef
            },
            this.renderItem(comboboxItem)
        );
    }

    renderItem(comboboxItem) {

        let htmlWrapper = '<span class="combobox__word-matched">${0}</span>';
        let content = replaceChars(comboboxItem.__string__, this.text, htmlWrapper);

        return React.createElement('div', { className: 'combobox__item', dangerouslySetInnerHTML: { __html: content } });
    }

    renderList() {

        return React.createElement(
            'div',
            { className: 'combobox__list', ref: elem => {
                    this.listElement = elem;
                } },
            this.state.comboboxItemsFiltered.map((item, key) => {

                return this.renderListItem(item, key);
            })
        );
    }

    shouldComponentUpdate(nextProps, nextState) {

        if (this.props.items !== nextProps.items || this.props.fields !== nextProps.fields) {

            this.comboboxItems = makeComboboxItems(nextProps.items, nextProps.fields);
        }

        return true;
    }

    componentDidMount() {

        document.addEventListener('mouseup', this.handleClickOutside);
        document.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {

        document.removeEventListener('mouseup', this.handleClickOutside);
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    render() {

        return React.createElement(
            'div',
            { id: this.props.domElementId,
                className: 'combobox',
                ref: elem => {
                    this.domElement = elem;
                }
            },
            this.props.shouldRenderCount && this.renderCount(),
            this.renderHeader(),
            this.renderContent()
        );
    }
}

Combobox.defaultProps = {

    id: generateRandomString(),
    items: [],
    fields: [],
    domElementId: undefined,
    indexOfFieldsToSort: -1,
    shouldRenderCount: false,
    shouldRenderIcon: false,
    shouldRenderListOnFocus: true,
    strikes: 1,
    onSelect: new Function(),
    onIconClick: new Function(),
    onChange: new Function(),
    onFocus: new Function(),
    onBlur: new Function()
};

export { Combobox };