import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Title from "../../title/Title";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const News = ({ data }: any) => {
  const [postsToShow, setPostsToShow] = useState([]);
  const [toggle, setToggle] = useState(false);
  const postsPerPage = 1;

  const loopWithSlice = useCallback(
    (start: number, end: number) => {
      const slicedPosts = data.slice(start, end);

      setPostsToShow(slicedPosts);
    },
    [data]
  );

  const handleLoadMore = (start: number, end: number) => {
    const slicePosts = data.slice(start, end);
    setPostsToShow(postsToShow.concat(slicePosts));
  };

  useEffect(() => {
    loopWithSlice(0, 3);
  }, [loopWithSlice]);

  const handleShowMorePosts = () => {
    if (!toggle) {
      handleLoadMore(postsToShow.length, data.length);
      setToggle(true);
    } else if (toggle) {
      loopWithSlice(0, 3);
      setToggle(false);
    }
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
      {data.length >= 4 && (
        <BtnContainer>
          <LoadMoreBtn onClick={handleShowMorePosts}>
            {!toggle ? "더보기" : "접기"}
          </LoadMoreBtn>
        </BtnContainer>
      )}
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
  cursor: pointer;

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

const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.25rem;
`;

const LoadMoreBtn = styled.div`
  display: inline-block;
  padding: 0.625rem 1.563rem;
  transition: all 0.3s ease;
  border: 2px solid #5541ed;
  color: #5541ed;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: #5541ed;
    color: #fff;
  }
`;
