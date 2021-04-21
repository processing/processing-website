export function uid(prefix = 'comp') {
  return prefix + '-' + Math.random().toString(36).substring(2, 16);
}

export const rgbToHex = (rgb) => {
  // padStart not supported on IE
  if (typeof rgb === 'string') return rgb;
  let hex =
    '#' +
    rgb[0].toString(16).padStart(2, '0') +
    rgb[1].toString(16).padStart(2, '0') +
    rgb[2].toString(16).padStart(2, '0');
  return hex;
};

export const hexToRgb = (hex) => {
  if (typeof hex === 'object' && hex !== null) return hex;
  let rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return rgb
    ? [parseInt(rgb[1], 16), parseInt(rgb[2], 16), parseInt(rgb[3], 16)]
    : null;
};

export const round = (value, decimals) =>
  Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
