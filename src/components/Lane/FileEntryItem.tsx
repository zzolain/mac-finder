import { useCallback, useMemo } from "react";
import { useFileTreeStore } from "../../domains/FileEntry/hooks/useFileTreeStore";
import { FileEntry } from "../../domains/FileEntry/models/FileEntry";
import { Folder } from "../../domains/FileEntry/models/Folder";
import { File } from "../../domains/FileEntry/models/File";
import styled from "styled-components";
import { TbFolder, TbFile, TbChevronRight } from "react-icons/tb";

type Props = {
  depth: number;
  fileEntry: FileEntry;
};
export const FileEntryItem = ({ depth, fileEntry }: Props) => {
  const { select, path } = useFileTreeStore((state) => ({
    select: state.select,
    path: state.path,
  }));
  const onClick = useCallback(
    () => select(depth, fileEntry),
    [depth, fileEntry]
  );
  const isSelected = useMemo(
    () => path[depth + 1] === fileEntry,
    [depth, fileEntry, path]
  );

  const Icon = useMemo(() => {
    if (fileEntry instanceof Folder) return () => <FolderIcon />;
    if (fileEntry instanceof File) return () => <FileIcon />;
    return () => null;
  }, [fileEntry]);

  const SideIcon = useMemo(() => {
    if (fileEntry instanceof Folder)
      return () => <NextIcon selected={isSelected} />;
    return () => null;
  }, [fileEntry]);
  return (
    <Container data-testid="top-child" onClick={onClick} selected={isSelected}>
      <Icon />
      <ItemName selected={isSelected}>{fileEntry.name}</ItemName>
      <SideIcon />
    </Container>
  );
};

type ContainerProps = {
  selected: boolean;
};
const Container = styled.li<ContainerProps>`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px;
  background-color: ${(props) =>
    props.selected ? "var(--color-blue)" : "none"};
  border-radius: 6px;
  cursor: pointer;
  span {
    font-size: 0.9em;
  }
`;

type ItemNameProps = {
  selected: boolean;
};
const ItemName = styled.span<ItemNameProps>`
  color: ${(props) =>
    props.selected ? "var(--color-ink100)" : "var(--color-ink700)"};
`;

const FileIcon = styled(TbFile)`
  color: var(--color-ink700);
  fill: var(--color-ink100);
  vertical-align: middle;
`;

const FolderIcon = styled(TbFolder)`
  color: var(--color-ink700);
  fill: var(--color-skyblue);
  vertical-align: middle;
`;

type NextIconProps = {
  selected: boolean;
};
const NextIcon = styled(TbChevronRight)<NextIconProps>`
  width: 0.6em;
  vertical-align: middle;
  margin-left: auto;
  color: ${(props) =>
    props.selected ? "var(--color-ink100)" : "var(--color-ink400)"};
`;
