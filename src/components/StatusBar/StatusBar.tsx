import styled from "styled-components";
import { TbChevronLeft, TbChevronRight, TbSearch } from "react-icons/tb";
import { useFileTreeStore } from "../../domains/FileEntry/hooks/useFileTreeStore";
import { useMemo } from "react";

export const StatusBar = () => {
  const { path, goToParent, goToChild } = useFileTreeStore((state) => ({
    path: state.path,
    goToParent: state.goToParent,
    goToChild: state.goToChild,
  }));
  const entryName = useMemo(
    () => path[path.length - 1]?.name ?? "Recent",
    [path]
  );

  const onClickLeftButton = () => goToParent();
  const onClickRightButton = () => goToChild();

  return (
    <Container>
      <LeftCol>
        <LeftIcon
          onClick={onClickLeftButton}
          role="button"
          title="move to the parent"
        />
        <RightIcon
          onClick={onClickRightButton}
          role="button"
          title="move to the first child"
        />
        <EntryName>{entryName}</EntryName>
      </LeftCol>
      <RightCol>
        <SearchIcon role="button" title="search" />
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
`;

const LeftCol = styled.div`
  display: flex;
  align-items: center;
`;

const LeftIcon = styled(TbChevronLeft)`
  font-size: 24px;
  color: var(--color-ink400);
  margin: 5px;
  vertical-align: middle;
  cursor: pointer;
  :hover {
    color: var(--color-ink500);
  }
`;

const RightIcon = styled(TbChevronRight)`
  font-size: 24px;
  color: var(--color-ink400);
  margin: 5px;
  vertical-align: middle;
  cursor: pointer;
  :hover {
    color: var(--color-ink500);
  }
`;
const EntryName = styled.span`
  color: var(--color-ink600);
  font-weight: 600;
`;

const RightCol = styled.div`
  display: flex;
  align-items: center;
`;

const SearchIcon = styled(TbSearch)`
  font-size: 20px;
  color: var(--color-ink400);
  margin: 5px;
  vertical-align: middle;
  cursor: pointer;
  :hover {
    color: var(--color-ink500);
  }
`;
