const LUMINANCE_VALUES = [0.2126, 0.7152, 0.0722];
const SRGB_THRESHOLD = 0.03928;
const LUMINANCE_THRESHOLD = 0.1791;

const COLOURS = [
    "#001f3f",
    "#0074D9",
    "#B10DC9",
    "#85144b",
    "#FF4136",
    "#FF851B",
    "#FFDC00",
    "#3D9970",
];

/**
 * For a subject card, choose to render either black or white text based on the luminance of the
 * background colour.
 */
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
      colour: background_hexcode,
      text_colour: luminance > LUMINANCE_THRESHOLD ? "black" : "white",
  };
};

/**
 * subject_ids = [{ name: "Name", code: "EEET0000"}, { name: "Name", code: "COSC0000" }] ...
 * Create a palette object. Each subject code is assigned a colour value, from our list of COLOURS
 */
const get_palette_from_subject_codes = (subject_ids) => {
    let palette = {};
    for (let i = 0; i < subject_ids.length; i++) {
        let code = subject_ids[i].code;
        palette[code] = COLOURS[i];
    }
    return palette;
}

export { text_colouriser, get_palette_from_subject_codes };