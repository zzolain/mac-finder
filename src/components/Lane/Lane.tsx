import styled from "styled-components";
import { Folder } from "../../domains/FileEntry/models/Folder";
import { FileEntryItem } from "./FileEntryItem";

type Props = {
  depth: number;
  folder: Folder;
};
export const Lane = ({ depth, folder: fileEntry }: Props) => {
  return (
    <Container>
      {fileEntry.getChildren().map((child) => (
        <FileEntryItem key={child.name} depth={depth} fileEntry={child} />
      ))}
    </Container>
  );
};

const Container = styled.ul`
  min-width: 200px;
  height: 100%;
  border-right: 0.5px solid var(--color-ink300);
  padding: 10px;
`;
