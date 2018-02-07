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
 * Возвращает случайный индекс массива
 * @param {Array} array Массив с данными любого типа.
 * @return {number} Случайный индекс массива, переданного функции.
 */
var getRandomIndex = function (array) {
  return Math.floor(Math.random() * array.length);
};

/**
 * Функция для случайного перемешивания элементов массива.
 * @param {Array} array Массив со значениями любого типа.
 * @return {Array} Массив перемешанных значений.
 */
var shuffleArray = function (array) {
  var arrayCopy = array.slice();
  var mixedArray = [];
  while (mixedArray.length < array.length) {
    var randomIndex = getRandomIndex(arrayCopy);
    mixedArray.push(arrayCopy[randomIndex]);
    arrayCopy.splice(randomIndex, 1);
  }
  return mixedArray;
};

/**
 * Генерирует массив с заданным количеством объектов волшебников.
 * @param {number} amountOfWizards Количество объектов с волшебниками, которое будет сгенерировано.
 * @param {Array} namesArray Массив имён волшебников.
 * @param {Array} surnamesArray Массив фамилий волшебников.
 * @param {Array} coatColorsArray Массив цветов мантий волшебников.
 * @param {Array} eyesColorsArray Массив цвет глаз волшебников.
 * @return {Array} Массив объектов с параметрами волшебников.
 */
var generateWizards = function (amountOfWizards, namesArray, surnamesArray, coatColorsArray, eyesColorsArray) {
  var names = shuffleArray(namesArray);
  var surnames = shuffleArray(surnamesArray);
  var coatColors = shuffleArray(coatColorsArray);
  var eyesColors = shuffleArray(eyesColorsArray);
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
var wizards = generateWizards(WIZARDS_TOTAL, WIZARD_NAMES, WIZARD_SURNAMES, COAT_COLORS, EYES_COLORS);

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

var wizardEyes = document.querySelector('.wizard-eyes');
wizardEyes.style.fill = 'red';
