<template lang="jade">
div(class="panel panel-primary filterable")
  div(class="panel-heading")
    h3(class="panel-title") Subsystems
    div(class="pull-right")
      button(class="btn btn-default btn-xs btn-filter")
        span(class="glyphicon glyphicon-filter")
      button(class="btn btn-default btn-xs btn-collapse", type="button", data-toggle="collapse", data-target="#components-subsystems", aria-expanded="true", aria-controls="components-subsystems")
        span(class="glyphicon glyphicon-minus")

  div(id="components-subsystems", class="collapse in")
    table(class="table table-striped table-condensed")
      thead
        tr(class="filters")
          th
            input(type="text", class="form-control", placeholder="Name", disabled)
          th
            input(type="text", class="form-control text-center", placeholder="Core", disabled)
          th
            input(type="text", class="form-control text-center", placeholder="Slots", disabled)
      tbody
        tr(v-for="entry in $data")
          td {{ entry.name }}
          td(class="text-center") {{ entry.core }}
          td(class="text-center") {{ entry.slots }}
</template>

<script>
  export default {
    data: function () {
      return App.data.subsystems
    }
  }
</script>
