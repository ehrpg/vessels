import Ship from './components/ship.vue'
import Components from './components/components.vue'

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
/* eslint-disable no-unused-vars, no-undef */
var components = new Vue({
  el: '#components',
  components: {
    components: Components
  }
})

App.vms.details = new Vue({
  el: '#details',
  data: {}
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
/* eslint-enable no-unused-vars, no-undef */
