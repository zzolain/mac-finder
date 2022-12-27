export abstract class FileEntry {
  constructor(public name: string, public parent: FileEntry | null) {}

  getPath(): string {
    const ROOT_PATH = "/";
    if (!this.parent) return ROOT_PATH;
    return `${this.parent.getPath()}/${this.name}`;
  }
}
