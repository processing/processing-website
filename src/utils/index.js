import { titleCase as _titleCase } from 'title-case';

// applies title case after replacing _ by spaces
export const titleCase = (slug) => _titleCase(slug.replace(/_/g, ' '));

export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

export const map = (n, start1, stop1, start2, stop2) => {
  const prog = Math.min(1, Math.max(0, (n - start1) / (stop1 - start1)));
  return prog * (stop2 - start2) + start2;
};

const WIDONT_REGEX = /([^\s])\s+([^\s]+)\s*$/;
const DASH_REGEX = /-/g;
const SPACE = '\u00a0'; //'&nbsp;';
const HYPHEN = '\u2011'; //'&#8209;'

export const widont = (str) => {
  if (typeof str !== 'string') {
    return str;
  }
  return str.replace(WIDONT_REGEX, (str, lead, word) => {
    if (word.indexOf('-') >= 0) {
      return lead + ' ' + word.replace(DASH_REGEX, HYPHEN);
    }
    return lead + SPACE + word;
  });
};