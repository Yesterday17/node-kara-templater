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

export class DialogueSubtitle extends Subtitle {
  // Style class
  class: "dialogue";

  // Section
  section: "[Events]" | string;

  // Boolean, true if the line is a Comment line rather than Dialogue.
  comment: boolean;

  // Layer of the line.
  // FIXME: type
  layer: any;

  // Start and end times of the line in milliseconds.
  start_time: number;
  end_time: number;

  // Name of the style used for the line.
  style: string;

  // Actor field for the line.
  actor: string;

  // Margin overrides for the line, a zero value means use margin from style.
  margin_l: number;
  margin_r: number;
  margin_t: number;
  margin_b: number;

  // Effect field of the line.
  effect: string;

  // [document] Unused.
  // FIXME:
  userdata: any;

  // Dialogue text.
  text: string;

  // Basic added fields, by karaskel.preproc_line_text:
  // Line text with all override tags and vector drawings removed.
  text_stripped: string;

  // Duration of the line in milliseconds.
  duration: number;

  // Array tables of extended karaoke and furigana tables, respectively.
  // They do not contain sizing and positioning data from the beginning.
  // FIXME: type
  kara: any;
  furi: any;

  // Added fields for positioning, by karaskel.preproc_line_pos:
  // A convenience alias for line.margin_t.
  get margin_v() {
    return this.margin_t;
  }
  set margin_v(value: number) {
    this.margin_t = value;
  }

  // Valid margin values for the line.
  // If the corresponding margin override for the line is non-zero,
  // that value is used, otherwise the value defined in the style is used.
  eff_margin_l: number;
  eff_margin_r: number;
  eff_margin_t: number;
  eff_margin_b: number;
  get eff_margin_v() {
    return this.eff_margin_t;
  }
  set eff_margin_v(value: number) {
    this.eff_margin_t = value;
  }

  // the horizontal alignment of the line, derived from line.styleref.align
  halign: "left" | "center" | "right";

  // the vertical alignment of the line, derived from line.styleref.align.
  valign: "top" | "middle" | "bottom";

  // The left edge X coordinate for the line, assuming its given alignment, valid margins and no collision detection.
  left: number;

  // The line centre X coordinate, assuming its given alignment, valid margins and no collision detection.
  center: number;

  // The right edge X coordinate for the line, assuming its given alignment, valid margins and no collision detection.
  right: number;

  // The top edge Y coordinate for the line, assuming its given alignment, valid margins and no collision detection.
  top: number;

  // The line vertical centre Y coordinate, assuming its given alignment, valid margins and no collision detection line.vcenter is an alias for this.
  middle: number;

  // The bottom edge Y coordinate for the line, assuming its given alignment, valid margins and no collision detection.
  bottom: number;

  // X and Y coordinates for the line, suitable for using in a \pos override tag to get the line's original position.
  x: number;
  y: number;

  // Added fields for linked list access, only available when using the Classic Advanced skeleton:
  // Access the dialogue line before and after this one.
  // These might be nil on the first/last dialogue lines.
  // Blank lines, style lines, header lines etc. are not included in this linked list.
  prev: DialogueSubtitle | null;
  next: DialogueSubtitle | null;
}

export default Subtitle;
