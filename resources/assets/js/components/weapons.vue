<template lang="jade">

div(class="panel panel-danger")
  div(class="panel-heading clearfix")
    h3(class="panel-title pull-left", style="padding-top: 2.5px;") Weapons
    div(class="pull-right")
      button(class="btn btn-default btn-xs btn-collapse", type="button", data-toggle="collapse", data-target="#container-components-weapons", aria-expanded="true", aria-controls="container-components-weapons")
        span(class="glyphicon glyphicon-minus")
  div(id="container-components-weapons" class="collapse in")
    table(id="components-weapons", class="table table-striped table-condensed")
      thead
        tr
          th Name
          th Damage
          th Type
          th Slots
      tfoot(class="tfoot-top")
        tr
          th Name
          th Damage
          th Type
          th Slots
      tbody
        tr(v-for="entry in $data")
          td {{ entry.name }}
          td(class="text-center") {{ entry.damage }}
          td(class="text-center") {{ entry.type }}
          td(class="text-center") {{ entry.slots }}
</template>

<style media="screen">
  #components-weapons > tbody > tr:last-child > td {
    border-bottom: 1px solid black;
  }
  #components-weapons_filter {
    display:none;
  }
</style>

<script>
  var common = require('./../common.js')

  $(document).ready( function () {
    common.initDataTable('#components-weapons')
  });

  export default {
    data: function () {
      return App.data.weapons
    }
  }
</script>
