import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import { useFileTreeStore } from "./domains/FileEntry/hooks/useFileTreeStore";
import StatusBar from "./components/StatusBar";

function App() {
  const root = useFileTreeStore((state) => state.root);

  return (
    <Container>
      <Sidebar />
      <Main>
        <StatusBar />
        {root &&
          root
            .getChildren()
            .map((child) => <span data-testid="top-child">{child.name}</span>)}
      </Main>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Main = styled.main`
  flex: 1;
`;

export default App;
