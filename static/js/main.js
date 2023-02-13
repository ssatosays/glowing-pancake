function getRandomInt() {
  const max = 400;
  return Math.floor(Math.random() * max) + 1;
}

function updateBackgroundColor(target_id, rm_clses, add_cls) {
  rm_clses.forEach(function (rm_cls) {
    if (document.getElementById(String(target_id)).classList.contains(rm_cls)) {
      document.getElementById(String(target_id)).classList.remove(rm_cls);
    }
  });
  document.getElementById(String(target_id)).classList.add(add_cls);
}

window.onload = () => {
  var completeFlg = false;
  var actionFlg = true;

  var positions = [];
  const reqPositionsNumber = 40;
  [...Array(reqPositionsNumber).keys()].forEach(function () {
    positions.push(getRandomInt());
  });

  var infected = [];
  const reqInfectedNumber = 1;
  [...Array(reqInfectedNumber).keys()].forEach(function (e) {
    infected.push(positions.at(e));
  });

  const beginAt = new Date();
  document.getElementById('begin-at').innerText = beginAt.toLocaleString();

  setInterval(() => {
    if (completeFlg) return
    if (actionFlg) {
      positions.forEach(function (e) {
        if (!infected.includes(e)) {
          updateBackgroundColor(e, ['bg-lightyellow', 'bg-red'], 'bg-lightblue');
        } else {
          updateBackgroundColor(e, ['bg-lightyellow', 'bg-lightblue'], 'bg-red');
        }
      })
      actionFlg = false;
    } else {
      positions.forEach(function (e) {
        updateBackgroundColor(e, ['bg-lightblue', 'bg-red'], 'bg-lightyellow');
      })
      // eslint-disable-next-line no-undef
      $.ajax({
        url: '/get_next_positions',
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
        document.getElementById('positions-length').innerText = positions.length;
        document.getElementById('infected-length').innerText = infected.length;
        // console.log('----- debug -----');
        // console.log(positions);
        // console.log(infected);
        actionFlg = true;
      });
    }
  }, 125);
};
