import Ship from './components/ship.vue'
import Components from './components/components.vue'

App._getById = function (container, id) {
  for (var i = 0; i < container.length; i++) {
    var element = container[i]
    if (parseInt(element.id, 10) === id) {
      return element
    }
  }
  return null
}

App.getChassisById = function (id) {
  return App._getById(App.data.chassis, id)
}

App.getComponentById = function (type, id) {
  var components = App.data.components[type]
  return App._getById(components, id)
}

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
  data: {},
  computed: {
    hasData: function () {
      return Object.keys(this.$data).length > 0
    }
  }
})

var chassisList = $.extend(true, {}, App.data.chassis)

new Vue({
  el: '#chassisList',
  data: function () {
    return chassisList
  }
})

var currentShip = JSON.parse(localStorage.getItem('currentShip'))
var chassis = loadChassis(App.data.chassis[0])
var ship = (currentShip !== null && currentShip !== undefined && Object.keys(currentShip).length > 0)
  ? currentShip : chassis

App.vms.ship = new Vue({
  el: '#ships',
  data: function () {
    return ship
  },
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

$('#resetShip').click(function () {
  if (confirm('This will delete all current changes. Are you sure?')) {
    App.vms.ship.$data = $.extend(true, {}, App.data.chassis[0])
  }
})
$('.chassis').click(function () {
  var $this = $(this)
  var id = parseInt($this.attr('data-id'), 10)
  var chassis = App.getChassisById(id)
  App.vms.ship.$data = loadChassis($.extend(true, {}, chassis))
  $('#ships-nav-tab').trigger('click')
})

$(window).bind('unload', function () {
  var obj = JSON.parse(JSON.stringify(App.vms.ship.$data))
  localStorage.setItem('currentShip', JSON.stringify(obj))
})
/* eslint-enable no-unused-vars, no-undef */
