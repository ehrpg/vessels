<template lang="jade">
h2 Armor
table(class="table table-striped table-condensed")
  tr
    th Name
    th(class="text-center") Hull
    th(class="text-center") Slots
  tr(v-for="entry in $data")
    td {{ entry.name }}
    td(class="text-center") {{ entry.hull }}
    td(class="text-center") {{ entry.slots }}
</template>

<script>
  export default {
    data: function () {
      return App.data.armor
    }
  }
</script>
