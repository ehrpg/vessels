<template lang="jade">
h3 {{ ship.name }} <small>{{ ship.type }}</small>

div(class="panel panel-default",
  v-bind:class="{'panel-danger': armorExceeded}")
  div(class="panel-heading")
    h3(class="panel-title")
     | Armor ({{ armorSlots }} / {{ ship.slots.armor }})
  div(class="panel-body")
    ul
      li(v-for="armor in ship.components.armor", track-by="$index")
        | {{ armor.name }}

div(class="panel panel-default",
  v-bind:class="{'panel-danger': subsystemsExceeded}")
  div(class="panel-heading")
    h3(class="panel-title")
    | Subsystems ({{ subsystemSlots }} / {{ ship.slots.subsystems }})
  div(class="panel-body")
    ul
      li(v-for="subsystem in ship.components.subsystems", track-by="$index")
        | {{ subsystem.name }}

div(class="panel panel-default",
  v-bind:class="{'panel-danger': weaponsExceeded}")
  div(class="panel-heading")
    h3(class="panel-title")
    | Weapons ({{ weaponSlots }} / {{ ship.slots.weapons }})
  div(class="panel-body")
    ul
      li(v-for="weapon in ship.components.weapons", track-by="$index")
        | {{ weapon.name }}
</template>

<script>
  export default {
      props: [ 'ship' ],
      computed: {
        armorSlots: function () {
          return this._sumSlots(this.ship.components.armor)
        },
        subsystemSlots: function () {
          return this._sumSlots(this.ship.components.subsystems)
        },
        weaponSlots: function () {
          return this._sumSlots(this.ship.components.weapons)
        },
        armorExceeded: function () {
          return this.armorSlots > this.ship.slots.armor;
        },
        subsystemsExceeded: function () {
          return this.subsystemSlots > this.ship.slots.subsystems;
        },
        weaponsExceeded: function () {
          return this.weaponSlots > this.ship.slots.weapons;
        }
      },
      methods: {
        _sumSlots: function (container) {
          if (container !== undefined) {
            return container.reduce(function (total, item) {
              return total + item.slots
            }, 0)
          } else {
            return 0
          }
        }
      }
  }
</script>
