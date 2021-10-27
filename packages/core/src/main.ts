import "./style.css";

import { RichText } from ".";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <div id="rich"></div>
`;
new RichText({
  element: "#rich",
});
