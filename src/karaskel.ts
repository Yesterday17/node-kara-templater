import { InfoSubtitle, StyleSubtitle } from "./aegisub/subtitle";
import Subtitles from "./aegisub/subtitles";
import { Log } from "./global";

abstract class Karaskel {
  private static furigana_scale = 0.5;

  /**
   * Collect styles and metadata from the subs
   * 从各行字幕中收集样式和 metadata 信息
   * @param subs
   * @param generate_furigana 是否会为没有对应假名布局的样式单独生成样式 生成的假名样式永远也不会覆盖存在的样式
   */
  public static collect_head(subs: Subtitles, generate_furigana: boolean) {
    const meta = {
      // X and Y script resolution
      res_x: 0,
      res_y: 0,
      // Aspect ratio correction factor for video/script resolution mismatch
      video_x_correct_factor: 1.0
    };
    const styles = {
      n: 0
    };
    const toinsert: StyleSubtitle[] = [];
    let first_style_line = null;

    // First pass: collect all existing styles and get resolution info
    // 第一步：收集所有存在的样式，并且获得分辨率信息
    subs.forEach((sub, index) => {
      if (sub.class === "style") {
        const l = sub as StyleSubtitle;
        if (!first_style_line) {
          first_style_line = index;
        }

        // Store styles into the style table
        styles.n++;
        styles[styles.n] = l;
        styles[l.name] = l;

        // And also generate furigana styles if wanted
        if (generate_furigana && !l.name.match("furigana")) {
          Log.debug(`Creating furigana style for style: ${l.name}`);
          const fs = Object.assign({}, l);
          fs.fontsize = l.fontsize * this.furigana_scale;
          fs.outline = l.outline * this.furigana_scale;
          fs.shadow = l.shadow * this.furigana_scale;
          fs.name = l.name + "-furigana";

          // queue to insert in file
          toinsert.push(fs);
        }
      } else if (sub.class === "info") {
        // Also look for script resolution
        const l = sub as InfoSubtitle;
        let k = l.key.toLowerCase();
        meta[k] = l.value;
      }
    });

    // Second pass: insert all toinsert styles that don't already exist
    // 第二步：将所有 toinsert 中没有的样式加入 styles
    toinsert.forEach(to => {
      if (!styles[to.name]) {
        // Insert into styles table
        styles.n++;
        styles[styles.n] = to;
        styles[to.name] = to;

        // And subtitle file
        subs.insert(first_style_line, to);
      }
    });

    // Fix resolution data
    // if (meta.playresx) {
    // }

    return {
      meta,
      styles
    };
  }
}

export default Karaskel;
