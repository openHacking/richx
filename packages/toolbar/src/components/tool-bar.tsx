import { IOptions } from "../data/options";
import { $$ } from "@richx/core";
import styles from "./tool-bar.module.less";
import { Component } from "@richx/core";
/**
 * toolbar
 */
interface IProps {
  element: HTMLElement | string;
}

export class ToolBarComponent extends Component {
  constructor(props: IProps) {
    super()
    console.log('tool');


  }

  /**
   * Render the component's HTML
   *
   * @returns {void}
   */
  render(props: IProps): HTMLElement {
    return (
      <div className={styles.sampleToolbar}>
        <span style={{ fontWeight: '700' }}>B
        </span>
        <span style={{ fontStyle: 'italic' }}>I</span>
        <span class="" aria-hidden="true"></span>
        <span class="" aria-hidden="true"></span>
        <span class="" aria-hidden="true"></span>


      </div>
    )
  }
}