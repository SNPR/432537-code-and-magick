'use strict';

var BAR_HEIGHT = 150;

window.renderStatistics = function (ctx, names, times) {
  /** @description Определеяет максимальное время прохождение игры и находит пропорцию.
   * @return {number}
   */
  var defineMaxValue = function () {
    var maxTimeValue = 0;
    for (var i = 0; i < times.length; i++) {
      if (times[i] > maxTimeValue) {
        maxTimeValue = times[i];
      }
    }
    return maxTimeValue / BAR_HEIGHT;
  };

  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 420, 270);
  ctx.fillStyle = 'white';
  ctx.fillRect(100, 10, 420, 270);

  ctx.fillStyle = 'black';
  ctx.font = 'PT Mono 16px';
  ctx.fillText('Ура, вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  ctx.fillText(names[0], 140, 260);
  ctx.fillText(names[1], 230, 260);
  ctx.fillText(names[2], 320, 260);
  ctx.fillText(names[3], 410, 260);

  if (names[0] === 'Вы') {
    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
  } else {
    ctx.fillStyle = 'blue'
  }

  ctx.fillRect(140, 240, 40, -times[0] / defineMaxValue());

  if (names[1] === 'Вы') {
    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
  } else {
    ctx.fillStyle = 'blue'
  }

  ctx.fillRect(230, 240, 40, -times[1] / defineMaxValue());

  if (names[2] === 'Вы') {
    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
  } else {
    ctx.fillStyle = 'blue'
  }

  ctx.fillRect(320, 240, 40, -times[2] / defineMaxValue());

  if (names[3] === 'Вы') {
    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
  } else {
    ctx.fillStyle = 'blue'
  }

  ctx.fillRect(410, 240, 40, -times[3] / defineMaxValue());

  ctx.fillStyle = 'black';
  ctx.fillText(times[0].toFixed(0), 140, -times[0] / defineMaxValue() + 235);
  ctx.fillText(times[1].toFixed(0), 230, -times[1] / defineMaxValue() + 235);
  ctx.fillText(times[2].toFixed(0), 320, -times[2] / defineMaxValue() + 235);
  ctx.fillText(times[3].toFixed(0), 410, -times[3] / defineMaxValue() + 235);
};
