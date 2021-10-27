import { IOptions } from "../data/options";
import { $$ } from "../utils";
import styles from "../assets/css/main.module.less";

/**
 * rich text
 */
export class RichText {
  private _element: HTMLElement;
  constructor(options: IOptions) {
    const { element } = options;
    if (typeof element === "string") {
      this._element = $$(element);
    } else {
      this._element = element;
    }

    this.init();
  }
  /**
   * init rich text dom
   */
  init() {
    const dom = `<div class="editor" contenteditable="true">edit</div>`;
    this._element.insertAdjacentHTML("beforeend", dom);

    console.log("init rich core");
  }
  get element(): HTMLElement {
    return this._element;
  }
}
