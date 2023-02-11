function updateBackgroundColor(target_id, rm_cls, add_cls) {
  document.getElementById(String(target_id)).classList.remove(rm_cls);
  document.getElementById(String(target_id)).classList.add(add_cls);
}

window.onload = () => {
  var flg = true;
  var first = 1;

  setInterval(() => {
    if (flg) {
      updateBackgroundColor(first, 'lightyellow', 'red');
      flg = false;
    } else {
      updateBackgroundColor(first, 'red', 'lightyellow');
      // eslint-disable-next-line no-undef
      $.ajax({
        url: '/get_next_direction',
        type: 'POST',
        data: {'first': first}
      }).done(function (data) {
        first = Number(data.first);
        flg = true;
      });
    }
  }, 500);
};
