import Subtitle from "./subtitle";

class Subtitles {
  private lua_style = false;
  private subtitles: Subtitle[] = [];

  constructor(lua = false) {
    this.lua_style = lua;
  }

  get length() {
    return this.subtitles.length;
  }

  get lua() {
    return this.lua_style;
  }

  forEach(callback: (subtitle: Subtitle, index: number) => void) {
    this.subtitles.forEach((subtitle, i) => {
      callback(subtitle, i + Number(this.lua_style));
    });
  }

  at(index: number) {
    let i = index <= this.length ? index : this.length;
    if (this.lua_style) {
      i--;
    }
    return this.subtitles[i];
  }

  /**
   * 向字幕文件中附加一行或多行字幕
   * @param lines
   */
  append(...lines: Subtitle[]) {
    this.subtitles.push.apply(this, lines);
  }

  /**
   *
   * @param index
   * @param line
   */
  insert(index: number, line: Subtitle) {
    //TODO:
  }

  /**
   * 替换一行字幕
   * @param index
   * @param line
   */
  replace(index: number, line: Subtitle) {
    if (this.lua) {
      index--;
    }
    if (index >= 0 && index < this.subtitles.length) {
      this.subtitles[index] = line;
    }
  }

  /**
   * 删除一行字幕
   * @param indexs
   */
  delete(...indexs: number[]) {
    indexs.forEach(index => {
      if (!this.lua) {
        index++;
      }
      if (index > 0 && index <= this.subtitles.length) {
        this.subtitles.splice(index, 1);
      }
    });
  }

  /**
   * 删除一个范围内的字幕
   * @param first
   * @param last
   */
  deleteRange(first: number, last: number) {
    for (let i = first; i <= last; i++) {
      this.delete(i);
    }
  }
}

export default Subtitles;
