<script>
  export default {
      template: '#ship-template',
      props: [ 'ship', 'index' ],
      computed: {
        armorSlots: function () {
          return this._sumSlots(this.ship.default.armor)
        },
        subsystemSlots: function () {
          return this._sumSlots(this.ship.default.subsystems)
        },
        weaponSlots: function () {
          return this._sumSlots(this.ship.default.weapons)
        }
      },
      methods: {
        _sumSlots: function (container) {
          return container.reduce(function (total, item) {
            return total + item.slots
          }, 0)
        }
      }
  }
</script>
