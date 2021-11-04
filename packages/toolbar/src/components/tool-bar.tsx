import { IOptions } from "../data/options";
import { $$, IProps } from "@richx/core";
import styles from "./tool-bar.module.less";
import { Component } from "@richx/core";
/**
 * toolbar
 */
interface IToolBarProps extends IProps {

}

export class ToolBarComponent extends Component {
  constructor() {
    super()
    console.log('tool');
  }

  /**
   * Render the component's HTML
   *
   * @returns {void}
   */
  render() {
    return (
      <div className={styles.sampleToolbar}>
        <div className="">B</div>
        <span style={{ fontStyle: 'italic' }}>I</span>
        <span className="" aria-hidden="true"></span>
        <span className="" aria-hidden="true"></span>
        <span className="" aria-hidden="true"></span>

      </div>
    )
  }
}