import { IRichTextData, Plugin, RichText } from "@richx/core";
import { ToolBarComponent } from "./components/tool-bar";

interface IProps {
  container: HTMLElement | string;
}
export class ToolBar extends Plugin {
  _container: HTMLElement;

  constructor(props: IProps) {
    super("toolbar");
    const { container } = props;
    this._container =
      typeof container === "string"
        ? (document.querySelector(container) as HTMLElement)
        : container;
  }

  start(): void {
    this._container.appendChild(
      new ToolBarComponent({ core: this.core }).getElement()
    );
  }
}
