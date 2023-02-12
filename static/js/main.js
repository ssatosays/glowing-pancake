function updateBackgroundColor(target_id, rm_clses, add_cls) {
  rm_clses.forEach(function (rm_cls) {
    if (document.getElementById(String(target_id)).classList.contains(rm_cls)) {
      document.getElementById(String(target_id)).classList.remove(rm_cls);
    }
  });
  document.getElementById(String(target_id)).classList.add(add_cls);
}

window.onload = () => {
  var flg = true;
  var positions = [
    1, 4, 5, 6, 10, 25, 30, 31, 32, 33,
    100, 101, 102, 103, 277, 300, 301, 302, 309, 310
  ];
  var infected = [5];

  setInterval(() => {
    if (flg) {
      positions.forEach(function (e) {
        if (!infected.includes(e)) {
          updateBackgroundColor(e, ['lightyellow', 'red'], 'lightblue');
        } else {
          updateBackgroundColor(e, ['lightyellow', 'lightblue'], 'red');
        }
      })
      flg = false;
    } else {
      positions.forEach(function (e) {
        updateBackgroundColor(e, ['lightblue', 'red'], 'lightyellow');
      })
      // eslint-disable-next-line no-undef
      $.ajax({
        url: '/get_next_direction',
        type: 'POST',
        data: {
          'positions': positions.join(),
          'infected': infected.join()
        }
      }).done(function (data) {
        positions = [];
        data.positions.split(',').forEach(function (e) {
          positions.push(Number(e))
        });
        infected = [];
        data.infected.split(',').forEach(function (e) {
          infected.push(Number(e))
        });
        flg = true;
      });
    }
  }, 125);
};
