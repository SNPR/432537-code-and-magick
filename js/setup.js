'use strict';

var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var WIZARD_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var WIZARD_SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_TOTAL = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

/**
 * Вспомогательная функция для метода сортировки массива arr.sort. По стандарту Math.random()
 * возвращает случайное число от 0 до 1. "-0.5" указано для того, чтобы метод возвращал случайное
 * число от -0.5 до 0.5. Благодарю такому "трюку" сортировка становится хаотичной.
 * @return {number} Возвращает случайное значение от -0.5 до 0.5.
 */
var compareRandom = function () {
  return Math.random() - 0.5;
};

/**
 * Перемешивает значения массива случайным образом и возвращает массив длины arrayLenght.
 * @param {Array} array Массив с любым типом данных.
 * @param {number} arrayLenght Желаемая длина массива.
 * @return {Array} Массив со случайным порядком исходных значений.
 */
var shuffleAndCutArray = function (array, arrayLenght) {
  var result = array.slice();
  result.sort(compareRandom);
  return result.splice(0, arrayLenght);
};

/**
 * Генерирует массив с заданным количеством объектов волшебников.
 * @param {number} amountOfWizards Количество объектов с волшебниками, которое будет сгенерировано.
 * @return {Array}
 */
var generateWizards = function (amountOfWizards) {
  var names = shuffleAndCutArray(WIZARD_NAMES, WIZARDS_TOTAL);
  var surnames = shuffleAndCutArray(WIZARD_SURNAMES, WIZARDS_TOTAL);
  var coatColors = shuffleAndCutArray(COAT_COLORS, WIZARDS_TOTAL);
  var eyesColors = shuffleAndCutArray(EYES_COLORS, WIZARDS_TOTAL);
  var wizardsArray = [];
  for (var i = 0; i < amountOfWizards; i++) {
    wizardsArray.push({
      name: names[i] + ' ' + surnames[i],
      coatColor: coatColors[i],
      eyesColor: eyesColors[i]
    });
  }
  return wizardsArray;
};

var similarListElement = document.querySelector('.setup-similar-list');
var wizards = generateWizards(WIZARDS_TOTAL);

/**
 * Создаёт глубокую копию узла с шаблоном параметров волшебника.
 * @param {Object} wizard Объект с параметрами волшебника.
 * @return {Object} Объект волшебника с заполненными данными.
 */
var renderWizard = function (wizard) {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

similarListElement.appendChild(fragment);

document.querySelector('.setup-similar').classList.remove('hidden');

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var getActiveElement = function () {
  return document.activeElement.tagName;
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && getActiveElement() !== 'INPUT') {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});
