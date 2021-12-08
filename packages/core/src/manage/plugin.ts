import { RichText } from "../components/rich-text";

export interface IPlugin {
  name: string;
  _richText: RichText;
}
export abstract class Plugin {
  name: string;
  constructor() {}

  init(richText: RichText) {
    this._richText = richText;
  }
}
