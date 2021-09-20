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

    for (let i = 0; i < english.length; i++) {
      const en = english[i];
      for (let j = 0; j < currentLang.length; j++) {
        const cur = currentLang[j];
        //
        // if (en.name === fields.name) {
        //   const copy = Object.assign({}, en.childJson, cur.childJson);
        //   copy.search = `${copy.name} ${copy.authors} ${copy.sentence}`;
        //   contributions.push(copy);
        // }

        // if (en.name === cur.name.split('.')[0]) {
        //   contributions.push(Object.assign(copy, cur.childJson));
        // } else if (locale !== 'en') {
        //   contributions.push(copy);
        // }

        // console.log(locale);

        // if (locale === 'en') {
        //   if (en.name === cur.name.split('.')[0]) {
        //     contributions.push({ ...en.childJson });
        //   }
        // } else {
        //   if (en.name === cur.name.split('.')[0]) {
        //     contributions.push({ ...en.childJson, ...cur.childJson });
        //   }
        // }
      }
    }

    return contributions;
  }, [english, currentLang, locale]);
};
