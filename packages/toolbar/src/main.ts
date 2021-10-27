import "./style.css";

import { RichText } from "@richx/core";
import { ToolBar } from ".";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <div id="rich"></div>
`;
new RichText({
  element: "#rich",
  plugins: [new ToolBar({ container: "#toolbar" })],
});
