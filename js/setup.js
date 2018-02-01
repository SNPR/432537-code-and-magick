'use strict';

var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARDS_TOTAL = 4;

/**
 * Вспомогательная функция для метода сортировки массива arr.sort.
 * @return {number} Возвращает случайное число от -0.5 до 0.5.
 */
var compareRandom = function () {
  return Math.random() - 0.5;
};

/**
 * Перемешивает значения массива случайным образом и возвращает массив длины WIZARDS_TOTAL.
 * @param {Array} array Массив с любым типом данных.
 * @param {number} WIZARDS_TOTAL Заданное число волшебников.
 * @return {Array} Массив со случайным порядком значений.
 */
var randomizeArray = function (array, WIZARDS_TOTAL) {
  var result = array.slice();
  result.sort(compareRandom);
  return result.splice(0, WIZARDS_TOTAL);
};

var randomNames = randomizeArray(WIZARD_NAMES, WIZARDS_TOTAL);
var randomSurnames = randomizeArray(WIZARD_SURNAMES, WIZARDS_TOTAL);
var randomCoatColors = randomizeArray(COAT_COLORS, WIZARDS_TOTAL);
var randomEyesColors = randomizeArray(EYES_COLORS, WIZARDS_TOTAL);

var wizardsFullNames = [];

for (var i = 0; i < WIZARDS_TOTAL; i++) {
  wizardsFullNames.push(randomNames[i] + ' ' + randomSurnames[i]);
}

var wizards = [
  {
    name: wizardsFullNames[0],
    coatColor: randomCoatColors[0],
    eyesColor: randomEyesColors[0]
  },
  {
    name: wizardsFullNames[1],
    coatColor: randomCoatColors[1],
    eyesColor: randomEyesColors[1]
  },
  {
    name: wizardsFullNames[2],
    coatColor: randomCoatColors[2],
    eyesColor: randomEyesColors[2]
  },
  {
    name: wizardsFullNames[3],
    coatColor: randomCoatColors[3],
    eyesColor: randomEyesColors[3]
  }
];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
