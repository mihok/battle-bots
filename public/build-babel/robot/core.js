"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var initialState = {
    health: 100,
    power: 100
};

var Core = function () {
    function Core() {
        _classCallCheck(this, Core);

        this.instance = null;
        this.subscribers = [];
        this.components = {};
        this.actions = [];
        this.state = initialState;
        if (this.instance === null) this.instance = this;
    }

    _createClass(Core, [{
        key: "subscribeToState",
        value: function subscribeToState(subscribe) {
            this.subscribers.push(subscribe);
            subscribe(this.state);
        }
    }, {
        key: "subscribeToComponentState",
        value: function subscribeToComponentState(component, subscriber) {
            this.components[component].subscribeToState(subscriber);
        }
    }, {
        key: "getActions",
        value: function getActions() {
            return this.actions;
        }
    }, {
        key: "getComponents",
        value: function getComponents() {
            return this.components;
        }
    }, {
        key: "getComponentMethods",
        value: function getComponentMethods(component) {
            return this.components[component].getMethods();
        }
    }, {
        key: "command",
        value: function command(componentName, action) {
            if (this.components[componentName]) this.components[componentName].dispatch(action); // Invoke component command.
            else throw new Error("Component " + componentName + " does not exist.");
        }
    }, {
        key: "reducer",
        value: function reducer(state, action) {
            switch (action.type) {
                case exports.TAKE_DAMAGE:
                    return Object.assign({}, this.state, { health: this.state.health - action.payload });
                case exports.HEAL:
                    return Object.assign({}, this.state, { health: this.state.health + action.payload });
            }
            return this.state;
        }
    }, {
        key: "dispatch",
        value: function dispatch(action) {
            this.state = this.reducer(this.state, action);
            this.emitChange();
        }
    }, {
        key: "emitChange",
        value: function emitChange() {
            for (var i = 0; i < this.subscribers.length; i++) {
                this.subscribers[i](this.state);
            }
        }
    }]);

    return Core;
}();
// Action names


exports.TAKE_DAMAGE = '[Core] Take Damage';
exports.HEAL = '[Core] Heal';

var TakeDamageAction = function TakeDamageAction() {
    var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, TakeDamageAction);

    this.payload = payload;
    this.type = exports.TAKE_DAMAGE;
};

exports.TakeDamageAction = TakeDamageAction;

var HealAction = function HealAction() {
    var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, HealAction);

    this.payload = payload;
    this.type = exports.HEAL;
};

exports.HealAction = HealAction;
exports.core = new Core();
//# sourceMappingURL=core.js.map