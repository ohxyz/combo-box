const componentManagerModule = require( '../component-manager.js' );
const ComponentManager = componentManagerModule.ComponentManager;
const componentManager = componentManagerModule.componentManager;

describe( 'ComponentManager class', () => {

    let localComponentManager = new ComponentManager();

    test( 'can add a component', () => { 

        localComponentManager.add( 'a', { id: 'id-a' } );
        expect( localComponentManager.components.a.id ).toBe( 'id-a' );

    } );

    test( 'can get a component', () => { 

        localComponentManager.add( 'b', { id: 'id-b' } );
        expect( localComponentManager.get( 'b' ).id ).toBe( 'id-b' );

    } );

} );

