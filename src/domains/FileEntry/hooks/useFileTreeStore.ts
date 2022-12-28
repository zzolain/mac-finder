import create from "zustand";
import { z } from "zod";
import { isAlaphanumeric } from "../../../utils/validation/stringValidation";
import { Folder } from "../models/Folder";
import { File as FileLeaf } from "../models/File";
import { FileEntry } from "../models/FileEntry";

type States = {
  root: Folder | null;
  path: FileEntry[];
};

type Actions = {
  read: (file: File) => void;
  select: (depth: number, fileEntry: FileEntry) => void;
  goToNext: () => void;
  goToPrev: () => void;
  goToSibling: (direction: "prev" | "next") => void;
  reset: () => void;
};

const initialState: States = {
  root: null,
  path: [],
};

export const useFileTreeStore = create<States & Actions>((set, get) => ({
  root: initialState.root,
  path: initialState.path,
  read: async (file: File) => {
    try {
      validateFile(file);
      const root = await readFile(file);
      set({ root, path: [root] });
    } catch (error) {
      console.error(error);
    }
  },
  select: (depth, fileEntry) => {
    const prevDepth = get().path.slice(0, depth + 1);
    set({ path: prevDepth.concat(fileEntry) });
  },
  goToNext: () => {
    const { path } = get();
    if (path.length < 1) return;
    const current = path[path.length - 1];
    if (!(current instanceof Folder)) return;
    const firstChild = current.getChildren()[0];
    set((state) => ({ path: state.path.concat(firstChild) }));
  },
  goToPrev: () => {
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
  reset: () => set(initialState),
}));

const validateFile = (file: File) => {
  if (file.size === 0) throw new Error("잘못된 파일 입니다.");
  if (file.type !== "application/json") throw new Error("잘못된 파일 입니다.");
};

const readFile = (file: File): Promise<Folder> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsText(file);

    fileReader.onerror = (event) => {
      if (!event.target?.error) return;
      reject(event.target.error);
    };

    fileReader.onload = (event) => {
      try {
        if (!event.target?.result || typeof event.target.result !== "string")
          throw new Error("파일을 읽는 데 실패하였습니다.");
        const json = JSON.parse(event.target.result);
        const fileTreeDTO = jsonToDTO(json);
        const root = dtoToEntity(fileTreeDTO);
        resolve(root);
      } catch (error) {
        reject(error);
      }
    };
  });
};

export const fileTreeDTO = z.map(
  z.string().refine(isAlaphanumeric),
  z.string()
);
type FileTreeDTO = z.infer<typeof fileTreeDTO>;

const jsonToDTO = (json: JSON) => {
  return fileTreeDTO.parse(new Map(Object.entries(json)));
};

const dtoToEntity = (dto: FileTreeDTO) => {
  const root = new Folder("root", null, {});
  dto.forEach((value, key) => {
    const fileEntryNames = key.split(".");
    createChildren(root, fileEntryNames, value);
  });
  return root;
};

const createChildren = (
  parent: Folder,
  entryNames: string[],
  fileContent: string
): Folder => {
  const entryName = entryNames.shift();
  if (!entryName) return parent;
  if (entryNames.length === 0) {
    const file = new FileLeaf(entryName, parent, fileContent);
    parent.add(file);
    return parent;
  }

  const duplicatedChild = parent.getChild(entryName);
  if (!duplicatedChild || duplicatedChild instanceof FileLeaf) {
    const folder = new Folder(entryName, parent, {});
    parent.add(folder);
  }

  return createChildren(
    parent.getChild(entryName) as Folder,
    entryNames,
    fileContent
  );
};
