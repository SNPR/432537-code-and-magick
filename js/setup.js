'use strict';
var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848',
];

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
var wizardEyes = document.querySelector('.setup-wizard').querySelector('.wizard-eyes');
var wizardCoat = document.querySelector('.setup-wizard').querySelector('.wizard-coat');
var fireball = document.querySelector('.setup-fireball-wrap');

/**
 * Вспомогательная функция обработчика события для изменения цвета фаербола.
 */
var onFireballClick = function () {
  fireball.style.backgroundColor = FIREBALL_COLORS[getRandomIndex(FIREBALL_COLORS)];
};

/**
 * Вспомогательная функция обработчика события для изменения цвета мантии.
 */
var onWizardCoatClick = function () {
  wizardCoat.style.fill = COAT_COLORS[getRandomIndex(COAT_COLORS)];
};

/**
 * Вспомогательная функция обработчика события для изменения цвета глаз волшебника.
 */
var onWizardEyesClick = function () {
  wizardEyes.style.fill = EYES_COLORS[getRandomIndex(EYES_COLORS)];
};

/**
 * Определяет текущий активный элемент на странице.
 * @return{string} Наименование текущего активного элемента.
 */
var getActiveElement = function () {
  return document.activeElement.tagName;
};

/**
 * Вспомогательная функция обработчика события для закрытия окна при нажатии клавиши 'ESC'.
 * Нажатие 'ESC' не срабатывает, если фокус находится в поле изменения имени персонажа.
 * @param{object} evt Объект текущего события.
 */
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && getActiveElement() !== 'INPUT') {
    closePopup();
  }
};

/**
 * Вспомогательная функция обработчика события открывающая окно настройки персонажа.
 * Данная функция:
 * 1. Отображает окно настройки персонажа.
 * 2. Добавляет обработчиков событий:
 * - закрывает окно настройки персонажа при нажатии клавиши 'ESC'.
 * - изменяет цвет глаз волшебника в окне настройки персонажа, при клике на глаза.
 * - изменяет цвет мантии волшебника в окне настройки персонажа, при клике на мантию.
 * - изменяет цвет фаербола в окне настройки персонажа, при клике на фаербол.
 * @param{object} evt Объект текущего события.
 */
var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  wizardEyes.addEventListener('click', onWizardEyesClick);
  wizardCoat.addEventListener('click', onWizardCoatClick);
  fireball.addEventListener('click', onFireballClick);
};

/**
 * Вспомогательная функция обработчика события закрывающая окно настройки персонажа.
 * Данная функция:
 * 1. Скрывает окно настройки персонажа.
 * 2. Удаляет обработчиков событий:
 * - закрывает окно настройки персонажа при нажатии клавиши 'ESC'.
 * - изменяет цвет глаз волшебника в окне настройки персонажа, при клике на глаза.
 * - изменяет цвет мантии волшебника в окне настройки персонажа, при клике на мантию.
 * - изменяет цвет фаербола в окне настройки персонажа, при клике на фаербол.
 * @param{object} evt Объект текущего события.
 */
var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  document.removeEventListener('click', onWizardEyesClick);
  document.removeEventListener('click', onWizardCoatClick);
  document.removeEventListener('click', onFireballClick);
};

setupOpen.addEventListener('click', openPopup);

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', closePopup);

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});


