import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CardList from "./CardList";
import Title from "./Title";
import SelectBtn from "components/common/button/selectBtn/SelectBtn";
import * as St from "../../../../styles/styledComp";

const Startup = ({ data, itemsPerPage, page }: any) => {
  return (
    <StartupBox>
      <StCont className="filter-cont">
        <Title title={"스타트업"} />
      </StCont>
      <CardList
        data={data}
        name={"startupList"}
        boxName={"startupBox"}
        itemsPerPage={itemsPerPage}
        page={page}
        background={"cover"}
      />
    </StartupBox>
  );
};

export default Startup;

const StartupBox = styled.div`
  width: 80rem;
`;

const StCont = styled(St.FlexDiv)`
  width: 100%;
  justify-content: space-between;
  margin-bottom: 48px;
`;

const RightBox = styled.div`
  display: flex;
  align-items: center;
`;
