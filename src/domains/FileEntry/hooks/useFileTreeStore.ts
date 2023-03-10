import create from "zustand";
import toast from "react-hot-toast";
import { ZodError } from "zod";
import { Folder } from "../models/Folder";
import { FileEntry } from "../models/FileEntry";
import { fileEntryTranslator } from "../translator/fileEntryTranslator";
import SAMPLE_JSON from "../../../assets/sample/valid-sample.json";
import { getErrorWithMessage } from "../../../utils/error";

type States = {
  root: Folder | null;
  path: FileEntry[];
};

type Actions = {
  read: (file: File) => void;
  select: (depth: number, fileEntry: FileEntry) => void;
  goToChild: () => void;
  goToParent: () => void;
  goToSibling: (direction: "prev" | "next") => void;
  search: (keyword: string) => FileEntry[];
  getPath: (fileEntry: FileEntry) => FileEntry[];
  jumpTo: (fileEntry: FileEntry) => void;
  reset: () => void;
};

const sampleRoot = fileEntryTranslator.fromJSON(
  JSON.parse(JSON.stringify(SAMPLE_JSON))
);
const initialState: States = {
  root: sampleRoot,
  path: [sampleRoot],
};

export const useFileTreeStore = create<States & Actions>((set, get) => ({
  root: initialState.root,
  path: initialState.path,
  read: async (file: File) => {
    try {
      validateFile(file);
      const root = await readFile(file);
      set({ root, path: [root] });
    } catch (unknownError) {
      const error = getErrorWithMessage(unknownError);
      toast(error.message);
    }
  },
  select: (depth, fileEntry) => {
    const prevDepth = get().path.slice(0, depth + 1);
    set({ path: prevDepth.concat(fileEntry) });
  },
  goToChild: () => {
    const { path } = get();
    if (path.length < 1) return;
    const current = path[path.length - 1];
    if (!(current instanceof Folder)) return;
    const firstChild = current.getChildren()[0];
    set((state) => ({ path: state.path.concat(firstChild) }));
  },
  goToParent: () => {
    const { path } = get();
    if (path.length <= 2) return;
    set((state) => ({ path: state.path.slice(0, state.path.length - 1) }));
  },
  goToSibling: (direction) => {
    const { path } = get();
    const current = path[path.length - 1];
    const siblings = (current.parent as Folder).getChildren();
    const currentIndex = siblings.findIndex(
      (item) => item.name === current.name
    );
    if (currentIndex < 0) return;
    if (direction === "prev" && currentIndex === 0) return;
    if (direction === "next" && siblings.length - 1 === currentIndex) return;
    const prevDepth = path.slice(0, path.length - 1);
    const indexDirection = direction === "prev" ? -1 : +1;
    set({ path: prevDepth.concat(siblings[currentIndex + indexDirection]) });
  },
  search: (keyword) => {
    if (keyword.length < 1) return [];
    const { root } = get();
    if (!root) return [];
    return root.search(keyword);
  },
  getPath: (fileEntry: FileEntry): FileEntry[] => {
    let path = [fileEntry];
    if (!fileEntry.parent) {
      return path;
    }
    return get().getPath(fileEntry.parent).concat(path);
  },
  jumpTo: (fileEntry: FileEntry) => {
    const path = get().getPath(fileEntry);
    set({ path });
  },
  reset: () => set(initialState),
}));

const validateFile = (file: File) => {
  if (file.size === 0) throw new Error("????????? ?????? ?????????.");
  if (file.type !== "application/json") throw new Error("????????? ?????? ?????????.");
};

const readFile = (file: File): Promise<Folder> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsText(file);

    fileReader.onerror = (event) => {
      if (!event.target?.error) return;
      reject(new Error(event.target.error.message));
    };

    fileReader.onload = (event) => {
      try {
        if (!event.target?.result || typeof event.target.result !== "string") {
          throw new Error("????????? ?????? ??? ?????????????????????.");
        }
        const json = JSON.parse(event.target.result) ?? {};
        const root = fileEntryTranslator.fromJSON(json);
        resolve(root);
      } catch (error) {
        console.error(error);
        if (error instanceof SyntaxError || error instanceof ZodError) {
          reject(
            new Error(
              "???????????? ?????? JSON ?????? ?????????.\n\n{\n'folderName.fileName': 'fileContent'\n}\n\n???????????? ??????????????????."
            )
          );
        }
        reject(error);
      }
    };
  });
};
