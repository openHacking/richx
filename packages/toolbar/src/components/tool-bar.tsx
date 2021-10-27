import { IOptions } from "../data/options";
import { $$ } from "@richx/core";
import styles from "../assets/css/main.module.css";
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
      <div>AAAAA</div>
    )
  }
}