import { IRichTextData } from "../components/data";

export interface IOptions {
  /**
   * string selector or DOM
   */
  element: string | HTMLElement;
  /**
   * plugin list
   */
  plugins?: any[];

  text?: IRichTextData;
}
