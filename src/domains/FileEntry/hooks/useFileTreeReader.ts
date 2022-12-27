import { z } from "zod";
import { isAlaphanumeric } from "../../../utils/validation/stringValidation";

export const fileTreeDTO = z.map(
  z.string().refine(isAlaphanumeric),
  z.string()
);
type FileTreeDTO = z.infer<typeof fileTreeDTO>;
