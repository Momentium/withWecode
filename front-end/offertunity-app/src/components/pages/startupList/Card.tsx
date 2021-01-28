import React, { useState } from "react";
import styled from "styled-components";
import LikeBtn from "../../common/button/iconBtn/LikeBtn";
import Title from "./Title";

const Card = ({ data, name, background }: any) => {
  const { title, image, label, description, service, shortDescriotion } = data;
  const [like, setLike] = useState<boolean>(data.like);

  const cardImage = {
    backgroundImage: `url(${image})`,
    backgroundSize: background,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  const clickLike = (e: React.MouseEvent<HTMLDivElement>) => {
    setLike(!like);
  };

  return (
    <Wrapper className={name}>
      <Image style={cardImage} className={name}>
        <div className="likebtnWrap">
          <LikeBtn isLike={like} clickLike={clickLike} />
        </div>
      </Image>
      <Title title={title} />
      {service ? (
        <Service>
          <span>주요 서비스</span>
          {service}
        </Service>
      ) : (
        <ShortDescription>
          <span>{shortDescriotion}</span>
        </ShortDescription>
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
  cursor: pointer;
  &.startupList {
    position: relative;
    width: 18.875rem;
    margin-bottom: 2rem;
    padding: 2rem;
    border: 1px solid #c6c6c6;
  }

  &.startupList:not(:nth-child(4n)) {
    margin-right: 1.5rem;
  }

  &.issueStartup {
    width: 25rem;
    height: 28.938rem;
  }

  &.issueStartup:not(:nth-child(3n)) {
    margin-right: 2.5rem;
  }
`;

const Image = styled.div`
  width: 14.875rem;
  height: 10.375rem;
  display: flex;
  justify-content: flex-end;

  .likebtnWrap {
    position: absolute;
    right: 1%;
    top: 2%;
  }

  &.issueStartup {
    position: relative;
    width: 100%;
    height: 16.667rem;
    margin-bottom: 0.958rem;
  }
`;

const Description = styled.div`
  width: 100%;
  height: 3.375rem;
  overflow: hidden;
  margin-top: 0.5rem;
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
  height: 26px;
  border: 1px solid #c2bdf0;
  padding: 4px 8px;
  margin-top: 1rem;
  color: #c2bdf0;
  font-size: 11px;
  font-weight: 400;

  &:not(:last-child) {
    margin-right: 8px;
  }
`;

const ShortDescription = styled.div`
  margin: 1.5rem 0 1rem 0;
  font-size: 0.938rem;
  font-weight: bold;
`;
