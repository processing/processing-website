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

export const getWin = () => {
  return [window.innerWidth, window.innerHeight];
};
