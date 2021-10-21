import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import { Admin } from "../../pages/Admin";
import { Map } from "../../pages/Map";
import { Menu } from "../Menu";

export const Page = () => {
  return (
    <PageWrapper>
      <Menu />
      <PageContent>
        <Switch>
          <Route exact path="/">
            <Map />
          </Route>
        </Switch>
        <Switch>
          <Route path="/admin/:pageId">
            <Admin />
          </Route>
        </Switch>
      </PageContent>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  height: 100vh;
`;

const PageContent = styled.div`
  height: calc(100vh - 90px);
`;
