import styled from "styled-components";
import { Folder } from "../../../../domains/FileEntry/models/Folder";
import { FileEntryItem } from "./FileEntryItem";
import { useRef } from "react";
import { useDrag } from "../../../hooks/useDrag";

const MIN_WIDTH = 200;

type Props = {
  depth: number;
  folder: Folder;
};
export const Lane = ({ depth, folder: fileEntry }: Props) => {
  const containerRef = useRef<HTMLUListElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);

  const onBorderDrag = (e: PointerEvent) => {
    if (!containerRef.current) return;
    const scrollLeft = containerRef.current.parentElement?.scrollLeft ?? 0;
    const pointerX = e.clientX;
    const offsetLeft = containerRef.current.offsetLeft;
    const width = pointerX + scrollLeft - offsetLeft;
    if (width > MIN_WIDTH) {
      containerRef.current.style.flex = `0 0 ${width}px`;
    }
  };
  const _ = useDrag(borderRef, onBorderDrag);

  return (
    <Container ref={containerRef}>
      {fileEntry.getChildren().map((child) => (
        <FileEntryItem key={child.name} depth={depth} fileEntry={child} />
      ))}
      <Border ref={borderRef} />
    </Container>
  );
};

const Container = styled.ul`
  flex: 0 0 ${MIN_WIDTH}px;
  min-width: ${MIN_WIDTH}px;
  height: 100%;
  padding: 10px;
  position: relative;
`;
const Border = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 1px;
  background-color: ${(props) => props.theme.color.ink300};
  cursor: col-resize;
`;
