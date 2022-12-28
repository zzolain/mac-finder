import styled from "styled-components";
import { useFileTreeStore } from "../../domains/FileEntry/hooks/useFileTreeStore";

export const ImportButton = () => {
  const read = useFileTreeStore((state) => state.read);
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target?.files && e.target.files[0]) {
      read(e.target.files[0]);
    }
  };
  return (
    <Container>
      <Label htmlFor="json-input" role="button">
        Import
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
  display: inline-block;
  color: var(--color-ink600);
  background-color: var(--color-ink200);
  padding: 0.4em 0.8em;
  border-radius: 0.4em;
  cursor: pointer;
  &:hover {
    background-color: var(--color-ink300);
  }
`;
const HiddenInput = styled.input`
  display: none;
`;
