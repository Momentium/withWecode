import React from "react";
import styled from "styled-components";
import CardList from "./CardList";
import Title from "./Title";
import SelectBtn from "components/common/button/selectBtn/SelectBtn";
import * as St from "../../styles/styledComp";

const Startup = ({ data, itemsPerPage, page }: any) => {
  return (
    <StartupBox>
      <StCont className="filter-cont">
        <Title title={"스타트업"} />
        <RightBox>
          <SearchBox>
            <input type="text" />
            <i className="fas fa-search" />
          </SearchBox>
          <SelectBtn curPage={"project"} category={"date"} />
          <SelectBtn curPage={"project"} category={"support"} />
          <SelectBtn curPage={"project"} category={"establish"} />
        </RightBox>
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

const SearchBox = styled.div`
  display: inline-block;
  position: relative;
  margin-right: 10px;

  input {
    width: 11.75rem;
    height: 2rem;
    border-radius: 5px;
    border: 1px solid #d8d8d8;
    box-sizing: border-box;
    padding: 4px 6px 4px 30px;
    &:focus {
      outline: none;
    }
  }

  i {
    position: absolute;
    top: 0.5rem;
    left: 0.62rem;
    color: #707070;
  }
`;
