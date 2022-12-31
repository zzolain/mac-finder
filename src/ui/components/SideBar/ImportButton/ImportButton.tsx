import { useFileTreeStore } from "../../../../domains/FileEntry/hooks/useFileTreeStore";
import styled from "styled-components";
import { TbFileImport } from "react-icons/tb";

export const ImportButton = () => {
  const read = useFileTreeStore((state) => state.read);
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      read(file);
    }
    e.target.value = "";
  };
  return (
    <Container>
      <Label htmlFor="json-input" role="button">
        <TbFileImport className="icon" />
        <Title>Import</Title>
      </Label>
      <HiddenInput
        id="json-input"
        type="file"
        data-testid="json-input"
        multiple={false}
        accept="application/json"
        onChange={onFileChange}
      />
    </Container>
  );
};

const Container = styled.div``;
const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${(props) => props.theme.color.ink600};
  background-color: ${(props) => props.theme.color.ink300};
  padding: 0.4em;
  border-radius: 0.4em;
  cursor: pointer;
  &:hover {
    filter: brightness(90%);
  }
  .icon {
    color: ${(props) => props.theme.color.blue400};
    vertical-align: middle;
    width: 1.2em;
    height: 1.2em;
  }
`;
const Title = styled.p`
  font-size: 0.9em;
  color: ${(props) => props.theme.color.ink600};
`;

const HiddenInput = styled.input`
  display: none;
`;
