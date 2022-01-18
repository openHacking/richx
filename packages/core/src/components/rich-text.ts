import { IOptions } from "../data/options";
import { $$ } from "../utils";

import {
  DEFAULT_RICH_TEXT,
  IPlugins,
  IRichTextData,
  IRichTextSettingData,
  ObjectKV,
} from "./data";
import {
  addClass,
  createArrayRange,
  mergeArray,
  restoreRange,
  saveRange,
} from "../utils/util";

import "../assets/css/main.module.less";
import { IRange, Plugin } from "..";
import { Component } from ".";

interface IReplaceMap {
  start: number;
  count: number;
  replace: string[];
}

interface IPreSetting {
  selection: string[];
  style: object;
}

/**
 * rich text
 *
 * reference: https://www.thatsoftwaredude.com/content/8912/create-a-basic-text-editor-in-javascript
 */
export class RichText {
  private _container: HTMLElement;
  private _config!: IRichTextData;
  private _range: IRange;
  private _plugins: IPlugins;
  constructor(options: IOptions) {
    const { container, config, plugins } = options;
    if (typeof container === "string") {
      this._container = $$(container);
    } else {
      this._container = container;
    }

    addClass("richx-editor", this._container);
    this._container.contentEditable = "true";
    this._range = { start: 0, end: 0 };
    this._plugins = {};

    this.init(config);
    this.installPlugin(plugins || []);
  }
  /**
   * init rich text dom
   */
  init(config?: IRichTextData) {
    // merge default setting
    this._config = Object.assign(DEFAULT_RICH_TEXT, config);

    let transformJson = configToJson(this._config);

    this._container.innerHTML = transformJson;
  }
  get container(): HTMLElement {
    return this._container;
  }
  /**
   * install all plugins
   * @param plugins
   */
  installPlugin(plugins: Plugin[]) {
    plugins.forEach((plugin) => {
      plugin.init(this);
      this._plugins[plugin.name] = plugin;
    });
  }

  /**
   * set style by type
   * @param type style stype
   * @param value style value
   */
  setStyle(type: string, value: string | number) {
    this._range = saveRange(this._container);

    const rule: IRichTextSettingData = {
      type: type,
      value: value,
      selection: [[this._range.start, this._range.end]],
    };

    // merge setting
    this._config.setting = mergeTextSetting(rule, this._config.setting);

    let transformHTML = configToJson(this._config);

    this._container.innerHTML = transformHTML;

    restoreRange(this.container, this._range);
  }
}

export const configToJson = (config: IRichTextData): string => {
  let transformJson = "";
  if (config && config.hasOwnProperty("text")) {
    const json: object = transfromRichTextJson(config);
    transformJson = transfromRichTextRender(json);
  }

  return transformJson;
};

/**
 * rich text json transform
 * @param json
 * @returns
 */
export const transfromRichTextJson = (json: IRichTextData): object => {
  const jsonMap: ObjectKV<object> = {};

  // Decompose each item to a single character
  json.setting.forEach((item) => {
    item.selection.forEach((select) => {
      if (select instanceof Array) {
        for (let i = select[0]; i <= select[1]; i++) {
          let index = "" + i;
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
  let preSetting: IPreSetting = { selection: [], style: {} },
    jsonMapMerge: ObjectKV<object> = {};

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

export const transfromRichTextRender = (json: any): string => {
  const text = json.text;
  const setting = json.setting;
  const replaceMap: IReplaceMap[] = [];
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
export function mergeTextSetting(
  rule: IRichTextSettingData,
  setting: any
): IRichTextSettingData[] {
  const find = setting.find(
    (item: any) => item.type === rule.type && item.value === rule.value
  );

  if (find) {
    /**
       e.g.
       let selection = [
        [1, 4],
        [9, 11],
    ]

      let ruleSelection = [[6,7]]
    */
    let selection = find.selection;
    let ruleSelection: any = rule.selection;

    /**
     * selection => [[1, 2, 3, 4],[ 9, 10, 11]]
     */
    selection.forEach((item: object, i: number) => {
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
