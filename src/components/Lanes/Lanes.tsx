import { useCallback, KeyboardEvent } from "react";
import styled from "styled-components";
import { useFileTreeStore } from "../../domains/FileEntry/hooks/useFileTreeStore";
import { Folder } from "../../domains/FileEntry/models/Folder";
import { File } from "../../domains/FileEntry/models/File";
import { Lane } from "./Lane/Lane";
import { FilePreview } from "./Lane/FilePreview";

export const Lanes = () => {
  const path = useFileTreeStore((state) => state.path);
  const { goToParent, goToChild, goToSibling } = useFileTreeStore((state) => ({
    goToParent: state.goToParent,
    goToChild: state.goToChild,
    goToSibling: state.goToSibling,
  }));

  const onKeyDown = useCallback((e: KeyboardEvent<HTMLUListElement>) => {
    const ALLOWED_KEYS = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
    if (!ALLOWED_KEYS.includes(e.code)) return;
    e.preventDefault();
    if (e.code === "ArrowLeft") return goToParent();
    if (e.code === "ArrowRight") return goToChild();
    if (e.code === "ArrowUp") return goToSibling("prev");
    if (e.code === "ArrowDown") return goToSibling("next");
  }, []);

  return (
    <Conatiner tabIndex={0} onKeyDown={onKeyDown}>
      {path &&
        path.map((entry, index) => {
          if (entry instanceof Folder)
            return <Lane key={index} depth={index} folder={entry as Folder} />;
          if (entry instanceof File)
            return <FilePreview key={index} file={entry as File} />;
          return null;
        })}
    </Conatiner>
  );
};

const Conatiner = styled.section`
  display: flex;
  height: 100%;
  width: ${(props) => `calc(100vw - ${props.theme.layout.sidebarWidth})`};
  overflow-x: scroll;
  outline: none;
`;
