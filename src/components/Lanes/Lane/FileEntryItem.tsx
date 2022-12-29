import { useCallback, useMemo } from "react";
import { useFileTreeStore } from "../../../domains/FileEntry/hooks/useFileTreeStore";
import { FileEntry } from "../../../domains/FileEntry/models/FileEntry";
import { Folder } from "../../../domains/FileEntry/models/Folder";
import { File } from "../../../domains/FileEntry/models/File";
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
  const currentSelected = useMemo(
    () => path[path.length - 1].name === fileEntry.name,
    [path, fileEntry]
  );
  const selectedBefore = useMemo(
    () => path[depth + 1] === fileEntry,
    [depth, fileEntry, path]
  );

  const Icon = useMemo(() => {
    if (fileEntry instanceof Folder) return () => <FolderIcon />;
    if (fileEntry instanceof File) return () => <FileIcon />;
    return () => null;
  }, [fileEntry]);

  return (
    <Container
      data-testid="top-child"
      onClick={onClick}
      currentSelected={currentSelected}
      selectedBefore={selectedBefore}
    >
      <Icon />
      <ItemName currentSelected={currentSelected}>{fileEntry.name}</ItemName>
      {fileEntry instanceof Folder && <NextIcon selected={currentSelected} />}
    </Container>
  );
};

type ContainerProps = {
  currentSelected: boolean;
  selectedBefore: boolean;
};
const Container = styled.li<ContainerProps>`
  display: flex;
  align-items: center;
  padding: 3px;
  background-color: ${(props) =>
    props.currentSelected
      ? props.theme.color.blue400
      : props.selectedBefore
      ? props.theme.color.ink300
      : "unset"};
  border-radius: 6px;
  cursor: pointer;
`;

type ItemNameProps = {
  currentSelected: boolean;
};
const ItemName = styled.span<ItemNameProps>`
  margin-left: 4px;
  font-size: 0.875em;
  color: ${(props) =>
    props.currentSelected
      ? props.theme.color.ink100
      : props.theme.color.ink700};
  width: 80%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  vertical-align: middle;
`;

const FileIcon = styled(TbFile)`
  color: ${(props) => props.theme.color.ink700};
  fill: ${(props) => props.theme.color.ink100};
  vertical-align: middle;
`;

const FolderIcon = styled(TbFolder)`
  color: ${(props) => props.theme.color.ink700};
  fill: ${(props) => props.theme.color.skyblue};
  vertical-align: middle;
`;

type NextIconProps = {
  selected: boolean;
};
const NextIcon = styled(TbChevronRight)<NextIconProps>`
  width: 0.6em;
  vertical-align: middle;
  margin-left: auto;
  color: ${(props) => (props.selected ? props.theme.color.ink100 : props)};
`;
