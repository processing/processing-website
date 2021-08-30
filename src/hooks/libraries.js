import { useMemo } from 'react';

/**
  Hook to merge the current language libraries JSON files with the english
  This only happens if the language has the library, otherwise it's hidden.
  We might want to change this.
  @param {Array} english Array of libraries for english
  @param {Array} currentLang Array of libraries for current language
**/
export const usePreparedContributions = (english, currentLang, locale) => {
  return useMemo(() => {
    const contributions = [];

    console.log("english nodes");
    console.log(english);
    console.log("current language nodes");
    console.log(currentLang);


    for (let i = 0; i < english.length; i++) {
      const en = english[i];
      for (let j = 0; j < currentLang.length; j++) {
        const cur = currentLang[j];

        const search = `${en.childJson.name} ${en.childJson.authors} ${en.childJson.sentence}`;
        const copy = Object.assign({ search }, en.childJson);
        if (en.name === cur.name.split('.')[0]) {

          console.log("buscando cur " + cur.name + " english " +en.name);
          contributions.push(Object.assign(copy, cur.childJson));
        } else if (locale !== 'en') {
          contributions.push(copy);
        }
      }
    }

    return contributions;
  }, [english, currentLang, locale]);
};
