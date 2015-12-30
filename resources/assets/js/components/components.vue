<template lang="jade">
div(role="tabpanel" class="tab-pane",
    v-for="(key, components) in $data"
    id="container-components-{{ key }}" class="collapse in")
  table(id="components-{{ key }}", class="table table-striped table-condensed table-hover components-table")
    thead
      tr
        th Name
        th(class="col-sm-1") Slots
    tfoot(class="tfoot-top")
      tr
        th Name
        th Slots
    tbody
      tr(v-for="(id, component) in components", id="{{ key }}-{{ component.id }}", draggable="true", ondragstart="drag(event)", onmouseover="updateDetails('{{ key }}', {{ component.id }})")
        td {{ component.name }}
        td(class="text-center") {{ component.slots }}
</template>

<style media="screen">
</style>

<script>
  var common = require('./../common.js')

  $(document).ready( function () {
    var $elem = $('[id^=container-components-]:first')
    $('[id^=container-components-]:first').addClass('active')

    for (var component in App.data.components) {
      if (App.data.components.hasOwnProperty(component)) {
        common.initDataTable('#components-' + component)
      }
    }
  });

  export default {
    data: function () {
      return App.data.components
    }
  }
</script>
