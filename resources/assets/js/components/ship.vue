<template lang="jade">
h3 {{ ship.name }} <small>{{ ship.type }}</small>

div(class="panel panel-default",
  v-bind:class="{'panel-danger': armorExceeded}")
  div(class="panel-heading")
    h3(class="panel-title")
     | Armor ({{ armorSlots }} / {{ ship.slots.armor }})
  div(class="panel-body")
    ul(class="list-group")
      li(class="list-group-item",
      v-for="armor in ship.components.armor", track-by="$index")
        | {{ armor.name }}
        a(class="btn btn-default btn-xs pull-left", style="margin-right: 10px", v-on:click="remove('armor', $index, $event)") &times;

div(class="panel panel-default",
  v-bind:class="{'panel-danger': subsystemsExceeded}")
  div(class="panel-heading")
    h3(class="panel-title")
    | Subsystems ({{ subsystemSlots }} / {{ ship.slots.subsystems }})
  div(class="panel-body")
    ul(class="list-group")
      li(class="list-group-item",
      v-for="subsystem in ship.components.subsystems", track-by="$index")
        | {{ subsystem.name }}
        a(class="btn btn-default btn-xs pull-left", style="margin-right: 10px", v-on:click="remove('subsystems', $index, $event)") &times;

div(class="panel panel-default",
  v-bind:class="{'panel-danger': weaponsExceeded}")
  div(class="panel-heading")
    h3(class="panel-title")
    | Weapons ({{ weaponSlots }} / {{ ship.slots.weapons }})
  div(class="panel-body")
    ul(class="list-group")
      li(class="list-group-item",
      v-for="weapon in ship.components.weapons", track-by="$index")
        | {{ weapon.name }}
        a(class="btn btn-default btn-xs pull-left", style="margin-right: 10px", v-on:click="remove('weapons', $index, $event)") &times;
</template>

<script>
  // $(document).ready(function () {
  //   $('.remove-component').click (function () {
  //     var $li = $(this).closest('li')
  //     var type = $li.attr('data-type')
  //     var index = $li.attr('data-index')
  //     console.log(type);
  //     console.log(index);
  //
  //   })
  // })

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
