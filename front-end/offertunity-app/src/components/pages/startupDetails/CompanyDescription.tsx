import React, { useState } from "react";
import styled from "styled-components";
import Title from "../../common/title/Title";
import CompanyImgSlider from "./CompanyImgSlider";
import CompanyTeamInfo from "./CompanyTeamInfo";
import CompanyInvestInfo from "./CompanyInvestInfo";
import CompanyNews from "./CompanyNews";

const CompanyDescription = ({ data }: any) => {
  const {
    introduce,
    itemIntroduce,
    images,
    investInfo,
    teamIntroduce,
    news,
  } = data;
  const [introduceDatas, setIntroduceDatas] = useState([
    {
      title: "스타트업 소개",
      description: introduce,
    },
    {
      title: "아이템 소개",
      description: itemIntroduce,
    },
  ]);

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
