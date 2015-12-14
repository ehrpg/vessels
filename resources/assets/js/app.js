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
function renderData (containerName, data) {
  var el = '#' + containerName
  var component = new Vue({
    el: el,
    data: {data}
  })
}
function loadShips (ships) {
  var loadedShips = []
  for (var key in ships) {
    if (ships.hasOwnProperty(key)) {
      var ship = ships[key]
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

var armor = App.data.armor
var subsystems = App.data.subsystems
var weapons = App.data.weapons
var ships = App.data.ships

renderData('armor', armor)
renderData('subsystems', subsystems)
renderData('weapons', weapons)

ships = loadShips(ships)

var vm = new Vue({
  el: '#ships',
  data: {
    ships: ships
  },
  components: {
    ship: Ship
  }
})
