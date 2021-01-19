import React from "react";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import styled from "styled-components";
import Title from "./Title";
import Labels from "./Labels";
import { isNamedExports } from "typescript";

const Card = ({ data, name }: any) => {
  const { title, image, label, description } = data;
  const cardImage = {
    backgroundImage: `url(${image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  return (
    <Wrapper className={name}>
      <Image style={cardImage}>
        <LikeBtn>
          <FavoriteBorderIcon fontSize="large" />
        </LikeBtn>
      </Image>
      <Title title={title} />
      <Description>{description}</Description>
      <LabelWrapper>
        {label.map((element: any, idx: number) => (
          <Label>
            <span>{element}</span>
          </Label>
        ))}
      </LabelWrapper>
    </Wrapper>
  );
};

export default Card;

const Wrapper = styled.div`
  &.startupList {
    width: 22.5rem;
    padding-right: 1.25rem;
    margin-bottom: 6.125rem;
  }

  &.issueStartup {
    width: 28.688rem;
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
  width: 100%;
`;

const Label = styled.div`
  min-height: 1.875rem;
  padding: 0.25rem 0.3rem;
  margin-right: 0.625rem;
  background: #f1f9ff 0% 0% no-repeat padding-box;
  border: 3px solid #bce0fd;
  border-radius: 4px;

  span {
    text-align: center;
    font: normal normal normal 12px/12px Arial;
    color: #2699fb;
  }
`;
