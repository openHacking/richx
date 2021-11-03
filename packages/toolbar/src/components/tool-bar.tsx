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
        <span style={{ fontWeight: '700' }}><svg width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M13 24h12a8 8 0 100-16H13.2a.2.2 0 00-.2.2V24zm0 0h16a8 8 0 110 16H13.2a.2.2 0 01-.2-.2V24z" stroke="#4E5969" stroke-width="4" /></svg></span>
        <span style={{ fontStyle: 'italic' }}>I</span>
        <span class="" aria-hidden="true"></span>
        <span class="" aria-hidden="true"></span>
        <span class="" aria-hidden="true"></span>

      </div>
    )
  }
}