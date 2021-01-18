import React, { MouseEvent, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Title from "./Title";
import Tabs from "./Tabs";
import Cards from "./Cards";
import { AnyRecord } from "dns";


const Selection = () => {
  const [companyData, setCompanyData] = useState<any[]>([]);
  const [cardList, setCardList] = useState<JSX.Element[]>([]);
  const [view, setView] = useState<boolean[]>([]);
  const [filter, setFilter] = useState<String | any>("플랫폼");

  // const [filtered, setFiltered] = useState<any[]>([]);

  const handleClickTab = (event: React.MouseEvent<HTMLButtonElement>) => {
    const currText = (event.target as HTMLButtonElement).textContent;
    setFilter(currText);
  };

  useEffect(() => {
    axios.get("data/selection.json")
    .then((res) => {
      const _data = res.data.platform;
      setCompanyData(_data)
      setCardList(_data.map((el: any, idx: number) => 
        <Cards key={el.idx} data={el}/>
      ))
      setView(_data.map((el: any, idx: number) => el.label.includes(filter) ))
    })
  }, []);

  useEffect(() => {
    setView(view.map((el: boolean, idx: number) => 
      companyData[idx].label.includes(filter) ?
      true : false
    ));
  }, [filter])


  return (
    <Selections>
      <Title title={"스타트업 셀렉션"} />
      <Tabs handleClickTab={handleClickTab} />
      <CardContainer>
        {cardList.filter((el: JSX.Element, idx: number) => view[idx])}
      </CardContainer>
    </Selections>
  );
};

export default Selection;

const Selections = styled.section`
  ${({ theme }) => theme.ConWidth}
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;
