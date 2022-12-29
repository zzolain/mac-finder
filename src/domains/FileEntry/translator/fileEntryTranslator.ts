import { z } from "zod";
import { isAlaphanumeric } from "../../../utils/validation/stringValidation";
import { File } from "../models/File";
import { Folder } from "../models/Folder";

export const fileTreeDTO = z.map(
  z.string().refine(isAlaphanumeric),
  z.string()
);
type FileTreeDTO = z.infer<typeof fileTreeDTO>;

export const fileEntryTranslator = {
  fromJSON: (json: JSON) => {
    const dto = jsonToDTO(json);
    return dtoToEntity(dto);
  },
};

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
    const file = new File(entryName, parent, fileContent);
    parent.add(file);
    return parent;
  }

  const duplicatedChild = parent.getChild(entryName);
  if (!duplicatedChild || duplicatedChild instanceof File) {
    const folder = new Folder(entryName, parent, {});
    parent.add(folder);
  }

  return createChildren(
    parent.getChild(entryName) as Folder,
    entryNames,
    fileContent
  );
};
