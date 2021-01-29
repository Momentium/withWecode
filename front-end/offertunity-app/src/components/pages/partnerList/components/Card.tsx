import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Card = ({ data }: any) => {
  return data.map((item: any, idx: number) => {
    return (
      <Link to={`/partner/${item.id}`}>
        <CardBox key={idx}>
          <ImageContainer>
            <img alt="로고" src={item.iamge} />
          </ImageContainer>
          <CompanyTitle>
            <span>{item.title}</span>
          </CompanyTitle>
          <CompanyDescription>
            <p>{item.description}</p>
          </CompanyDescription>
        </CardBox>
      </Link>
    );
  });
};

export default Card;

const CardBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 31.313rem;
  margin-bottom: 2rem;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  width: 20rem;
  height: 20rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CompanyTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-size: 1.313rem;
    font-weight: bold;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const CompanyDescription = styled.div`
  text-align: center;
`;
