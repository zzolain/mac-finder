import styled from "styled-components";
import { TbChevronLeft, TbChevronRight, TbSearch } from "react-icons/tb";
import { useFileTreeStore } from "../../domains/FileEntry/hooks/useFileTreeStore";
import { useMemo } from "react";

export const StatusBar = () => {
  const path = useFileTreeStore((state) => state.path);
  const entryName = useMemo(
    () => path[path.length - 1]?.name ?? "Recent",
    [path]
  );

  return (
    <Container>
      <LeftCol>
        <TbChevronLeft className="icon" />
        <TbChevronRight className="icon" />
        <EntryName>{entryName}</EntryName>
      </LeftCol>
      <RightCol>
        <TbSearch className="icon" />
      </RightCol>
    </Container>
  );
};

const Container = styled.div`
  background-color: var(--color-ink200);
  height: 50px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid var(--color-ink300);
  .icon {
    font-size: 24px;
    color: var(--color-ink400);
    margin: 5px;
    vertical-align: middle;
    cursor: pointer;
  }
`;

const LeftCol = styled.div`
  display: flex;
  align-items: center;
`;

const RightCol = styled.div`
  display: flex;
  align-items: center;
`;

const EntryName = styled.span`
  color: var(--color-ink600);
  font-weight: 600;
`;
