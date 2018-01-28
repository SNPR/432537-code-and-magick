'use strict';

window.renderStatistics = function (ctx, names, times) {
  var GAP = 10;
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var BAR_HEIGHT = 150;
  var BAR_WIDTH = 40;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var FONT_GAP = 90;
  var TIMES_GAP = 235;

  /**
   * @description Определеяет максимальное время прохождения игры и находит пропорцию.
   * @param {object} arr Массив с временами победы игроков.
   * @return {number}
   */
  var defineMaxValue = function (arr) {
    var maxTimeValue = 0;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxTimeValue) {
        maxTimeValue = arr[i];
      }
    }
    return maxTimeValue / BAR_HEIGHT;
  };

  /**
   * @description Рисует облако.
   * @param {number} x Координата x облака.
   * @param {number} y Координата y облака.
   * @param {string} color Цвет облака.
   */
  var renderCloud = function (x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  /**
   * @description Рисует гистограммы.
   */
  var renderGists = function () {
    for (var i = 0; i < names.length; i++) {
      if (names[i] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      } else {
        ctx.fillStyle = 'blue';
      }
      ctx.fillRect(BAR_HEIGHT - GAP + FONT_GAP * i, CLOUD_HEIGHT - GAP * 3, BAR_WIDTH, -times[i] / defineMaxValue(times));
    }

  };

  renderCloud(CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(CLOUD_X, CLOUD_Y, 'white');

  ctx.fillStyle = 'black';
  ctx.font = 'PT Mono 16px';
  ctx.fillText('Ура, вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  for (var i = 0; i < names.length; i++) {
    ctx.fillText(names[i], BAR_HEIGHT - GAP + FONT_GAP * i, CLOUD_WIDTH - BAR_WIDTH * 4);
  }


  renderGists(names, times);

  ctx.fillStyle = 'black';

  for (i = 0; i < times.length; i++) {
    ctx.fillText(times[i].toFixed(0), BAR_HEIGHT - GAP + FONT_GAP * i, -times[i] / defineMaxValue(times) + TIMES_GAP);
  }
};
