'use strict';

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
 * @description Определеяет максимальное время прохождения игры и возвращает
 * пропорцию максимального времени и максимальной высоты гистограммы.
 * @param {Array} times Массив времён победы игроков.
 * @return {number}
 */
var getProportion = function (times) {
  var maxTimeValue = 0;
  for (var i = 0; i < times.length; i++) {
    if (times[i] > maxTimeValue) {
      maxTimeValue = times[i];
    }
  }
  return maxTimeValue / BAR_HEIGHT;
};

/**
 * @description Рисует облако.
 * @param {Object} ctx Контекст вызова Canvas.
 * @param {number} x Координата x облака.
 * @param {number} y Координата y облака.
 * @param {string} color Цвет облака.
 */
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

/**
 * @description Рисует гистограммы c именами и игроков временем прохождения игры каждого из них.
 * @param {Object} ctx Контекст отрисовки Canvas.
 * @param {Array} names Массив имён игроков.
 * @param {Array} times Массив времён победы игроков.
 */
var renderBarChart = function (ctx, names, times) {
  for (var i = 0; i < names.length; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + Math.random() + ')';
    }
    ctx.fillRect(BAR_HEIGHT - GAP + FONT_GAP * i, CLOUD_HEIGHT - GAP * 3, BAR_WIDTH, -times[i] / getProportion(times));
    ctx.fillStyle = 'black';
    ctx.fillText(names[i], BAR_HEIGHT - GAP + FONT_GAP * i, CLOUD_WIDTH - BAR_WIDTH * 4);
    ctx.fillText(times[i].toFixed(0), BAR_HEIGHT - GAP + FONT_GAP * i, -times[i] / getProportion(times) + TIMES_GAP);
  }
};

/**
 * @description Выводит текст.
 * @param {Object} ctx Контекст отрисовки Canvas.
 * @param {string} text Текст для вывода.
 * @param {number} x Координата x текста.
 * @param {number} y Координата y текста.
 */
var renderText = function (ctx, text, x, y) {
  ctx.fillStyle = 'black';
  ctx.font = 'PT Mono 16px';
  ctx.fillText(text, x, y);
};

/**
 * @description Сравнивает длины массивов и в случае различия приравнивает их.
 * @param {Array} names Массив имён игроков.
 * @param {Array} times Массив времён победы игроков.
 */
var arraysLengthsCompare = function (names, times) {
  if (names.length > times.length) {
    names.length = times.length;
  } else {
    times.length = names.length;
  }
};

/**
 * @description Выводит окно с результатов игры, со счётом игроков и гистограммами.
 * @param {Object} ctx Контекст отрисовки Canvas.
 * @param {Array} names Массив имён игроков.
 * @param {Array} times Массив времён победы игроков.
 */
window.renderStatistics = function (ctx, names, times) {
  arraysLengthsCompare(names, times);

  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, 'white');

  renderText(ctx, 'Ура, вы победили!', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 3);
  renderText(ctx, 'Список результатов:', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 5);

  renderBarChart(ctx, names, times);
};
