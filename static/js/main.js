function updateBackgroundColor(target_id, rm_cls, add_cls) {
  document.getElementById(String(target_id)).classList.remove(rm_cls);
  document.getElementById(String(target_id)).classList.add(add_cls);
}

window.onload = () => {
  var flg = true;
  var positions = [1, 5, 10, 277, 310];
  // var conditions = [];

  setInterval(() => {
    if (flg) {
      positions.forEach(function (e) {
        updateBackgroundColor(e, 'lightyellow', 'lightblue');
      })
      flg = false;
    } else {
      positions.forEach(function (e) {
        updateBackgroundColor(e, 'lightblue', 'lightyellow');
      })
      // eslint-disable-next-line no-undef
      $.ajax({
        url: '/get_next_direction',
        type: 'POST',
        data: {'positions': positions.join()}
      }).done(function (data) {
        positions = [];
        data.positions.split(',').forEach(function (e) {
          positions.push(Number(e))
        })
        flg = true;
      });
    }
  }, 500);
};
