import Subtitles from "./aegisub/subtitles";

abstract class Karaskel {
  private static furigana_scale = 0.5;

  /**
   * Collect styles and metadata from the subs
   * 从各行字幕中收集样式和 metadata 信息
   * @param subs
   * @param generate_furigana 是否生成振假名
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
    const toinsert = {};
    let first_style_line = null;

    // First pass: collect all existing styles and get resolution info
    // 第一步：收集所有存在的样式，并且获得分辨率信息
    subs.forEach((sub, index) => {
      if (sub.class === "style") {
        if (!first_style_line) {
          first_style_line = index;
        }

        // Store styles into the style table
        styles.n++;
        // styles[styles.n] = sub;
        // styles[sub.name] = sub;
        // sub.margin_v = sub.margin_t;
      }
    });

    return {
      meta: "",
      styles: ""
    };
  }
}

export default Karaskel;
