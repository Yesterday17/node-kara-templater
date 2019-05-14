class Subtitle {
  class: string;

  // The raw text of the line, from first to last character on the physical line.
  // 该行字幕的内容
  raw: string;

  // Which section of the file the line belongs to.
  // If the line is placed before the first section heading, this field is nil.
  // 该行字幕属于的 section
  // 当该行位于第一行 section 之前时，该值为 null
  section: string | null;
}

export class InfoSubtitle extends Subtitle {
  // Info class
  class: "info";

  // The part of the line before the first colon,
  // with leading and trailing spaces removed.
  key: string;

  // Everything after the first colon on the line,
  // also with leading and trailing spaces removed.
  value: string;
}

export class StyleSubtitle extends Subtitle {
  // Style class
  class: "style";

  // Section
  section: "[V4+ Styles]";

  // Name of the style.
  name: string;

  // Name of the font face used by the style.
  fontname: string;

  // Font size for the style.
  fontsize: number;

  // The four colours used by the style, in regular order.
  // Use [[extract_color|Automation/Lua/Modules/#extractcolor]]
  // and family to manipulate these.
  color1: string;
  color2: string;
  color3: string;
  color4: string;

  // Specify bold/non-bold font face.
  // Can also be a number to specify font weight,
  // but this is not well supported and should be avoided.
  bold: boolean;

  // Boolean, whether an italic/oblique version of the font face is used or not.
  italic: boolean;

  // Boolean, whether to apply these two decorations to the text.
  underline: boolean;
  strikeout: boolean;

  // Scaling in X and Y direction, 100 is neutral.
  scale_x: number = 100;
  scale_y: number = 100;

  // Additional spacing in pixels between individual characters in text.
  // FIXME: specify type
  spacing: any;

  // Z axis rotation for the text.
  angle: number;

  // 1 (one) for regular outlined text, 3 for opaque box behind subtitles.
  borderstyle: 1 | 3;

  // Width of the extended outline around the text.
  outline: number;

  // Distance to the shadow behind the text.
  shadow: number;

  // Numpad-style alignment for the text on screen.
  align: number;

  // Margins for the style.
  margin_l: number;
  margin_r: number;
  margin_t: number;
  margin_b: number;

  // margin_v is an alias for top margin.
  get margin_v() {
    return this.margin_t;
  }
  set margin_v(value: number) {
    this.margin_t = value;
  }

  // Windows font encoding ID for the style.
  encoding: number;

  // TODO: [document] Currently unsupported.
  relative_to: any;

  // TODO: [document] Unsupported, tentative AS5 feature.
  vertical: any;
}

export default Subtitle;
