import React from "react";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import styled from "styled-components";
import Title from "./Title";

const Card = ({ data, name }: any) => {
  const { title, image, label, description } = data;
  const cardImage = {
    backgroundImage: `url(${image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  return (
    <Wrapper className={name}>
      <Image style={cardImage} className={name}>
        <LikeBtn>
          <FavoriteBorderIcon fontSize="large" />
        </LikeBtn>
      </Image>
      <Title title={title} />
      <Description>{description}</Description>
      <LabelWrapper>
        {label.map((element: any, idx: number) => (
          <Label>{element}</Label>
        ))}
      </LabelWrapper>
    </Wrapper>
  );
};

export default Card;

const Wrapper = styled.div`
  &.startupList {
    width: 19.4rem;
    margin-bottom: 6.125rem;
  }

  &.startupList:not(:nth-child(4n)) {
    margin-right: 1%;
  }

  &.issueStartup {
    width: 28.688rem;
  }

  &.issueStartup:not(:nth-child(3n)) {
    margin-right: 1%;
  }
`;

const LikeBtn = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.188rem;
  height: 3.188rem;
  top: 17px;
  right: 15px;
  border-radius: 13px;
  cursor: pointer;
  background-color: white;
`;

const Image = styled.div`
  position: relative;
  width: 100%;
  height: 12.5rem;
  margin-bottom: 1.813rem;
`;

const Description = styled.div`
  width: 100%;
  margin-top: 1.188rem;
  margin-bottom: 2.188rem;
`;
const LabelWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const Label = styled.div`
  display: inline-block;
  height: 26px;
  background-color: #f1f9ff;
  border: 3px solid #bce0fd;
  border-radius: 4px;
  padding: 4px 8px;
  color: rgb(37, 129, 255);
  font-size: 11px;
  font-weight: 400;
  margin-right: 8px;
  margin-top: 8px;

  span {
    text-align: center;
    font: normal normal normal 12px/12px Arial;
    color: #2699fb;
  }
`;
