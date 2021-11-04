import { ToolBarComponent } from "./components/tool-bar";
import ReactDOM from "react-dom";

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

    console.log(ReactDOM.render, "render");

    // new ToolBarComponent().appendTo(this._container);
    ReactDOM.render(new ToolBarComponent().getElement(), this._container);

    // render()
  }
}
