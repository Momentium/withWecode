import React, { useState } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import axios from "axios";
import * as Mt from "api/methods";

type Props = {
  data: any;
  key: number;
  index: number;
};

const Card: React.FC<Props> = ({ data, key, index }) => {
  const [like, setLike] = useState<Boolean>(true);
  const { id, company_id, name, thumbnail, description } = data;
  const _token = Mt.getUserInfo().token;

  const likeIt = () => {
    setLike(false);
    axios.get(`${process.env.REACT_APP_URL}/likes/company/${company_id}`, {
      headers: {
        Authorization: _token,
      },
    });
  };

  return (
    // <Link to={`/startup/detail/${id}`} key={index}>
    <Wrap style={{ display: like ? "inline-block" : "none" }} id={id}>
      <LikeBtn onClick={likeIt}>
        <img src="/images/icons/heart_fill.png" alt="좋아요" />
      </LikeBtn>
      <Logo>
        <img src={thumbnail} alt="로고" />
      </Logo>
      <Text>
        <Title>{name}</Title>
        <Sub>{name}</Sub>
        <Info>{description}</Info>
      </Text>
    </Wrap>
    // </Link>
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
    width: 100%;
    height: 16.56rem;
    margin-bottom: 1.375rem;
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
  z-index: 10;
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;

  img {
    width: 1.875rem;
    height: 2rem;
  }
`;
