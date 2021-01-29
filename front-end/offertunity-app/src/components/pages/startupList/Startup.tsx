import React, { useState } from "react";
import styled from "styled-components";
import CardList from "./CardList";
import Title from "./Title";
import SelectBtn from "components/common/button/selectBtn/SelectBtn";
import * as St from "../../styles/styledComp";
import Search from "../../common/search/Search";

const Startup = ({ data, itemsPerPage, page }: any) => {
  const [searchValue, setSearchValue] = useState<string>();
  const onKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      /*
      axios get */
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };
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
        background={"contain"}
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
