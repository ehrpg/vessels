import Armor from './components/armor.vue'
import Subsystems from './components/subsystems.vue'
import Weapons from './components/weapons.vue'
import Ship from './components/ship.vue'

function getComponents (dataName, ids) {
  if (App.data[dataName] === 'undefined') {
    return []
  }
  var data = App.data[dataName]

  var components = []
  for (var i = 0; i < ids.length; i++) {
    var id = ids[i]
    var component = data[id]
    components.push(component)
  }
  return components
}
function loadShips (ships) {
  var loadedShips = []
  for (var key in ships) {
    if (ships.hasOwnProperty(key)) {
      var ship = ships[key]
      ship['id'] = key
      loadedShips.push(loadShip(ship))
    }
  }
  return loadedShips
}
function loadShip (ship) {
  ship.default.armor = getComponents('armor', ship.default.armor)
  ship.default.subsystems = getComponents('subsystems', ship.default.subsystems)
  ship.default.weapons = getComponents('weapons', ship.default.weapons)
  return ship
}

var ships = App.data.ships
ships = loadShips(ships)

/* eslint-disable no-unused-vars */
var components = new Vue({
  el: '#components',
  components: {
    armor: Armor,
    subsystems: Subsystems,
    weapons: Weapons
  }
})

var vm = new Vue({
  el: '#ships',
  data: {
    ships: ships
  },
  components: {
    ship: Ship
  }
})
/* eslint-enable no-unused-vars */
