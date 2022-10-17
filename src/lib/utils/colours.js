const LUMINANCE_VALUES = [0.2126, 0.7152, 0.0722];
const SRGB_THRESHOLD = 0.03928;
const LUMINANCE_THRESHOLD = 0.1791;

// For a subject card, choose to render either black or white text based on the luminance of the
//  background colour.

const text_colouriser = (background_hexcode) => {
  let luminance = background_hexcode
      .match(/^#(\w{2})(\w{2})(\w{2})/)
      .slice(1)
      .reduce((total, d, i) => {
          d = parseInt(d, 16);
          let srgb = d / 255;

          if (srgb <= SRGB_THRESHOLD) d = srgb / 12.92;
          else d = Math.pow((srgb + 0.055) / 1.055, 2.4);

          return total + d * LUMINANCE_VALUES[i];
      }, 0);

  return {
      color: background_hexcode,
      text: luminance > LUMINANCE_THRESHOLD ? "black" : "white",
  };
};

export { text_colouriser };