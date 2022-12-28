import styled from "styled-components";
import { TbChevronLeft, TbChevronRight, TbSearch } from "react-icons/tb";

export const StatusBar = () => (
  <Container>
    <LeftCol>
      <TbChevronLeft className="icon" />
      <TbChevronRight className="icon" />
      <span>Recent</span>
    </LeftCol>
    <RightCol>
      <TbSearch className="icon" />
    </RightCol>
  </Container>
);

const Container = styled.div`
  background-color: var(--color-ink200);
  height: 50px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 0.5px solid var(--color-ink300);
  .icon {
    font-size: 24px;
    color: var(--color-ink400);
    margin: 5px;
    vertical-align: middle;
    cursor: pointer;
  }
`;

const LeftCol = styled.div`
  display: flex;
  align-items: center;
`;

const RightCol = styled.div`
  display: flex;
  align-items: center;
`;
