import { IRichTextData } from "@richx/core";
import { ToolBarComponent } from "./components/tool-bar";

interface IProps {
  container: HTMLElement | string;
  text?: IRichTextData;
}
export class ToolBar {
  _container: HTMLElement;

  constructor(props: IProps) {
    const { container, text } = props;
    this._container =
      typeof container === "string"
        ? document.querySelector(container)
        : container;

    // this._container.appendChild(<ToolBarComponent />);
    this._container.appendChild(new ToolBarComponent(text).getElement());

  }
}
