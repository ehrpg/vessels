<template lang="jade">
div(role="tabpanel" class="tab-pane",
    id="container-components-subsystems" class="collapse in")
  table(id="components-subsystems", class="table table-striped table-condensed table-hover components-table")
    thead
      tr
        th Name
        th Slots
    tfoot(class="tfoot-top")
      tr
        th Name
        th Slots
    tbody
      tr(v-for="(id, entry) in $data", id="subsystems-{{ id }}", draggable="true", ondragstart="drag(event)", onmouseover="updateDetails('subsystems', {{ id }})")
        td {{ entry.name }}
        td(class="text-center") {{ entry.slots }}
</template>

<style media="screen">
</style>

<script>
  var common = require('./../common.js')

  $(document).ready( function () {
    common.initDataTable('#components-subsystems')
  });

  export default {
    data: function () {
      return App.data.components.subsystems
    }
  }
</script>
