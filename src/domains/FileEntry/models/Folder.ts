import { FileEntry } from "./FileEntry";

type FolderChildren = {
  [key: string]: FileEntry;
};
export class Folder extends FileEntry {
  constructor(
    name: string,
    parent: FileEntry | null,
    public children: FolderChildren
  ) {
    super(name, parent);
  }

  getChild(name: string): FileEntry | null {
    return this.children[name] ?? null;
  }
  getChildren() {
    return Object.values(this.children);
  }
}
