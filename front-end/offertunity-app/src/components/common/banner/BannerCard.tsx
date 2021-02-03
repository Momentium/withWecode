import React from "react";
import styled from "styled-components";

const BannerCard = ({ data }: any) => {
  const { img, script, title, bottomTitle } = data;
  return (
    <BannerWrap>
      <img src={img} alt={script} />
      <TxtWrap>
        <p>{script}</p>
        <span>{title}</span>
        <br />
        <span>{bottomTitle}</span>
      </TxtWrap>
    </BannerWrap>
  );
};

export default BannerCard;

const BannerWrap = styled.div`
  position: relative;
  width: 100%;
  height: 43.75rem;
  img {
    width:100%;
    min-width: 110rem;
    height: 100%;
  }
`;

const TxtWrap = styled.div`
  position: absolute;
  top: 23.75rem;
  left: 20rem;
  display: inline-block;
  width: 28rem;
  color: #fff;
  p {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
  span {
    font-size: 3rem;
    font-weight: bold;
  }
`;
