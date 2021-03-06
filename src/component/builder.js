const React = require('react');
const assign = require('object-assign');
//var isObject = require('lodash/lang/isObject');
//var isFunction = require('lodash/lang/isFunction');

/**
* Create a component with a mixin except id the component is mixin only.
* @param {object}  mixin - The component mixin.
* @param {Boolean} isMixinOnly - define if the component is a mixin only.
* @return {object} - {component} the built react component.
*/
function createComponent(mixin, isMixinOnly){
    if (isMixinOnly){
        return null;
    }
    return {component: React.createClass(mixin)};
}

/**
* Build a module with a mixin and a React component.
* @param  {object} componentMixin - Mixin of the component.
* @param {boolean} isMixinOnly - Bolean to set .
* @return {object} {mixin: 'the component mixin', component: 'the react instanciated component'}
*/
module.exports = function builder(componentMixin, isMixinOnly){
    return assign(
        {mixin: componentMixin},
        createComponent(componentMixin, isMixinOnly)
    );
};
