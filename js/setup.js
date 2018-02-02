'use strict';

var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARDS_TOTAL = 4;

/**
 * Вспомогательная функция для метода сортировки массива arr.sort. По дефолту Math.random()
 * возвращает случайное число от 0 до 1. "-0.5" указано для того, чтобы метод возвращал случайное
 * число от -0.5 до 0.5. Благодарю такому "трюку" сортировка становится хаотичной.
 * @return {number} Возвращает случайное число от -0.5 до 0.5.
 */
var compareRandom = function () {
  return Math.random() - 0.5;
};

/**
 * Перемешивает значения массива случайным образом и возвращает массив длины WIZARDS_TOTAL.
 * @param {Array} array Массив с любым типом данных.
 * @param {number} arrayLenght Желаемая длина массива.
 * @return {Array} Массив со случайным порядком значений.
 */
var randomizeArray = function (array, arrayLenght) {
  var result = array.slice();
  result.sort(compareRandom);
  return result.splice(0, arrayLenght);
};

var names = randomizeArray(WIZARD_NAMES, WIZARDS_TOTAL);
var surnames = randomizeArray(WIZARD_SURNAMES, WIZARDS_TOTAL);
var coatColors = randomizeArray(COAT_COLORS, WIZARDS_TOTAL);
var eyesColors = randomizeArray(EYES_COLORS, WIZARDS_TOTAL);

var fullNames = [];

for (var i = 0; i < WIZARDS_TOTAL; i++) {
  fullNames.push(names[i] + ' ' + surnames[i]);
}

/**
 * Генерирует массив объектов с параметрами волшебников.
 * @param {Array} wizardFullNames Массив полных имён волшебников.
 * @param {Array} wizardCoatColors Массив цветов мантий волшебников.
 * @param {Array} wizardEyesColors Массив цветов глаз волшебников.
 * @return {Array}
 */
var generateWizards = function (wizardFullNames, wizardCoatColors, wizardEyesColors) {
  var arr = [];
  for (i = 0; i < WIZARDS_TOTAL; i++) {
    arr.push({name: wizardFullNames[i], coatColor: wizardCoatColors[i], eyesColor: wizardEyesColors[i]});
  }
  return arr;
};

generateWizards(fullNames, coatColors, eyesColors);

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
