import { IOptions } from "../data/options";
import { RichText } from "@richx/core";
import styles from "./tool-bar.module.less";
import { Component } from "@richx/core";
import { fontSizeSettingList } from "../data/const";

interface IToolBarComponentProps {
  core: RichText;
}
/**
 * Tool bar component
 */
export class ToolBarComponent extends Component {
  core: RichText;
  constructor(props: IToolBarComponentProps) {
    super();
    const { core } = props;
    this.core = core;
  }

  setFontWeight() {
    this.core.setStyle("font-weight", 700);
  }
  setFontStyle() {
    this.core.setStyle("font-style", "italic");
  }
  setFontSize(e: Event) {
    this.core.setStyle("font-size", +e.target.value);
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
