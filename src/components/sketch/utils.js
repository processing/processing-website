export function uid(prefix = 'comp') {
  return prefix + '-' + Math.random().toString(36).substring(2, 16);
}

export const rgbToHex = (rgb) => {
  // padStart not supported on IE
  if (typeof rgb === 'string') return rgb;
  let hex =
    '#' +
    rgb.r.toString(16).padStart(2, '0') +
    rgb.g.toString(16).padStart(2, '0') +
    rgb.b.toString(16).padStart(2, '0');
  return hex;
};

export const hexToRgb = (hex) => {
  if (typeof hex === 'object' && hex !== null) return hex;
  let rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return rgb
    ? {
        r: parseInt(rgb[1], 16),
        g: parseInt(rgb[2], 16),
        b: parseInt(rgb[3], 16),
      }
    : null;
};

export const scale = (n, iniMin, iniMax, endMin, endMax) => {
  return ((n - iniMin) * (endMax - endMin)) / (iniMax - iniMin) + endMin;
};

export const round = (value, decimals) =>
  Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
