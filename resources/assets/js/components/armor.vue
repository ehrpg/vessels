<template lang="jade">
// div(class="panel panel-primary")
//   div(class="panel-heading")
//     h3(class="panel-title") Armor
//

div(class="panel panel-success")
  div(class="panel-heading clearfix")
    h3(class="panel-title pull-left", style="padding-top: 2.5px;") Armor
    div(class="pull-right")
      button(class="btn btn-default btn-xs btn-collapse", type="button", data-toggle="collapse", data-target="#container-components-armor", aria-expanded="true", aria-controls="container-components-armor")
        span(class="glyphicon glyphicon-minus")
  div(id="container-components-armor" class="collapse in")
    table(id="components-armor", class="table table-striped table-condensed")
      thead
        tr
          th Name
          th Hull
          th Slots
      tfoot(class="tfoot-top")
        tr
          th Name
          th Hull
          th Slots
      tbody
        tr(v-for="entry in $data")
          td {{ entry.name }}
          td(class="text-center") {{ entry.hull }}
          td(class="text-center") {{ entry.slots }}
</template>

<style media="screen">
  #components-armor > tbody > tr:last-child > td {
    border-bottom: 1px solid black;
  }
  #components-armor_filter {
    display:none;
  }
</style>

<script>
  var common = require('./../common.js')

  $(document).ready( function () {
    common.initDataTable('#components-armor')
  });

  export default {
    data: function () {
      return App.data.armor
    }
  }
</script>
