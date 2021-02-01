import React, { useState } from "react";
import styled from "styled-components";

type Props = {
  data: any;
  key: number;
  index: number;
};
const Card: React.FC<Props> = ({ data, key, index }) => {
  const [like, setLike] = useState(true);
  const { logo, title, sub, info } = data;

  const likeIt = () => {
    setLike(false);
  };
  return (
    <Wrap style={{ display: like ? "inline-block" : "none" }} key={index}>
      <LikeBtn onClick={likeIt}>
        <img src="/images/icons/heart_fill.png" alt="좋아요" />
      </LikeBtn>
      <Logo>
        <img src={logo} alt="로고" />
      </Logo>
      <Text>
        <Title>{title}</Title>
        <Sub>{sub}</Sub>
        <Info>{info}</Info>
      </Text>
    </Wrap>
  );
};

export default Card;

const Wrap = styled.div`
  position: relative;
  width: 25.3rem;
  height: 36.44rem;
  border: 1px solid #c6c6c6;
  margin: 0 1rem 1rem 0;
  text-align: center;
  cursor: pointer;
`;

const Logo = styled.div`
  img {
    width: 19.9rem;
    height: 13.88rem;
  }
`;

const Text = styled.div`
  display: inline-block;
  width: 19.9rem;
  text-align: left;
`;

const Title = styled.p`
  font-size: 1.3rem;
  font-weight: bold;
`;

const Sub = styled.p`
  padding: 2rem 0 1.3rem 0;
  font-size: 0.9rem;
  font-weight: bold;
`;

const Info = styled.p`
  display: flex;
  font-size: 0.9rem;
  line-height: 1.3rem;
`;

const LikeBtn = styled.div`
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;

  img {
    width: 2.5rem;
    height: 2.9rem;
  }
`;
