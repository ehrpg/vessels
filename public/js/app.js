;(function () {
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
    var ids = []
    ids = ship.default.armor
    ship.default.armor = getComponents('armor', ids)
    ids = ship.default.subsystems
    ship.default.subsystems = getComponents('subsystems', ids)
    ids = ship.default.weapons
    ship.default.weapons = getComponents('weapons', ids)
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

  var Ship = Vue.extend({
    template: '#ship-template',
    props: [ 'ship', 'index' ]
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
})()
