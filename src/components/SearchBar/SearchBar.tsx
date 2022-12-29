import styled from "styled-components";
import { TbSearch } from "react-icons/tb";
import { IoCloseCircleSharp } from "react-icons/io5";
import React, {
  PointerEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export const SearchBar = () => {
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [keyword, setKeyword] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const onClick = useCallback((e: PointerEvent) => {
    if (!searchBoxRef.current) return;
    const target = e.target;
    const isTargetChildren = searchBoxRef.current.contains(target as Element);
    if (isTargetChildren) return;
    setIsFocused(false);
  }, []);

  useEffect(() => {
    if (!isFocused) return;
    document.addEventListener("pointerdown", onClick);
    return () => {
      document.removeEventListener("pointerdown", onClick);
    };
  }, [isFocused]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setKeyword(e.target.value);

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
  width: 220px;
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
  width: 80%;
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
