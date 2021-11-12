import { IOptions } from "../data/options";
import { $$, IProps, IRichTextData, mergeTextSetting, saveRange, textToJson } from "@richx/core";
import styles from "./tool-bar.module.less";
import { Component } from "@richx/core";
import { fontSizeSettingList } from "../data/const";


// function component template

// export const ToolBarComponent = () => {
//   return (
//     <div className={styles.sampleToolbar}>
//       <span style={{ fontWeight: 700 }}>B</span>
//       <span style={{ fontStyle: 'italic' }}>I</span>
//       <span className="" aria-hidden="true"></span>
//       <span className="" aria-hidden="true"></span>
//       <span className="" aria-hidden="true"></span>
//     </div>
//   )
// }

/**
 * Tool bar component
 */
export class ToolBarComponent extends Component {
  private _range: { start: number, end: number }

  constructor(private _text: IRichTextData) {
    super()

  }

  setFontWeight() {

    this.setState('font-weight', 700);
  }
  setFontStyle() {

    this.setState('font-style', 'italic');
  }
  selectFontSize(e: Event) {
    this.setState('font-size', +e.target.value);

  }

  setState(type: string, value: string | number) {

    const editor = $$('.editor')
    this._range = saveRange(editor);
    const rule = {
      type: type,
      value: value,
      selection: [[this._range.start, this._range.end]],
    };

    // merge setting
    this._text.setting = mergeTextSetting(rule, this._text.setting);


    let transformJson = textToJson(this._text)

    editor.innerHTML = transformJson

  };

  /**
   * Render the component's HTML
   *
   * @returns {void}
   */
  render() {
    return (
      <div className={styles.sampleToolbar}>
        <span style={{ fontWeight: 700 }} onClick={this.setFontWeight.bind(this)}>B</span>
        <span style={{ fontStyle: 'italic' }} onClick={this.setFontStyle.bind(this)}>I</span>
        <span>
          <select name="" id="" onChange={this.selectFontSize.bind(this)}>{
            fontSizeSettingList.map((size) => {
              return <option value={size}>{size} px</option>
            })
          }
          </select>
        </span>

      </div >
    )
  }
}


