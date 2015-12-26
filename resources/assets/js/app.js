import Armor from './components/armor.vue'
import Subsystems from './components/subsystems.vue'
import Weapons from './components/weapons.vue'
import Ship from './components/ship.vue'

$(document).ready(function () {
  $.support.transition = false

  $('.btn-collapse').click(function () {
    var $span = $(this).find('span')
    var addClass = ''
    var removeClass = ''
    if ($span.hasClass('glyphicon-minus')) {
      addClass = 'glyphicon-plus'
      removeClass = 'glyphicon-minus'
    } else {
      addClass = 'glyphicon-minus'
      removeClass = 'glyphicon-plus'
    }
    $span.addClass(addClass)
    $span.removeClass(removeClass)
  })
})

// function getComponents (dataName, ids) {
//   if (App.data[dataName] === 'undefined') {
//     return []
//   }
//   var data = App.data[dataName]
//
//   var components = []
//   for (var i = 0; i < ids.length; i++) {
//     var id = ids[i]
//     var component = data[id]
//     components.push(component)
//   }
//   return components
// }
// function loadShips (ships) {
//   var loadedShips = []
//   for (var key in ships) {
//     if (ships.hasOwnProperty(key)) {
//       var ship = ships[key]
//       ship['id'] = key
//       loadedShips.push(loadShip(ship))
//     }
//   }
//   return loadedShips
// }
// function loadShip (ship) {
//   ship.default.armor = getComponents('armor', ship.default.armor)
//   ship.default.subsystems = getComponents('subsystems', ship.default.subsystems)
//   ship.default.weapons = getComponents('weapons', ship.default.weapons)
//   return ship
// }

function loadChassis (chassis) {
  function checkIntegrity (object, key, val) {
    object[key] = object[key] === undefined
      ? val : object[key]
  }
  checkIntegrity(chassis.slots, 'armor', 0)
  checkIntegrity(chassis.slots, 'rooms', 0)
  checkIntegrity(chassis.slots, 'subsystems', 0)
  checkIntegrity(chassis.slots, 'weapons', 0)

  checkIntegrity(chassis, 'components', {})
  checkIntegrity(chassis.components, 'armor', [])
  checkIntegrity(chassis.components, 'rooms', [])
  checkIntegrity(chassis.components, 'subsystems', [])
  checkIntegrity(chassis.components, 'weapons', [])

  return chassis
}

/* eslint-disable no-unused-vars */
var components = new Vue({
  el: '#components',
  components: {
    armor: Armor,
    subsystems: Subsystems,
    weapons: Weapons
  }
})

var currentShip = JSON.parse(localStorage.getItem('currentShip'))
var chassis = App.data.chassis[1]
var loadedChassis = currentShip !== undefined
  ? currentShip : loadChassis(chassis)

App.vms.ship = new Vue({
  el: '#ships',
  data: loadedChassis,
  components: {
    ship: Ship
  }
})

var ships = App.data.ships

$('#downloadShips').click(function () {
  var obj = JSON.parse(JSON.stringify(App.vms.ship.$data))
  var data = 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(obj))
  var anchor = document.getElementById('downloadShips')
  anchor.href = 'data:' + data
  anchor.download = 'data.json'
})

$(window).bind('unload', function () {
  var obj = JSON.parse(JSON.stringify(App.vms.ship.$data))
  localStorage.setItem('currentShip', JSON.stringify(obj))
})
/* eslint-enable no-unused-vars */
