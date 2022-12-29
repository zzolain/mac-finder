import styled from "styled-components";
import { AiFillGithub } from "react-icons/ai";

const URL = "https://github.com/zzolain/mac-finder";
export const GithubLink = () => {
  const onClick = () => {
    window.open(URL, "_blank");
  };

  return (
    <Container onClick={onClick}>
      <GithubIcon />
      <Title>Github</Title>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 0.4em;
  border-radius: 0.4em;
  background-color: ${(props) => props.theme.color.ink300};
  cursor: pointer;
  &:hover {
    filter: brightness(90%);
  }
`;

const GithubIcon = styled(AiFillGithub)`
  color: ${(props) => props.theme.color.blue400};
  vertical-align: middle;
  width: 1.2em;
  height: 1.2em;
`;

const Title = styled.p`
  font-size: 0.9em;
  color: ${(props) => props.theme.color.ink600};
`;
