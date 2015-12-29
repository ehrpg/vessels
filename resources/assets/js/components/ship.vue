<template lang="jade">
h3 {{ ship.name }} <small>{{ ship.type }}</small>

table(class="table table-condensed table-striped")
  thead
    tr
      th(class="col-sm-1") Actions
      th(class="col-sm-1") Slots
      th Name
  tbody
    tr
      td(colspan="3", class="text-center", :class="{'danger': armorExceeded}")
        h4 Armor ({{ armorSlots }} / {{ ship.slots.armor }})
    tr(v-for="armor in ship.components.armor", track-by="$index")
      td
        a(class="btn btn-default btn-xs pull-left", style="margin-right: 10px", v-on:click="remove('armor', $index, $event)") &times;
      td {{ armor.slots }}
      td {{ armor.name }}

    tr
      td(colspan="3", class="text-center", :class="{'danger': subsystemsExceeded}")
        h4 Subsystems ({{ subsystemSlots }} / {{ ship.slots.subsystems }})
    tr(v-for="subsystem in ship.components.subsystems", track-by="$index")
      td
        a(class="btn btn-default btn-xs pull-left", style="margin-right: 10px", v-on:click="remove('subsystems', $index, $event)") &times;
      td {{ subsystem.slots }}
      td {{ subsystem.name }}

    tr
      td(colspan="3", class="text-center", :class="{'danger': weaponsExceeded}")
        h4 Weapons ({{ weaponSlots }} / {{ ship.slots.weapons }})
    tr(v-for="weapon in ship.components.weapons", track-by="$index")
      td
        a(class="btn btn-default btn-xs pull-left", style="margin-right: 10px", v-on:click="remove('weapons', $index, $event)") &times;
      td {{ weapon.slots }}
      td {{ weapon.name }}
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
        },
        remove: function (type, index, event) {
          this.ship.components[type].splice(index, 1)
        }
      }
  }
</script>
