import styled from "styled-components";
import { File } from "../../domains/FileEntry/models/File";

type Props = {
  file: File;
};
export const FilePreview = ({ file }: Props) => {
  return (
    <Container>
      <ContentContainer>
        <Content>{file.content}</Content>
      </ContentContainer>
      <FileName>{file.name}</FileName>
      <Path>{file.getPath()}</Path>
    </Container>
  );
};

const Container = styled.div`
  padding: 10px;
`;

const ContentContainer = styled.div`
  border: 0.5px solid var(--color-ink400);
  border-radius: 5px;
  padding: 0.4em 0.6em;
  overflow: scroll;
  min-height: 250px;
  margin-bottom: 25px;
`;

const Content = styled.code`
  font-size: 0.8em;
  line-height: 1.2;
  white-space: pre-line;
`;

const FileName = styled.h2`
  color: var(--color-ink600);
  font-weight: 600;
  font-size: 1.2em;
  line-height: 1.7;
`;

const Path = styled.p`
  color: var(--color-ink400);
`;
