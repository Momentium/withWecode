import React from 'react';
import styled from "styled-components";

const BannerCard = ({ data }: any) => {
  const { img, script, title } = data;
  return (
    <BannerWrap>
      <img src={img} alt=""/>
      <TxtWrap>
        <p>{script}</p>
        <span>{title}</span>
      </TxtWrap>
    </BannerWrap>
  )
};

export default BannerCard;

const BannerWrap =styled.div`
  position: relative;
  width: 100%;
  height:43.75rem;
  img{ 
    width: 100%;
    height: 100%;
  }
`;

const TxtWrap =styled.div`
  position: absolute;
  top: 23.75rem;
  left: 20rem;
  display: inline-block;
  width:19rem;
  color:#fff;
  p{ 
    font-size:1rem;
    margin-bottom:2rem;
  }
  span{
    font-size:3rem;
  }
`;