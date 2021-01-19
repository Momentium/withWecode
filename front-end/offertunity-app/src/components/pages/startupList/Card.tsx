import React, { useState } from "react";
import styled from "styled-components";
import Title from "./Title";

const Card = ({ list, data, name }: any) => {
  const { title, image, label, description, service } = data;
  const [likeStatus, setLikeStatus] = useState<Boolean>(false);
  const [likeImg, setLikeImg] = useState<JSX.Element>(
    <img alt="logo" src="/images/icons/heart.png" />
  );

  const handleLikeBtn = () => {
    setLikeStatus(!likeStatus);
    likeStatus
      ? setLikeImg(<img src="/images/icons/heart_fill.png" />)
      : setLikeImg(<img src="/images/icons/heart.png" />);
  };

  const cardImage = {
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
  };

  return (
    <Wrapper className={name}>
      <Image style={cardImage} className={name}>
        <LikeBtn onClick={handleLikeBtn} className={name}>
          {likeImg}
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
    position: relative;
    width: 18.875rem;
    margin-bottom: 2rem;
    margin-right: 1.5rem;
    padding: 2rem;
    border: 1px solid #c6c6c6;
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
  width: 2.5rem;
  height: 3rem;
  right: 1px;
  cursor: pointer;

  &.startupList {
    top: 1px;
  }
`;

const Image = styled.div`
  width: 14.875rem;
  height: 10.375rem;
  margin-bottom: 1rem;

  &.issueStartup {
    position: relative;
    width: 100%;
    height: 16.667rem;
    margin-bottom: 0.958rem;
  }
`;

const Description = styled.div`
  width: 100%;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.938rem;
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
