import { Plugin } from "..";
export enum TextStyle {
  FONT_FAMILY = "fontFamily",
  FONT_SIZE = "fontSize",
  ITALIC = "italic",
  BOLD = "bold",
  STRIKETHROUGH = "strikethrough",
  UNDERLINE = "underline",
  TEXT_DECORATION = "textDecoration",
  TEXT_ROTATION = "textRotation",
  TEXT_DIRECTION = "textDirection",
  COLOR = "color",
  BACKGROUND = "background",
  HORIZONTAL_ALIGNMENT = "horizontalAlignment",
  VERTICAL_ALIGNMENT = "verticalAlignment",
  PADDING = "padding",
  BORDERS = "borders",
  FORMAT = "format",
}

export enum FontFamily {
  ROBOTO = "Roboto",
  HELVETICA = "Helvetica",
  ARIAL = "Arial",
  SANS_SERIF = "sans-serif",
}
export enum FontStyle {
  ITALIC = "italic",
  NORMAL = "normal",
  OBLIQUE = "oblique",
}
export enum FontWeight {
  NORMAL = "normal",
  BOLD = "bold",
  BOLDER = "bolder",
  LIGHTER = "lighter",
  W100 = 100,
  W200 = 200,
  W300 = 300,
  W400 = 400,
  W500 = 500,
  W600 = 600,
  W700 = 700,
  W800 = 800,
  W900 = 900,
}
export enum TextDecoration {
  NONE = "none",
  UNDERLINE = "underline",
  LINE_THROUGH = "line-through",
  OVERLINE = "overline",
}

export interface IRichTextSettingData {
  type: string;
  value: string | number;
  selection: Array<[start: number, end: number]>;
}

export interface IRichTextData {
  text: string;
  setting: IRichTextSettingData[];
}

export interface IRichTextRange {
  start: number;
  end: number;
}

export const DEFAULT_RICH_TEXT = {
  config: "Simple Rich Text Demo",
  setting: [],
};

export type ObjectKV<V = object> = {
  [key: string]: V;
};
export interface IPlugins {
  [key: string]: Plugin;
}
