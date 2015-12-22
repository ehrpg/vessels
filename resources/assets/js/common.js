module.exports.initDataTable = function (id) {
  $(id + ' tfoot th').each(function () {
    var title = $(this).text()
    $(this).html('<input type="text" placeholder="' + title + '" />')
  })

  var table = $(id).DataTable({
    paging: false
  })

  // Apply the search
  table.columns().every(function () {
    var that = this

    $('input', this.footer()).on('keyup change', function () {
      if (that.search() !== this.value) {
        that
          .search(this.value)
          .draw()
      }
    })
  })

  return table
}
