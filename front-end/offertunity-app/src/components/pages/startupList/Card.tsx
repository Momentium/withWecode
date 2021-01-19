import React from "react";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import styled from "styled-components";
import Title from "./Title";

const Card = ({ data, name }: any) => {
  const { title, image, label, description, service } = data;
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
      {service && (
        <Service>
          <span>주요 서비스</span>
          {service}
        </Service>
      )}
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
    width: 25rem;
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
  height: 16.667rem;
  margin-bottom: 0.958rem;
`;

const Description = styled.div`
  width: 100%;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`;
const LabelWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const Service = styled.div`
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  margin-top: 1rem;

  span {
    margin-right: 1.5rem;
    color: #5541ed;
  }
`;

const Label = styled.div`
  display: inline-block;
  height: 26px;
  border: 1px solid #c2bdf0;
  padding: 4px 8px;
  color: #c2bdf0;
  font-size: 11px;
  font-weight: 400;
  margin-right: 8px;
  margin-top: 8px;
`;
