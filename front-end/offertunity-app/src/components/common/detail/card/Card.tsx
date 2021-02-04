import React from "react";
import styled from "styled-components";
import Labels from "../../../common/label/Labels";
import Buttons from "../buttons/Buttons";

const CompanyCard = ({ data, detailInfo, type, isLogin }: any) => {
  console.log(isLogin);
  const checkImg = () => {
    if (type === "startup") {
      return `url(${data.startups[0].thumbnail})`;
    } else {
      return `url(${data.logo_img})`;
    }
  };
  const backgroundImage = {
    backgroundImage: checkImg(),
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const logoImage = {
    backgroundImage: `url(${data.logo_img})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const handleUrlClick = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <CardBox>
      <CompanyImg style={backgroundImage} />
      <CompanyInfo>
        <Title>
          {type === "startup" && <div className="logo" style={logoImage} />}

          <span>{data.name}</span>
        </Title>
        <Hr />
        <DetailInfo>
          <LeftBox>
            {detailInfo.map((item: any, idx: number) => {
              return (
                <Wrapper key={idx}>
                  <span className="title">{item.title}</span>
                  <div>
                    {item.content === data.homepage ? (
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
            <Labels label={data.tag} detailName={"detailLabels"} />
          </RightBox>
        </DetailInfo>
        {type === "startup" && (
          <Buttons
            data={data.startups[0].is_liked}
            title={data.name}
            type={type}
            companyId={data.id}
            isLogin={isLogin}
          />
        )}
        {type === "partner" && (
          <Buttons
            data={data.partners[0].is_liked}
            title={data.name}
            type={type}
            companyId={data.id}
            isLogin={isLogin}
          />
        )}
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
  align-items: center;
  span {
    font-size: ${({ theme }) => theme.fontSizes.titleSize};
    font-weight: bold;
  }

  .logo {
    width: 98px;
    height: 98px;
    margin-right: 32px;

    img {
      max-width: 100%;
      max-height: 100%;
    }
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
  width: 30%;
`;
