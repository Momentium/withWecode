import React from "react";
import styled from "styled-components";
import CardList from "./CardList";

const Startup = ({ data, itemsPerPage, page }: any) => {
  return (
    <StartupBox>
      <CardList
        data={data}
        name={"startupList"}
        boxName={"startupBox"}
        itemsPerPage={itemsPerPage}
        page={page}
      />
    </StartupBox>
  );
};

export default Startup;

const StartupBox = styled.div`
  width: 80rem;
`;
