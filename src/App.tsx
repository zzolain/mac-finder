import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import { useFileTreeStore } from "./domains/FileEntry/hooks/useFileTreeStore";
import StatusBar from "./components/StatusBar";
import { Folder } from "./domains/FileEntry/models/Folder";
import Lane from "./components/Lane";
import { FilePreview } from "./components/Lane/FilePreview";
import { File } from "./domains/FileEntry/models/File";

function App() {
  const path = useFileTreeStore((state) => state.path);

  return (
    <Container>
      <Sidebar />
      <Main>
        <StatusBar />
        <Lanes>
          {path &&
            path.map((entry, index) => {
              if (entry instanceof Folder)
                return (
                  <Lane key={index} depth={index} folder={entry as Folder} />
                );
              if (entry instanceof File)
                return <FilePreview key={index} file={entry as File} />;
              return null;
            })}
        </Lanes>
      </Main>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

const Main = styled.main`
  flex: 1;
`;

const Lanes = styled.section`
  display: flex;
  height: 100%;
`;

export default App;
