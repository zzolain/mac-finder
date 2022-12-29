import styled from "styled-components";
import { Folder } from "../../../domains/FileEntry/models/Folder";
import { FileEntryItem } from "./FileEntryItem";
import { useRef } from "react";
import { useDrag } from "../../../hooks/useDrag";

const MIN_WIDTH = 200;

type Props = {
  depth: number;
  folder: Folder;
};
export const Lane = ({ depth, folder: fileEntry }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);

  const onBorderDrag = (e: PointerEvent) => {
    if (!containerRef.current) return;
    const width = e.clientX - containerRef.current.offsetLeft;
    if (width > MIN_WIDTH) {
      containerRef.current.style.width = `${width}px`;
    }
  };
  const _ = useDrag(borderRef, onBorderDrag);

  return (
    <Container ref={containerRef}>
      <Content>
        {fileEntry.getChildren().map((child) => (
          <FileEntryItem key={child.name} depth={depth} fileEntry={child} />
        ))}
      </Content>
      <Border ref={borderRef} />
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
