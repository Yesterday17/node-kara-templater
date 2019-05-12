import Logger, { ConsoleLogger } from "./utils/log";

export const template_Modifiers = [
  "pre-line",
  "line",
  "syl",
  "furi",
  "char",
  "all",
  "repeat",
  "loop",
  "notext",
  "keeptags",
  "noblank",
  "multi",
  "fx",
  "fxgroup"
];

export const Log: Logger = new ConsoleLogger("Kara");
