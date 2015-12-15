<template lang="jade">
h2 Subsystems
table(class="table table-striped table-condensed")
  tr
    th Name
    th(class="text-center") Core
    th(class="text-center") Slots
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
