import React, { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import { isTemplateExpression } from "typescript";
import Title from "../../title/Title";

const News = ({ data }: any) => {
  const [postsToShow, setPostsToShow] = useState([]);
  const postsPerPage = 1;

  const loopWithSlice = useCallback(
    (start: number, end: number) => {
      const slicedPosts = data.slice(start, end);

      setPostsToShow(slicedPosts);
    },
    [data]
  );

  const test = (start: number, end: number) => {
    const slicePosts = data.slice(start, end);
    setPostsToShow(postsToShow.concat(slicePosts));
  };

  useEffect(() => {
    loopWithSlice(0, 3);
  }, [loopWithSlice]);

  const handleShowMorePosts = () => {
    test(postsToShow.length, data.length);
  };

  return (
    <>
      <NewsContainer>
        <Title title={"주요뉴스"} />
        {postsToShow.map((item: any, idx: number) => {
          return (
            <NewsWrapper key={idx}>
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
      <LoadMoreBtn onClick={handleShowMorePosts}>Load more</LoadMoreBtn>
    </>
  );
};

export default News;

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
      object-fit: cover;
    }
  }
`;

const NewsContent = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  width: 52.125rem;
  height: 7.688rem;
  margin-bottom: 1rem;
  line-height: 2.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NewsSource = styled.div`
  float: right;
`;

const LoadMoreBtn = styled.div`
  width: 300px;
  height: 100px;
`;
