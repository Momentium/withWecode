import React from "react";
import styled from "styled-components";
import Labels from "../../../common/label/Labels";

const Cards = ({ data }: any) => {
  const { title, image, logo, label, field, stack, invest, description } = data;
  const backgroundLogoImage = {
    backgroundImage: `url(${logo})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
  };
  const backgroundImage = {
    backgroundImage: `url(${image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };
  return (
    <>
      <CardContainer>
        <ImageWrapper style={backgroundImage} />
        <BottomSection>
          <TitleWrapper>
            <p>{title}</p>
            <LogoWrapper style={backgroundLogoImage} />
          </TitleWrapper>
          <Labels label={label} />
        </BottomSection>
        <Figure>
          <TitleWithLogo>
            <h1>{title}</h1>
            <div className="logoWrapper" style={backgroundLogoImage}></div>
          </TitleWithLogo>
          <Information>
            <div>
              <span className="title">산업분야</span>
              <span>{field}</span>
            </div>
            <div>
              <span className="title">활용기술</span>
              <span>{stack}</span>
            </div>
            <div>
              <span className="title">투자단계</span>
              <span>{invest}</span>
            </div>
          </Information>
          <Description>
            <p>{description}</p>
          </Description>
        </Figure>
      </CardContainer>
    </>
  );
};

export default Cards;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 15rem;
  margin-right: 1rem;
  margin-bottom: 1.8rem;
  border: 1px solid #c2bef0;
  cursor: pointer;

  span {
    display: inline-block;
    margin-right: 0.313rem;
  }
`;

const ImageWrapper = styled.div`
  height: 10.438rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const BottomSection = styled.div`
  padding: 1rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 0.6rem;
  text-align: left;
  font-weight: bold;
  color: #000000;
  opacity: 1;
`;

const LogoWrapper = styled.div`
  width: 4.18rem;
  height: 3.75rem;
`;

const Figure = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color: #000000;
  border-radius: 0.1875rem;
  color: #ffffff;
  padding: 2rem 1rem;
  overflow-y: hidden;
  opacity: 0;
  transition: opacity 0.33s ease-in-out;
  &:hover {
    opacity: 1;
  }
`;

const TitleWithLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 2.25rem;
  margin-bottom: 2.5rem;

  h1 {
    font-size: 1.31rem;
    font-weight: bold;
  }

  .logoWrapper {
    width: 2.6rem;
    height: 2.5rem;
  }
`;
const Information = styled.div`
  display: flex;
  flex-direction: column;

  div {
    margin-bottom: 0.625rem;
    font-size: 0.938rem;

    .title {
      font-weight: bold;
    }

    &:last-child {
      margin-bottom: 1rem;
    }
  }
`;

const Description = styled.div`
  opacity: 0.7;

  p {
    opacity: 0.7;
  }
`;
