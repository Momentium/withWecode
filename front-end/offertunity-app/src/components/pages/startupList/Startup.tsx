import React from "react";
import styled from "styled-components";
import CardList from "./CardList";

const Startup = ({ data }: any) => {
  return (
    <StartupBox>
      <CardList list={data} name={"startupList"} />
    </StartupBox>
  );
};

export default Startup;

const StartupBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0px 13.875rem;
`;
