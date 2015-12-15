<template lang="jade">
h2 Weapons
table(class="table table-striped table-condensed")
  tr
    th Name
    th(class="text-center") Damage
    th(class="text-center") Type
    th(class="text-center") Slots
  tr(v-for="entry in $data")
    td {{ entry.name }}
    td(class="text-center") {{ entry.damage }}
    td(class="text-center") {{ entry.type }}
    td(class="text-center") {{ entry.slots }}
</template>

<script>
  export default {
    data: function () {
      return App.data.weapons
    }
  }
</script>
