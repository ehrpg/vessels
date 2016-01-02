<template lang="jade">
h3 {{ ship.name }} <small>{{ ship.type }}, {{ ship.size }}</small>

table(class="table table-condensed table-striped table-hover")
  thead
    tr
      th(class="col-sm-1") Actions
      th(class="col-sm-1") Slots
      th Name
  tbody(v-for="(key, components) in ship.components" v-if="ship.slots[key]")
    tr
      td(colspan="3", class="text-center info", :class="{'danger': exceeded(key)}")
        h4(class="table-heading").
          {{ key | capitalize }} ({{ slots(key) }} / {{ ship.slots[key] }})
    tr(v-for="component in components | orderBy 'name'", track-by="$index" onmouseover="updateDetails('{{ key }}', {{ component.id }})")
      td
        a(class="btn btn-default btn-xs pull-left", style="margin-right: 10px", v-on:click="remove(key, component)") &times;
      td {{ component.slots }}
      td {{ component.name }}
</template>

<style media="screen">
.col-condensed {
  padding-left: 0px !important;
  padding-right: 0px !important;
}
.table-heading {
  margin: 2px 0;
}
</style>

<script>
  export default {
      props: [ 'ship' ],
      methods: {
        exceeded: function (type) {
          return this.slots(type) > this.ship.slots[type]
        },
        slots: function (type) {
          return this._sumSlots(this.ship.components[type])
        },
        _sumSlots: function (container) {
          if (container !== undefined) {
            return container.reduce(function (total, item) {
              return total + item.slots
            }, 0)
          } else {
            return 0
          }
        },
        remove: function (type, component) {
          var container = this.ship.components[type]
          container.splice(container.indexOf(component), 1)
        }
      }
  }
</script>
