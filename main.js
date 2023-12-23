const config = { correctValueAttribute: 'data-correct-value' };

const ruoli = {
  'Finanzieri ed Appuntati': [
    'Finanziere',
    'Finanziere scelto',
    'Appuntato',
    'Appuntato scelto',
    'Appuntato scelto Qualifica Speciale'
  ],
  'Sovrintendenti': [
    'Vice Brigadiere',
    'Brigadiere',
    'Brigadiere Capo',
    'Brigadiere Capo Qualifica Speciale'
  ],
  'Ispettori': [
    'Maresciallo',
    'Maresciallo Ordinario',
    'Maresciallo Capo',
    'Maresciallo Aiutante',
    'Luogotenente',
    'Luogotenente Cariche Speciali'
  ],
  'Ufficiali Inferiori': [
    'Sottotenente',
    'Tenente',
    'Tenente - Comandante di Compagnia e Stazione Navale in sede vacante',
    'Capitano'
  ],
  /*
  'Ufficiali Superiori': [
    'Maggiore',
    'Maggiore (Comandante di Corpo)',
    'Tenente Colonnello',
    'Tenente Colonnello (Comandante di Corpo)',
    'Tenente Colonnello (incarico grado superiore - non iscritto in quadro)',
    'Tenente Colonnello (incarico grado superiore - non iscritto in quadro) comandante di corpo',
    'Tenente Colonnello (incarico grado superiore - iscritto in quadro)',
    'Colonnello',
    'Colonnello (Comandante di Corpo)',
    'Colonnello (incarico grado superiore - non iscritto in quadro)',
    'Colonnello (incarico grado superiore - iscritto in quadro)'
  ],
  'Ufficiali Generali': [
    'Generale di Brigata',
    'Generale di Brigata - incarico grado superiore - non iscritto in quadro',
    'Generale di Brigata - incarico grado superiore - iscritto in quadro',
    'Generale di Divisione',
    'Generale di Divisione - incarico grado superiore - non iscritto in quadro',
    'Generale di Divisione - incarico grado superiore - iscritto in quadro',
    'Generale di Corpo d\'Armata',
    'Generale di Corpo d\'Armata - Comandante in Seconda',
    'Generale di Corpo d\'Armata con incarichi speciali - Comandante Generale'
  ]
  */
};

const getImagePath = (name) =>
  `/img/${name.toLowerCase().replaceAll(' ', '-')}.jpeg`;

const buildSelectMenu = (grado) => {
  const select = document.createElement('select');
  select.setAttribute(config.correctValueAttribute, grado);

  const defaultOption = new Option('Scegli', '', true, true);
  defaultOption.disabled = true;

  select.options.add(defaultOption);

  const gradi = shuffle(Object.values(ruoli).flat());

  for (const grado of gradi) {
    const option = new Option();
    option.text = grado;
    option.value = grado;

    select.options.add(option);
  }

  return select;
}


/**
 * source: https://www.freecodecamp.org/news/how-to-shuffle-an-array-of-items-using-javascript-or-typescript/
 */
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
  }

  return array; 
}; 

const main = document.querySelector('main');

for (const ruolo in ruoli) {
  main.insertAdjacentHTML('beforeend', `<h2>${ruolo}</h2>`);

  for (const grado of ruoli[ruolo]) {
    const container = document.createElement('div');
    container.classList.add('grado');

    const img = new Image();
    img.src = getImagePath(grado);

    container.append(img);
    container.append(buildSelectMenu(grado));

    {
      const correctValueContainer = document.createElement('p');
      correctValueContainer.innerText = 'Valore corretto: ';
      correctValueContainer.classList.add('correct-value');

      const correctValueElement = document.createElement('b');
      correctValueElement.innerText = grado;
      correctValueElement.classList.add('hidden');

      correctValueContainer.append(correctValueElement);
      container.append(correctValueContainer);
    }

    main.append(container);
  }
}

const checkButton = document.createElement('button');
checkButton.id = 'check';
checkButton.innerText = 'Controlla';

checkButton.addEventListener('click', () => {
  const selects = document.querySelectorAll('select').values();

  for (const select of selects) {
    select.classList.remove('correct', 'wrong');
    select.nextSibling.querySelector(':scope > b').classList.remove('hidden');

    const expectedValue = select.getAttribute(config.correctValueAttribute);

    if (select.value === expectedValue) {
      select.classList.add('correct');
    } else {
      select.classList.add('wrong');
    }
  }
});

main.append(checkButton);
