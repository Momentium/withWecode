import React from "react";
import styled from "styled-components";
import Labels from "../../../common/label/Labels";
import Buttons from "../buttons/Buttons";

interface Props {
  data: any;
}

const CompanyCard = ({ data, detailInfo }: any) => {
  const { title, titleImage, logo, label, like, homepage } = data;

  const backgroundImage = {
    backgroundImage: `url(${titleImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  const handleUrlClick = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <CardBox>
      <CompanyImg style={backgroundImage} />
      <CompanyInfo>
        <Title>
          <img alt="로고" src={logo} />
          <span>{title}</span>
        </Title>
        <Hr />
        <DetailInfo>
          <LeftBox>
            {detailInfo.map((item: any, idx: number) => {
              return (
                <Wrapper key={idx}>
                  <span className="title">{item.title}</span>
                  <div>
                    {item.content === homepage ? (
                      <span
                        className="url"
                        onClick={(url) => handleUrlClick(item.content)}
                      >
                        {item.content}
                      </span>
                    ) : (
                      <span>{item.content}</span>
                    )}
                  </div>
                </Wrapper>
              );
            })}
          </LeftBox>
          <RightBox>
            <Labels label={label} detailName={"detailLabels"} />
          </RightBox>
        </DetailInfo>
        <Buttons data={like} />
      </CompanyInfo>
    </CardBox>
  );
};

export default CompanyCard;

const CardBox = styled.section`
  display: flex;
  margin-bottom: 7.5rem;
`;

const CompanyImg = styled.div`
  width: 39.25rem;
  height: 26.188rem;
  margin-right: 5rem;
`;

const CompanyInfo = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  width: 35.781rem;
`;

const Title = styled.div`
  display: flex;
  align-items: flex-end;
  span {
    margin-left: 2rem;
    font-size: ${({ theme }) => theme.fontSizes.titleSize};
    font-weight: bold;
  }
`;

const Hr = styled.hr`
  width: 100%;
  margin: 1.5rem 0rem;
`;

const DetailInfo = styled.div`
  display: flex;
  margin-bottom: 3rem;
`;

const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  div {
    width: 9.813rem;

    span {
      &.url {
        color: #1087fd;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
`;

const RightBox = styled.div`
  width: 13.563;
`;