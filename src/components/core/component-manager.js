/* Manages all UI components and exposed to browsers' window object
 * 
 */
 
const util = require( '../../helpers/util.js' );

class ComponentManager {

    constructor() {

        this.components = {};
    }

    addComponent( id, component ) {

        this.components[ id ] = component;
    }

    getComponentById( id ) {

        let component = this.components[ id ];

        if ( component !== undefined ) {

            return component;
        }

        return null;
    }

    get() {

        return this.getComponentById.apply( this, arguments );
    }

    add() {

        return this.addComponent.apply( this, arguments );
    }
}

let componentManager = new ComponentManager();

if ( Window && window instanceof Window === true ) {

    window.cman = componentManager;
}

module.exports = {

    componentManager,
    ComponentManager
};
