import { FileEntry } from "./FileEntry";

export class File extends FileEntry {
  constructor(name: string, parent: FileEntry | null, public content: string) {
    super(name, parent);
  }

  search(_: string): FileEntry[] {
    return [];
  }
}
