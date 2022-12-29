import styled from "styled-components";
import { TbSearch } from "react-icons/tb";
import { IoCloseCircleSharp } from "react-icons/io5";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useFileTreeStore } from "../../../domains/FileEntry/hooks/useFileTreeStore";
import { FileEntry } from "../../../domains/FileEntry/models/FileEntry";
import { HighlightedText } from "../HighlightedText/HighlightedText";

export const SearchBar = () => {
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [keyword, setKeyword] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { search } = useFileTreeStore((state) => ({ search: state.search }));
  const [searchResult, setSearchResult] = useState<FileEntry[]>([]);

  const reset = () => {
    setIsFocused(false);
    setKeyword("");
    setSearchResult([]);
  };
  const onClick = useCallback((e: PointerEvent) => {
    if (!searchBoxRef.current) return;
    const target = e.target;
    const isTargetChildren = searchBoxRef.current.contains(target as Element);
    if (isTargetChildren) return;
    reset();
  }, []);

  useEffect(() => {
    if (!isFocused) return;
    document.addEventListener("pointerdown", onClick);
    return () => {
      document.removeEventListener("pointerdown", onClick);
    };
  }, [isFocused]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setKeyword(keyword);
    setSearchResult(search(keyword));
  };

  const onSearchIconClick = useCallback(() => setIsFocused(true), []);

  const onClearButtonClick = useCallback(() => {
    setKeyword("");
    inputRef.current?.focus();
  }, []);

  return (
    <Container>
      <label htmlFor="search">
        <SearchIcon role="button" title="search" onClick={onSearchIconClick} />
      </label>
      <SearchBox ref={searchBoxRef} focused={isFocused}>
        <PlaceholderIcon />
        <SearchInput
          id="search"
          type="text"
          role="searchbox"
          placeholder="검색"
          autoFocus
          ref={inputRef}
          value={keyword}
          onChange={onInputChange}
        />
        {keyword.length > 0 && <ClearIcon onClick={onClearButtonClick} />}
        {searchResult.length > 0 && (
          <SearchResult>
            {searchResult.map((fileEntry) => (
              <ResultItem key={fileEntry.name}>
                <ResultItemName>
                  <HighlightedText target={fileEntry.name} keyword={keyword} />
                </ResultItemName>
                <ResultItemPath>{fileEntry.getPath()}</ResultItemPath>
              </ResultItem>
            ))}
          </SearchResult>
        )}
      </SearchBox>
    </Container>
  );
};

type Props = {
  focused: boolean;
};
const Container = styled.div`
  position: relative;
`;
const SearchIcon = styled(TbSearch)`
  font-size: 1.2em;
  color: ${(props) => props.theme.color.ink500};
  margin: 5px;
  vertical-align: middle;
  cursor: pointer;
  :hover {
    color: ${(props) => props.theme.color.ink500};
  }
`;

const SearchBox = styled.div<Props>`
  display: ${(props) => (props.focused ? "block" : "none")};
  position: absolute;
  top: 0;
  right: 0;
  width: 270px;
  border-radius: 6px;
  background-color: ${(props) => props.theme.color.ink300};
  padding: 4px;
  animation-name: slidein;
  animation-duration: 0.3s;
  transform-origin: center right;
  border: 3px solid ${(props) => props.theme.color.blue100};

  @keyframes slidein {
    from {
      transform: scaleX(0);
      border: none;
    }
    to {
      transform: scaleX(1);
      border: 3px solid ${(props) => props.theme.color.blue100};
    }
  }
`;
const PlaceholderIcon = styled(TbSearch)`
  margin: 2px;
  font-size: 1em;
  color: ${(props) => props.theme.color.ink500};
  vertical-align: middle;
`;
const SearchInput = styled.input`
  width: 84%;
  background-color: ${(props) => props.theme.color.ink300};
  border: none;
  &::placeholder {
    color: ${(props) => props.theme.color.ink400};
  }
`;
const ClearIcon = styled(IoCloseCircleSharp)`
  margin: 2px;
  font-size: 1em;
  color: ${(props) => props.theme.color.ink500};
  vertical-align: middle;
  cursor: pointer;
`;

const SearchResult = styled.ul`
  position: absolute;
  width: 100%;
  bottom: -10px;
  transform: translate3d(0, 100%, 0);
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.color.ink300};
  padding: 8px;
  border-radius: 8px;
  border: 0.5px solid ${(props) => props.theme.color.ink400};
  box-shadow: 1px 2px 10px ${(props) => props.theme.color.ink400};
`;

const ResultItem = styled.li`
  padding: 4px 8px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.color.blue400};
    border-radius: 4px;
    color: ${(props) => props.theme.color.ink100};
  }
`;

const ResultItemName = styled.p`
  font-size: 0.875em;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-all;
`;

const ResultItemPath = styled.p`
  font-size: 0.8em;
  color: ${(props) => props.theme.color.ink400};
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-all;
  margin-top: 2px;
`;
