<template lang="jade">
//
  div(class="panel panel-info")
  div(class="panel-heading clearfix")
    h3(class="panel-title pull-left", style="padding-top: 2.5px;") Subsystems
    div(class="pull-right")
      button(class="btn btn-default btn-xs btn-collapse", type="button", data-toggle="collapse", data-target="#container-components-subsystems", aria-expanded="true", aria-controls="container-components-subsystems")
        span(class="glyphicon glyphicon-minus")
div(id="container-components-subsystems" class="collapse in")
  table(id="components-subsystems", class="table table-striped table-condensed")
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
      tr(v-for="(id, entry) in $data", id="subsystems-{{ id }}", draggable="true", ondragstart="drag(event)")
        td {{ entry.name }}
        td(class="text-center") {{ entry.hull }}
        td(class="text-center") {{ entry.slots }}
</template>

<style media="screen">
  #components-subsystems > tbody > tr:last-child > td {
    border-bottom: 1px solid black;
  }
  #components-subsystems_filter {
    display:none;
  }
</style>

<script>
  var common = require('./../common.js')

  $(document).ready( function () {
    common.initDataTable('#components-subsystems')
  });

  export default {
    data: function () {
      return App.data.subsystems
    }
  }
</script>
