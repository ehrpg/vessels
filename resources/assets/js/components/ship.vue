<template lang="jade">
div(style={width: "400px", float: "left", border: "1px solid black"})
  h3(class="text-center") {{ ship.class }}
  h4(class="text-center") {{ ship.type }}, {{ ship.size }}
  h4(class="text-center", v-if="ship.name") "{{ ship.name }}"
  dl(class="dl-horizontal")
    dt Armor ({{ armorSlots }} / {{ ship.slots.armor }})
    dd(v-for="entry in ship.default.armor", track-by="$index")
      | {{ entry.name }} ({{ entry.slots }})

    dt Subsystems ({{ subsystemSlots }} / {{ ship.slots.subsystems }})
    dd(v-for="entry in ship.default.subsystems", track-by="$index")
      | {{ entry.name }} ({{ entry.slots }}),

    dt Weapons ({{ weaponSlots }} / {{ ship.slots.weapons }})
    dd(v-for="entry in ship.default.weapons", track-by="$index")
      | {{ entry.name }} ({{ entry.slots }})

  - var shipId = "ship-{{ ship.id }}"
  div(class="text-right", style="border-bottom: 1px solid black;")
    a(role="button", data-toggle="collapse", data-target="#" + shipId, aria-expand="false", aria-controls=shipId)
      | Details [+]
  div(class="collapse", id=shipId)
    div(class="well")
      | Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
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
