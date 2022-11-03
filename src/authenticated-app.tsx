import React from "react";
import { ProjectListScreen } from "screens/project-list";
import { useAuth } from "context/auth-context";
import styled from "@emotion/styled";

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <Container>
      <Header>
        <HeaderLeft>
          <h3>logo</h3>
          <h3>项目</h3>
          <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={logout}>登出</button>
        </HeaderRight>
      </Header>
      <Nav>nav</Nav>
      <Main>
        <ProjectListScreen />
      </Main>
      <Sider>sider</Sider>
      <Footer>footer</Footer>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-columns: 20rem 1fr 20rem;
  grid-template-areas:
    "header header header"
    "nav main sider"
    "footer footer footer";
  height: 100vh;
  /* background-color: black; */
  grid-gap: 20px;
`;
const Header = styled.div`
  grid-area: header;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;
const HeaderRight = styled.div``;
const Nav = styled.div`
  grid-area: nav;
`;
const Main = styled.div`
  grid-area: main;
`;
const Sider = styled.div`
  grid-area: sider;
`;
const Footer = styled.div`
  grid-area: footer;
`;
