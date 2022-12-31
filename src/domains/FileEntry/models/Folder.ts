import { File } from "./File";
import { FileEntry } from "./FileEntry";

type FolderChildren = {
  [key: string]: FileEntry;
};
export class Folder extends FileEntry {
  constructor(
    name: string,
    parent: FileEntry | null,
    private children: FolderChildren
  ) {
    super(name, parent);
  }

  add(fileEntry: FileEntry) {
    if (this.children[fileEntry.name])
      throw new Error("The requested folder/file name is duplicated.");
    this.children[fileEntry.name] = fileEntry;
  }

  getChild(name: string): FileEntry | null {
    return this.children[name] ?? null;
  }
  getChildren() {
    return Object.values(this.children).sort((a, b) => {
      if (a instanceof Folder && b instanceof File) {
        return -1;
      }
      if (a instanceof File && b instanceof Folder) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 1;
    });
  }

  search(keyword: string): FileEntry[] {
    return this.getChildren().reduce((result: FileEntry[], child) => {
      const withFromChild = result.concat(child.search(keyword));
      if (!child.name.includes(keyword)) return withFromChild;
      return withFromChild.concat(child);
    }, []);
  }
}
