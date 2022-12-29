import styled from "styled-components";
import ImportButton from "./ImportButton";
import GithubLink from "./GithubLink";

export const Sidebar = () => {
  return (
    <Container>
      <SystemButtonContainer>
        <SystemButton color="red" />
        <SystemButton color="yellow" />
        <SystemButton color="green" />
      </SystemButtonContainer>
      <Section>
        <SectionLabel>Favorite</SectionLabel>
        <ImportButton />
        <GithubLink />
      </Section>
    </Container>
  );
};

const Container = styled.div`
  flex: 0 0 auto;
  width: ${(props) => props.theme.layout.sidebarWidth};
  background-color: ${(props) => props.theme.color.ink300};
  padding: 10px;
  border-right: 0.5px solid ${(props) => props.theme.color.ink400};
  height: 100%;
`;

const SystemButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 10px;
`;

type SystemButtonProps = {
  color: "red" | "yellow" | "green";
};
const SystemButton = styled.div<SystemButtonProps>`
  background-color: ${(props) => props.theme.color[props.color]};
  width: 12px;
  height: 12px;
  border-radius: 50%;
  position: relative;
  &:after {
    content: "";
    position: absolute;
    border-radius: 50%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    border: 0.5px solid rgba(150, 150, 150, 0.4);
  }
  &:hover {
    filter: brightness(70%);
    cursor: pointer;
  }
`;

const Section = styled.section`
  margin-top: 15px;
`;

const SectionLabel = styled.h5`
  font-size: 0.8em;
  font-weight: 600;
  color: ${(props) => props.theme.color.ink500};
  padding: 2px 8px;
`;
