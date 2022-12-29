import styled from "styled-components";
import { Folder } from "../../../domains/FileEntry/models/Folder";
import { FileEntryItem } from "./FileEntryItem";
import { useRef, useCallback, useState } from "react";
import { useEffect } from "react";

const MIN_WIDTH = 200;

type Props = {
  depth: number;
  folder: Folder;
};
export const Lane = ({ depth, folder: fileEntry }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const onPointerDown = () => setIsDragging(true);
  const onPointerUp = () => setIsDragging(false);
  const onPointerMove = (e: PointerEvent) => {
    if (!isDragging) return;
    if (!containerRef.current) return;
    const width = e.clientX - containerRef.current.offsetLeft;
    if (width > MIN_WIDTH) {
      containerRef.current.style.width = `${width}px`;
    }
  };

  const addListeners = useCallback(() => {
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  }, [onPointerMove, onPointerUp]);

  const cleanUpListeners = useCallback(() => {
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
  }, [onPointerMove, onPointerUp]);

  useEffect(() => {
    if (isDragging) {
      addListeners();
    }
    return cleanUpListeners;
  }, [isDragging, onPointerMove, onPointerUp]);

  return (
    <Container ref={containerRef}>
      <Content>
        {fileEntry.getChildren().map((child) => (
          <FileEntryItem key={child.name} depth={depth} fileEntry={child} />
        ))}
      </Content>
      <Border onPointerDown={onPointerDown} />
    </Container>
  );
};

const Container = styled.div`
  min-width: ${MIN_WIDTH}px;
  height: 100%;
  display: flex;
`;

const Content = styled.ul`
  flex: 1;
  padding: 10px;
`;
const Border = styled.div`
  width: 1px;
  background-color: var(--color-ink300);
  cursor: col-resize;
`;
