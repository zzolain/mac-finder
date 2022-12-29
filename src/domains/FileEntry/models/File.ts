import { FileEntry } from "./FileEntry";

export class File extends FileEntry {
  constructor(name: string, parent: FileEntry | null, public content: string) {
    super(name, parent);
  }

  getChild(name: string): FileEntry | null {
    return null;
  }

  search(_: string): FileEntry[] {
    return [];
  }
}
