import { titleCase as _titleCase } from 'title-case';

/**
  Turns a slug into a title
  Example: this_is_something => This Is Something
**/
export const titleCase = (slug) => _titleCase(slug.replace(/_/g, ' '));

/**
  Turns a title into a slug
  Example: This Is Something => this-is-something
**/
export const slugify = (...titles) =>
  titles
    .join('-')
    .replace(/(\s|_)/g, '-')
    .toLowerCase();

export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const map = (n, start1, stop1, start2, stop2) => {
  const prog = Math.min(1, Math.max(0, (n - start1) / (stop1 - start1)));
  return prog * (stop2 - start2) + start2;
};

export const getWin = () => {
  return [window.innerWidth, window.innerHeight];
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

export const linkParsing = (str) => {
  if (typeof str !== 'string') {
    return str;
  }
  return str.replace(/\[([^\]]*)\]\(([^)]*)\)/g, '<a href="$2">$1</a>');
};
