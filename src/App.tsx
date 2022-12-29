import styled from "styled-components";
import Sidebar from "./ui/components/SideBar";
import StatusBar from "./ui/components/StatusBar";
import Lanes from "./ui/components/Lanes";

function App() {
  return (
    <Container>
      <Sidebar />
      <Main>
        <StatusBar />
        <Lanes />
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

export default App;
