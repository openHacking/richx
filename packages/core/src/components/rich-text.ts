import { IOptions } from "../data/options";
import { $$ } from "../utils";

import {
  DEFAULT_RICH_TEXT,
  IRichTextData,
  IRichTextRange,
  IRichTextSettingData,
} from "./data";
import { createArrayRange, mergeArray } from "../utils/util";

import "../assets/css/main.module.less";
import { IPlugin, IRange, Plugin } from "..";

/**
 * rich text
 *
 * reference: https://www.thatsoftwaredude.com/content/8912/create-a-basic-text-editor-in-javascript
 */
export class RichText {
  private _container: HTMLElement;
  private _text: IRichTextData;
  private _plugins: { [key: string]: Plugin };
  constructor(options: IOptions) {
    const { container, text, plugin } = options;
    if (typeof container === "string") {
      this._container = $$(container);
    } else {
      this._container = container;
    }

    this.init(text);
    this.installPulgin(plugin || []);
  }
  /**
   * init rich text dom
   */
  init(text?: IRichTextData) {
    // merge default setting
    this._text = Object.assign(DEFAULT_RICH_TEXT, text);

    let transformJson = textToJson(text);

    const dom = `<div class="editor" contenteditable="true">${transformJson}</div>`;
    this._container.insertAdjacentHTML("beforeend", dom);
  }
  get container(): HTMLElement {
    return this._container;
  }

  /**
   * install all plugins
   * @param plugins
   */
  installPulgin(plugins: Plugin[]) {
    plugins.forEach((plugin) => {
      plugin.init(this);
      this._plugins[plugin.name] = plugin;
    });
  }

  setStyle(type: string, value: string | number, range: IRange) {
    const rule = {
      type: type,
      value: value,
      selection: [[range.start, range.end]],
    };

    // merge setting
    this._text.setting = mergeTextSetting(rule, this._text.setting);

    return textToJson(this._text);
  }
}

export const textToJson = (text: IRichTextData): string => {
  let transformJson = "";
  if (text && text.hasOwnProperty("text")) {
    const json = transfromRichTextJson(text);
    transformJson = transfromRichTextRender(json);
  }

  return transformJson;
};

/**
 * rich text json transform
 * @param json
 * @returns
 */
export const transfromRichTextJson = (json): object => {
  const jsonMap = {};

  // Decompose each item to a single character
  json.setting.forEach((item) => {
    item.selection.forEach((select) => {
      if (select instanceof Array) {
        for (let index = select[0]; index <= select[1]; index++) {
          index = "" + index;
          const style = {
            [item.type]:
              item.type === "font-size" ? item.value + "px" : item.value,
          };
          if (jsonMap.hasOwnProperty(index)) {
            jsonMap[index] = Object.assign(jsonMap[index], style);
          } else {
            jsonMap[index] = style;
          }
        }
      }
    });
  });

  // Combine adjacent and identical settings
  let preSetting: any = null,
    jsonMapMerge = {};

  Object.keys(jsonMap).reduce((pre, cur, i) => {
    // init
    if (i === 1) {
      preSetting = {
        selection: [pre],
        style: jsonMap[pre],
      };
    }

    // check for duplication
    if (
      JSON.stringify(jsonMap[pre]) === JSON.stringify(jsonMap[cur]) &&
      Number(pre) + 1 === Number(cur)
    ) {
      preSetting.selection = [preSetting.selection[0], cur];
    } else {
      jsonMapMerge[preSetting.selection.join("_")] = preSetting.style;

      preSetting = {
        selection: [cur],
        style: jsonMap[cur],
      };
    }

    // store last preSetting
    if (i === Object.keys(jsonMap).length - 1) {
      jsonMapMerge[preSetting.selection.join("_")] = preSetting.style;
    }
    return cur;
  });

  return {
    text: json.text,
    setting: jsonMapMerge,
  };
};

export const transfromRichTextRender = (json): string => {
  const text = json.text;
  const setting = json.setting;
  const replaceMap = [];
  Object.keys(setting).forEach((item) => {
    const start = +item.split("_")[0];
    const end = (item.split("_")[1] && +item.split("_")[1] + 1) || start;

    const substring = text.substr(start, end === start ? 1 : end - start);

    const repalce = `<span style="${JSON.stringify(setting[item])
      .replace(/\"|{|}/g, "")
      .replace(/,/g, ";")}">${substring}</span>`;

    // store replace info , covert object to style, remove " { } and replace , to ;
    replaceMap.push({
      start,
      count: end === start ? 1 : end - start,
      replace:
        end === start
          ? [repalce]
          : [repalce, ...new Array(end - start - 1).fill("$$RICH_TEXT$$")],
    });
  });

  let splitText = text.split("");

  // replace all html string
  replaceMap.forEach((item) => {
    splitText.splice(item.start, item.count, ...item.replace);
  });

  splitText = splitText.join("").replaceAll("$$RICH_TEXT$$", "");

  return splitText;
};

/**
 *
 * merge new rule to current setting
 * @param rule
 * @param setting
 */
export function mergeTextSetting(rule, setting): IRichTextSettingData[] {
  const find = setting.find(
    (item) => item.type === rule.type && item.value === rule.value
  );

  if (find) {
    /**
         * e.g.
         * let selection = [
            [1, 4],
            [9, 11],
        ]

            let ruleSelection = [[6,7]]
         */
    let selection = find.selection;
    let ruleSelection = rule.selection;

    /**
     * selection => [[1, 2, 3, 4],[ 9, 10, 11]]
     */
    selection.forEach((item, i) => {
      if (Array.isArray(item)) {
        selection[i] = createArrayRange(item[0], item[1]);
      }
    });

    /**
     * ruleSelection =>  [6, 7]
     */
    ruleSelection = createArrayRange(ruleSelection[0][0], ruleSelection[0][1]);

    /**
     * sortArray => [1, 2, 3, 4, 6, 7, 9, 10, 11]
     */

    const sortArray = [
      ...new Set([].concat(...selection).concat(...ruleSelection)),
    ].sort((a, b) => a - b);

    /**
     * setting.selection => [[1,4],[6,7],[9,11]]
     */
    find.selection = mergeArray(sortArray);
  } else {
    setting.push(rule);
  }

  return setting;
}
