/// <reference types="vite/client" />

declare namespace JSX {
  type Element = string;
  interface IntrinsicElements {
    [eleName: string]: any;
  }
}
