import Subtitles from "./aegisub/subtitles";
import { Log } from "./global";
import Karaskel from "./karaskel";

function parse_templates(...args: any[]) {}

function apply_templates(...args: any[]) {}

function filter_apply_templates(subs: Subtitles) {
  Log.info("Collecting header data...");
  const { meta, styles } = Karaskel.collect_head(subs, true);

  Log.info("Parsing templates...");
  const templates = parse_templates(meta, styles, subs);

  Log.info("Applying templates...");
  apply_templates(meta, styles, subs, templates);
}
