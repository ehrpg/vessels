(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _ship = require('./components/ship.vue');

var _ship2 = _interopRequireDefault(_ship);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  function getComponents(dataName, ids) {
    if (App.data[dataName] === 'undefined') {
      return [];
    }
    var data = App.data[dataName];

    var components = [];
    for (var i = 0; i < ids.length; i++) {
      var id = ids[i];
      var component = data[id];
      components.push(component);
    }
    return components;
  }
  function renderData(containerName, data) {
    var el = '#' + containerName;
    var component = new Vue({
      el: el,
      data: { data: data }
    });
  }
  function loadShips(ships) {
    var loadedShips = [];
    for (var key in ships) {
      if (ships.hasOwnProperty(key)) {
        var ship = ships[key];
        loadedShips.push(loadShip(ship));
      }
    }
    return loadedShips;
  }
  function loadShip(ship) {
    var ids = [];
    ids = ship.default.armor;
    ship.default.armor = getComponents('armor', ids);
    ids = ship.default.subsystems;
    ship.default.subsystems = getComponents('subsystems', ids);
    ids = ship.default.weapons;
    ship.default.weapons = getComponents('weapons', ids);
    return ship;
  }

  var armor = App.data.armor;
  var subsystems = App.data.subsystems;
  var weapons = App.data.weapons;
  var ships = App.data.ships;

  renderData('armor', armor);
  renderData('subsystems', subsystems);
  renderData('weapons', weapons);

  ships = loadShips(ships);

  var vm = new Vue({
    el: '#ships',
    data: {
      ships: ships
    },
    components: {
      ship: _ship2.default
    }
  });
})();

},{"./components/ship.vue":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  template: '#ship-template',
  props: ['ship', 'index'],
  computed: {
    armorSlots: function armorSlots() {
      return this._sumSlots(this.ship.default.armor);
    },
    subsystemSlots: function subsystemSlots() {
      return this._sumSlots(this.ship.default.subsystems);
    },
    weaponSlots: function weaponSlots() {
      return this._sumSlots(this.ship.default.weapons);
    }
  },
  methods: {
    _sumSlots: function _sumSlots(container) {
      return container.reduce(function (total, item) {
        return total + item.slots;
      }, 0);
    }
  }
};
if (module.exports.__esModule) module.exports = module.exports.default

},{}]},{},[1]);

//# sourceMappingURL=app.js.map
