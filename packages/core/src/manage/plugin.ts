import { RichText } from "../components/rich-text";

export abstract class Plugin {
  name: string;
  core!: RichText;
  constructor(name: string) {
    this.name = name;
  }

  init(core: RichText) {
    this.core = core;
  }
  abstract start(): void;
}
