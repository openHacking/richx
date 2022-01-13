import "./style.less";

import { IRichTextSettingData, RichText } from "@richx/core";
import { ToolBar } from ".";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <div id="rich"></div>
`;

// stored rich text json data
export const richTextSettingJson: IRichTextSettingData[] = [
  {
    type: "font-family",
    value: "Arial",
    selection: [
      [1, 4],
      [6, 7],
    ],
  },
  // {
  //     type: 'font-size',
  //     value: 20,
  //     selection: [
  //         [1, 4],
  //         [6, 7],
  //     ],
  // },
  {
    type: "font-size",
    value: 12,
    selection: [[8, 9]],
  },
  {
    type: "font-style",
    value: "italic",
    selection: [
      [1, 4],
      [6, 7],
    ],
  },
  // {
  //     type: 'font-weight',
  //     value: 'bold',
  //     selection: [[4, 6]],
  // },
  // {
  //     type: 'text-decoration',
  //     value: 'line-through',
  //     selection: [
  //         [1, 3],
  //         [7, 9],
  //     ],
  // },
  // {
  //     type: 'color',
  //     value: 'red',
  //     selection: [
  //         [2, 3],
  //         [5, 6],
  //     ],
  // },
  // {
  //     type: 'color',
  //     value: 'green',
  //     selection: [[7, 7]],
  // },
  // {
  //     type: 'background',
  //     value: 'orange',
  //     selection: [
  //         [0, 2],
  //         [8, 9],
  //     ],
  // },
];

export const richTextJson = {
  text: "Simple Rich Text Demo,",
  setting: richTextSettingJson,
};

new RichText({
  container: "#rich",
  text: richTextJson,
  plugins: [new ToolBar({ container: "#toolbar" })],
});
