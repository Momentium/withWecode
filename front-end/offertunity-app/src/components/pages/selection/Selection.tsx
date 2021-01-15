import React, { MouseEvent, useEffect, useState } from "react";
import styled from "styled-components";
import Title from "./Title";
import Tabs from "./Tabs";
import Cards from "./Cards";

const Selection = () => {
  const [companyData, setCompanyData] = useState<any[]>([]);
  const [filter, setFilter] = useState<String | null>("플랫폼");

  const handleClickTab = (event: React.MouseEvent<HTMLButtonElement>) => {
    const currText = (event.target as HTMLButtonElement).textContent;
    setFilter(currText);
  };

  useEffect(() => {
    fetch("/data/selection.json")
      .then((res) => res.json())
      .then((res) => setCompanyData(res.platform));
  }, []);

  useEffect(() => {
    const filtered = companyData.map((data) => ({
      ...data,
      filtered: data.label.includes(filter),
    }));
    setCompanyData(filtered);
  }, [filter]);

  return (
    <Selections>
      <Title title={"스타트업 셀렉션"} />
      <Tabs handleClickTab={handleClickTab} />
      <CardContainer>
        {companyData.map((companyCard: any, idx: number) =>
          companyCard.filtered === true ? (
            <Cards data={companyCard} key={idx} />
          ) : (
            ""
          )
        )}
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
