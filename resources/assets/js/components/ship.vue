<template lang="jade">
div(style={width: '400px', float: 'left', background: '#ababab'})
  h2(class=text-center) {{ ship.name }} ({{ ship.type }}), {{ ship.size }}
  dl(class='dl-horizontal')
    dt Armor ({{ armorSlots }} / {{ ship.slots.armor }})
    dd(v-for="entry in ship.default.armor", track-by="$index")
      | {{ entry.name }} ({{ entry.slots }})
    dt Subsystems ({{ subsystemSlots }} / {{ ship.slots.subsystems }})
    dd(v-for="entry in ship.default.subsystems", track-by="$index")
      | {{ entry.name }} ({{ entry.slots }}),
    dt Weapons ({{ weaponSlots }} / {{ ship.slots.weapons }})
    dd(v-for="entry in ship.default.weapons", track-by="$index")
      | {{ entry.name }} ({{ entry.slots }})
</template>

<script>
  export default {
      props: [ 'ship', 'index' ],
      computed: {
        armorSlots: function () {
          return this._sumSlots(this.ship.default.armor)
        },
        subsystemSlots: function () {
          return this._sumSlots(this.ship.default.subsystems)
        },
        weaponSlots: function () {
          return this._sumSlots(this.ship.default.weapons)
        }
      },
      methods: {
        _sumSlots: function (container) {
          return container.reduce(function (total, item) {
            return total + item.slots
          }, 0)
        }
      }
  }
</script>
