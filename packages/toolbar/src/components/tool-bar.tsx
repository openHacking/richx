import { IOptions } from "../data/options";
import {
  $$,
  IProps,
  IRichTextData,
  mergeTextSetting,
  RichText,
  saveRange,
  textToJson,
} from "@richx/core";
import styles from "./tool-bar.module.less";
import { Component } from "@richx/core";
import { fontSizeSettingList } from "../data/const";
import { IRange } from "@richx/core";

interface IToolBarProps {}
/**
 * Tool bar component
 */
export class ToolBarComponent extends Component {
  constructor(props: IToolBarProps) {
    super();
  }

  setFontWeight() {
    this.setState("font-weight", 700);
  }
  setFontStyle() {
    this.setState("font-style", "italic");
  }
  setFontSize(e: Event) {
    this.setState("font-size", +e.target.value);
  }

  /**
   * Render the component's HTML
   *
   * @returns {void}
   */
  render() {
    return (
      <div className={styles.sampleToolbar}>
        <span
          style={{ fontWeight: 700 }}
          onClick={this.setFontWeight.bind(this)}
        >
          B
        </span>
        <span
          style={{ fontStyle: "italic" }}
          onClick={this.setFontStyle.bind(this)}
        >
          I
        </span>
        <span>
          <select name="" id="" onChange={this.setFontSize.bind(this)}>
            {fontSizeSettingList.map((size) => {
              return <option value={size}>{size} px</option>;
            })}
          </select>
        </span>
      </div>
    );
  }
}
