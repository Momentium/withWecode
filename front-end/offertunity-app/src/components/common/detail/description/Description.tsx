import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Title from "../../../common/title/Title";
import CompanyImgSlider from "../portfolio/Portfolio";
import CompanyTeamInfo from "../team/Team";
import CompanyInvestInfo from "../invest/Invest";
import CompanyNews from "../news/News";

const CompanyDescription = ({ data, introduceDatas, type }: any) => {
  const [news, setNews] = useState();

  useEffect(() => {
    axios
      .get("/data/partnerData/newsData.json")
      .then((res) => setNews(res.data.data));
  }, []);

  return (
    <>
      <CompanyInformation>
        {introduceDatas.map((item: any, idx: number) => {
          return (
            <InformationBox key={idx} className="infoBox">
              <Title title={item.title} />
              <Hr />
              <TextArea>{item.description}</TextArea>
            </InformationBox>
          );
        })}
      </CompanyInformation>
      {type === "partner" ? (
        <CompanyInvestInfo data={data.partners[0]} page={"partner"} />
      ) : (
        <CompanyInvestInfo data={data.startups[0]} page={"startup"} />
      )}
      {type === "partner" ? (
        <CompanyImgSlider images={data.partners[0].investment_portfolio} />
      ) : (
        <CompanyImgSlider images={data.startups[0].startup_images} />
      )}
      <CompanyTeamInfo data={data} />
      {news && <CompanyNews data={news} />}
    </>
  );
};

export default CompanyDescription;

const CompanyInformation = styled.section`
  & .infoBox:first-child {
    margin-bottom: 7.5rem;
  }
  & .infoBox:last-child {
    margin-bottom: 4.5rem;
  }
`;

const InformationBox = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 2.5rem;
`;

const Hr = styled.hr`
  width: 100%;
  margin-bottom: 2rem;
`;
const TextArea = styled.div`
  color: black;
`;
