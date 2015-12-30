<template lang="jade">
h3 {{ ship.name }} <small>{{ ship.type }}</small>

table(class="table table-condensed table-striped")
  thead
    tr
      th(class="col-sm-1") Actions
      th(class="col-sm-1") Slots
      th Name
  tbody(v-for="(key, components) in ship.components" v-if="ship.slots[key]")
    tr
      td(colspan="3", class="text-center", :class="{'danger': exceeded(key)}")
        h4(class="table-heading").
          {{ key | capitalize }} ({{ slots(key) }} / {{ ship.slots[key] }})
    tr(v-for="component in components | orderBy 'name'")
      td
        a(class="btn btn-default btn-xs pull-left", style="margin-right: 10px", v-on:click="remove(key, $index, $event)") &times;
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
        remove: function (type, index, event) {
          this.ship.components[type].splice(index, 1)
        }
      }
  }
</script>
