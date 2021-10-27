import { ToolBarComponent } from "./components/tool-bar";

interface IProps {
  container: HTMLElement | string;
}
export class ToolBar {
  _container: HTMLElement;

  constructor(props: IProps) {
    const { container } = props;
    this._container =
      typeof container === "string"
        ? document.querySelector(container)
        : container;

    new ToolBarComponent().appendTo(this._container);
  }
}
