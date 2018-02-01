'use strict';
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var randomizeName = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};


var randomWizardName = function (WIZARD_NAMES, name) {
  var name = [];
  for (var i = 0; i < 4; i++) {
    name.push(randomizeName(WIZARD_NAMES));
    while (name[i] === name[i + 1] || name[i] === name[i + 2] || name[i] === name[i + 3] || name[i] === name[i - 1] || name[i] === name[i - 2] || name[i] === name[i - 3]) {
      name.splice(i, 1);
      name.push(randomizeName(WIZARD_NAMES));
    }
  }
  return name;
};

var names = randomWizardName(WIZARD_NAMES);


var randomWizardSurname = function (WIZARD_SURNAMES, surname) {
  var surname = [];
  for (var i = 0; i < 4; i++) {
    surname.push(randomizeName(WIZARD_SURNAMES));
    while (surname[i] === surname[i + 1] || surname[i] === surname[i + 2] || surname[i] === surname[i + 3] || surname[i] === surname[i - 1] || surname[i] === surname[i - 2] || surname[i] === surname[i - 3]) {
      surname.splice(i, 1);
      surname.push(randomizeName(WIZARD_SURNAMES));
    }
  }
  return surname;
};

var surnames = randomWizardSurname(WIZARD_SURNAMES);

var wizardsFullNames = [];

for (var i = 0; i < 4; i++) {
  wizardsFullNames.push(names[i] + ' ' + surnames[i]);
}
