import React from "react";
import styled from "styled-components";

const Cards = ({ data }: any) => {
  const { title, image, logo, label, field, stack, invest, description } = data;
  return (
    <>
      <CardContainer>
        <ImageWrapper>
          <img src={image} />
        </ImageWrapper>
        <BottomSection>
          <TitleWrapper>
            <p>{title}</p>
            <LogoWrapper>
              <img src={logo} />
            </LogoWrapper>
          </TitleWrapper>
          <LabelWrapper>
            {label.map((category: string, idx: any) => {
              return <span key={idx}>{category}</span>;
            })}
          </LabelWrapper>
        </BottomSection>
        <Figure>
          <TitleWithLogo>
            <h1>{title}</h1>
            <div className="logoWrapper">
              <img src={logo} />
            </div>
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
  width: 3.75rem;
  height: 3.75rem;

  img {
    width: 100%;
    height: 100%;
  }
`;

const LabelWrapper = styled.div`
  width: 100%;
  padding-bottom: 0.625rem;
  display: flex;
  flex-wrap: wrap;

  span {
    margin: 0.3rem 0.6rem 0.3rem 0;
    height: 1.4rem;
    display: inline-block;
    border: 1px solid #c3bdf4;
    padding: 0.3rem 0.375rem;
    color: #c3bdf4;
    font-size: 0.688rem;
  }
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

    img {
      width: 100%;
      height: 100%;
    }
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
