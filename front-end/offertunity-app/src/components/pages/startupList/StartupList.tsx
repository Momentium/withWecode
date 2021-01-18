import React from "react";
import TwStartup from "./TwStartup";
import Title from "./Title";
import Card from "./Card";
import Banner from "./Banner";
import CardList from "./CardList";
import PageButton from "./PageButton";
import styled from "styled-components";

const StartupList = () => {
  return (
    <StartupCompanyList>
      <TwStartup>
        <Title />
        <Card />
      </TwStartup>
      <Banner />
      <Startup>
        <Header>
          <Title title={스타트업} />
        </Header>
        <CardList />
        <PageButton />
      </Startup>
    </StartupCompanyList>
  );
};

export default StartupList;

const StartupCompanyList = styled.div`
  color: black;
`;
