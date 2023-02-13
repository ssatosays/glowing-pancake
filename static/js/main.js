function getRandomInt() {
  const max = 400;
  return Math.floor(Math.random() * max) + 1;
}

function updateBebinAtOrEndAt(beginAt, endAt) {
  if (beginAt !== null) document.getElementById('begin-at').innerText = beginAt.toLocaleString();
  if (endAt !== null) document.getElementById('end-at').innerText = endAt.toLocaleString();
}

function updateBackgroundColor(target_id, rm_clses, add_cls) {
  rm_clses.forEach(function (rm_cls) {
    if (document.getElementById(String(target_id)).classList.contains(rm_cls)) {
      document.getElementById(String(target_id)).classList.remove(rm_cls);
    }
  });
  document.getElementById(String(target_id)).classList.add(add_cls);
}

function updateLengthText(positionsLength, infectedLength) {
  if (positionsLength !== null) document.getElementById('positions-length').innerText = positionsLength;
  if (infectedLength !== null) document.getElementById('infected-length').innerText = infectedLength;
}

window.onload = () => {
  var completeFlg = false;
  var actionFlg = true;

  var positions = [];
  const reqPositionsNumber = 10;
  [...Array(reqPositionsNumber).keys()].forEach(function () {
    positions.push(getRandomInt());
  });

  var infected = [];
  const reqInfectedNumber = 5;
  [...Array(reqInfectedNumber).keys()].forEach(function (e) {
    infected.push(positions.at(e));
  });

  updateBebinAtOrEndAt(new Date(), null);

  setInterval(() => {
    if (completeFlg) return
    if (actionFlg) {
      var healtyFlg = false;
      positions.forEach(function (e) {
        if (!infected.includes(e)) {
          updateBackgroundColor(e, ['bg-lightyellow', 'bg-red'], 'bg-lightblue');
          healtyFlg = true;
        } else {
          updateBackgroundColor(e, ['bg-lightyellow', 'bg-lightblue'], 'bg-red');
        }
      })
      if (!healtyFlg) {
        updateBebinAtOrEndAt(null, new Date());
        updateLengthText(null, positions.length);
        completeFlg = true;
      } else {
        actionFlg = false;
      }
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
        updateLengthText(positions.length, infected.length);
        // console.log('----- debug -----');
        // console.log(positions);
        // console.log(infected);
        actionFlg = true;
      });
    }
  }, 125);
};
