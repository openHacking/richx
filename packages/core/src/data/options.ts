import { Plugin } from "..";
import { IRichTextData } from "../components/data";

export interface IOptions {
  /**
   * string selector or DOM
   */
  container: string | HTMLElement;
  /**
   * plugin list
   */
  plugins?: Plugin[];

  /**
   * config
   */
  config?: IRichTextData;
}
