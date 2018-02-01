'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var randomize = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};


var randomWizardName = function (WIZARD_NAMES) {
  var name = [];
  for (var i = 0; i < 4; i++) {
    name.push(randomize(WIZARD_NAMES));
    while (name[i] === name[i + 1] || name[i] === name[i + 2] || name[i] === name[i + 3] || name[i] === name[i - 1] || name[i] === name[i - 2] || name[i] === name[i - 3]) {
      name.splice(i, 1);
      name.push(randomize(WIZARD_NAMES));
    }
  }
  return name;
};

var names = randomWizardName(WIZARD_NAMES);


var randomWizardSurname = function (WIZARD_SURNAMES) {
  var surname = [];
  for (var i = 0; i < 4; i++) {
    surname.push(randomize(WIZARD_SURNAMES));
    while (surname[i] === surname[i + 1] || surname[i] === surname[i + 2] || surname[i] === surname[i + 3] || surname[i] === surname[i - 1] || surname[i] === surname[i - 2] || surname[i] === surname[i - 3]) {
      surname.splice(i, 1);
      surname.push(randomize(WIZARD_SURNAMES));
    }
  }
  return surname;
};

var surnames = randomWizardSurname(WIZARD_SURNAMES);

var randomWizardCoatColor = function (COAT_COLORS) {
  var coatColor = [];
  for (var i = 0; i < 4; i++) {
    coatColor.push(randomize(COAT_COLORS));
    while (coatColor[i] === coatColor[i + 1] || coatColor[i] === coatColor[i + 2] || coatColor[i] === coatColor[i + 3] || coatColor[i] === coatColor[i - 1] || coatColor[i] === coatColor[i - 2] || coatColor[i] === coatColor[i - 3]) {
      coatColor.splice(i, 1);
      coatColor.push(randomize(COAT_COLORS));
    }
  }
  return coatColor;
};

var coats = randomWizardCoatColor(COAT_COLORS);

var randomWizardEyes = function (EYES_COLORS) {
  var eyeColor = [];
  for (var i = 0; i < 4; i++) {
    eyeColor.push(randomize(EYES_COLORS));
    while (eyeColor[i] === eyeColor[i + 1] || eyeColor[i] === eyeColor[i + 2] || eyeColor[i] === eyeColor[i + 3] || eyeColor[i] === eyeColor[i - 1] || eyeColor[i] === eyeColor[i - 2] || eyeColor[i] === eyeColor[i - 3]) {
      eyeColor.splice(i, 1);
      eyeColor.push(randomize(EYES_COLORS));
    }
  }
  return eyeColor;
};

var eyes = randomWizardEyes(EYES_COLORS);

var coats = randomWizardCoatColor(COAT_COLORS);

var wizardsFullNames = [];

for (var i = 0; i < 4; i++) {
  wizardsFullNames.push(names[i] + ' ' + surnames[i]);
};

var wizards = [
  {
    name: wizardsFullNames[0],
    coatColor: coats[0]
  },
  {
    name: wizardsFullNames[1],
    coatColor: coats[1]
  },
  {
    name: wizardsFullNames[2],
    coatColor: coats[2]
  },
  {
    name: wizardsFullNames[3],
    coatColor: coats[3]
  }
];
