import React, { MouseEvent, useEffect, useState } from "react";
import styled from "styled-components";
import Title from "./Title";
import Tabs from "./Tabs";
import Cards from "./Cards";
import { Filter } from "@material-ui/icons";
import { JsxElement } from "typescript";

const Selection = () => {
  const [companyData, setCompanyData] = useState<any[]>([]);
  const [filter, setFilter] = useState<String | any>("플랫폼");
  const [filtered, setFiltered] = useState<any[]>([]);

  const handleClickTab = (event: React.MouseEvent<HTMLButtonElement>) => {
    const currText = (event.target as HTMLButtonElement).textContent;
    setFilter(currText);
  };

  useEffect(() => {
    fetch("/data/selection.json")
      .then((res) => res.json())
      .then((res) => setCompanyData(res.platform))
      .then((res) => {
        setFiltered(
          companyData.map((companyCard: any, idx: number) => {
            return companyCard.label.includes(filter) ? (
              <Cards data={companyCard} key={idx} />
            ) : null;
          })
        );
      });
  }, []);

  useEffect(() => {
    console.log(companyData);
    setFiltered(
      companyData.map((companyCard: any, idx: number) => {
        return companyCard.label.includes(filter) ? (
          <Cards data={companyCard} key={idx} />
        ) : null;
      })
    );
  }, [filter]);

  const filterCompanyData = () => {
    const filtered = companyData.map((data: any) => ({
      ...data,
      filtered: data.label.includes(filter),
    }));
    setCompanyData(filtered);
  };
  return (
    <Selections>
      <Title title={"스타트업 셀렉션"} />
      <Tabs handleClickTab={handleClickTab} />
      <CardContainer>{filtered}</CardContainer>
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
