import React, { MouseEvent, useEffect, useState } from "react";
import styled from "styled-components";
import Title from "./Title";
import Tabs from "./Tabs";
import Cards from "./Cards";

const Selection = () => {
  const [companyData, setCompanyData] = useState<any[]>([]);
  const [onSelectTab, setOnSelectTab] = useState<Boolean>(false);

  useEffect(() => {
    selectionData();
  }, []);

  const selectionData = () => {
    fetch("/data/selection.json")
      .then((res) => res.json())
      .then((res) => setCompanyData(res.platform));
  };

  const clickHandler = (event: any) => {
    let target = event.target;
    console.log(target);
  };

  return (
    <Selections>
      <Title title={"스타트업 셀렉션"} />
      <Tabs />
      <CardContainer>
        {companyData &&
          companyData.map((companyCard: any, idx: number) => (
            <Cards data={companyCard} key={idx} />
          ))}
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
