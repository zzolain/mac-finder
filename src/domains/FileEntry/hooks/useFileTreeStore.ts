import create from "zustand";
import { z } from "zod";
import { isAlaphanumeric } from "../../../utils/validation/stringValidation";
import { Folder } from "../models/Folder";
import { File as FileLeaf } from "../models/File";

type State = {
  root: Folder | null;
};

type Actions = {
  read: (file: File) => void;
  reset: () => void;
};

const initialState: State = {
  root: null,
};

export const useFileTreeStore = create<State & Actions>((set) => ({
  root: null,

  async read(file: File) {
    try {
      validateFile(file);
      const root = await readFile(file);
      set({ root });
    } catch (error) {
      console.error(error);
    }
  },

  reset() {
    set(initialState);
  },
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
