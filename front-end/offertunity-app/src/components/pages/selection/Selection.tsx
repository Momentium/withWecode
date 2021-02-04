import React, { MouseEvent, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Title from "./Title";
import Tabs from "./Tabs";
import Cards from "./Cards";
import MoreBtn from 'components/common/button/iconBtn/MoreBtn';

const Selection = () => {
  const [companyData, setCompanyData] = useState<any[]>([]);
  const [cardList, setCardList] = useState<JSX.Element[]>([]);
  const [view, setView] = useState<boolean[]>([]);
  const [filter, setFilter] = useState<String | any>("플랫폼");

  const handleClickTab = (event: React.MouseEvent<HTMLButtonElement>) => {
    const currText = (event.target as HTMLButtonElement).textContent;
    setFilter(currText);
  };

  useEffect(() => {
    axios.get("data/selection.json").then((res) => {
      const data = res.data.platform;
      setCompanyData(data);
      setCardList(
        data.map((el: any, idx: number) => <Cards key={el.idx} data={el} />)
      );
      setView(data.map((el: any, idx: number) => el.label.includes(filter)));
    });
  }, []);

  useEffect(() => {
    setView(
      view.map((el: boolean, idx: number) =>
        companyData[idx].label.includes(filter) ? true : false
      )
    );
  }, [filter]);

  return (
    <Selections>
      <StTopCont>
        {/* <Title title={"스타트업 셀렉션"} /> */}
        <StTitle>스타트업 셀렉션</StTitle>

        <MoreBtn txt={'더 많은 스타트업 보기'} toLink={'/startup'}/>
      </StTopCont>
      <Tabs handleClickTab={handleClickTab} />
      <CardContainer>
        {cardList.filter((el: JSX.Element, idx: number) => view[idx])}
      </CardContainer>
    </Selections>
  );
};

export default Selection;

const Selections = styled.section`
  ${({ theme }) => theme.conWidth}
`;

const StTopCont = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StTitle = styled.span`
  font-size:1.68rem;
  font-weight:bold;
  
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;
