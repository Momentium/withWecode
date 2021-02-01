import React, { useState } from "react";
import styled from "styled-components";
import Title from "../../../common/title/Title";
import CompanyImgSlider from "../portfolio/Portfolio";
import CompanyTeamInfo from "../team/Team";
import CompanyInvestInfo from "../invest/Invest";
import CompanyNews from "../news/News";

const CompanyDescription = ({ data, introduceDatas }: any) => {
  const { images, investInfo, teamIntroduce, news } = data;

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
      <CompanyImgSlider images={images} />
      <CompanyInvestInfo data={investInfo} />
      <CompanyTeamInfo data={teamIntroduce} />
      <CompanyNews data={news} />
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
