import React from "react";
import styled from "styled-components";
import { isTemplateExpression } from "typescript";
import Title from "../../common/title/Title";

const CompanyNews = ({ data }: any) => {
  return (
    <>
      <NewsContainer>
        <Title title={"주요뉴스"} />
        {data.map((item: any, idx: number) => {
          return (
            <NewsWrapper>
              <div className="imageBox">
                <img alt="뉴스의 이미지입니다" src={item.image} />
              </div>
              <div>
                <NewsContent>{item.description}</NewsContent>
                <NewsSource>
                  <span>{item.source}</span>
                </NewsSource>
              </div>
            </NewsWrapper>
          );
        })}
      </NewsContainer>
    </>
  );
};

export default CompanyNews;

const NewsContainer = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 10rem;
`;

const NewsWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 16rem;
  margin-top: 1.5rem;
  padding: 3rem 3.5rem 3rem 3.5rem;
  border: 1px solid #d9d9d9;
  border-radius: 6px;

  .imageBox {
    width: 14.813rem;
    height: 100%;
    margin-right: 6.063rem;

    img {
      width: 100%;
      height: 100%;
    }
  }
`;

const NewsContent = styled.div`
  width: 52.125rem;
  height: 7.688rem;
  margin-bottom: 1rem;
  line-height: 2.5rem;
`;

const NewsSource = styled.div`
  float: right;
`;
