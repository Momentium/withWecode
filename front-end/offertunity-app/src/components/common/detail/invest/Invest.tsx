import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Title from "../../title/Title";

const Invest = ({ data }: any) => {
  const { infoContainerData, containerTitle } = data;
  const attractInvestment = data.invested_to;
  const [postsToShow, setPostsToShow] = useState([]);
  const [toggle, setToggle] = useState(false);

  // 더보기 버튼 관련 함수들....
  const loopWithSlice = useCallback(
    (start: number, end: number) => {
      const slicedPosts = attractInvestment.slice(start, end);
      setPostsToShow(slicedPosts);
    },
    [attractInvestment]
  );

  const handleLoadMore = (start: number, end: number) => {
    const slicePosts = attractInvestment.slice(start, end);
    setPostsToShow(postsToShow.concat(slicePosts));
  };

  const handleShowMorePosts = () => {
    if (!toggle) {
      handleLoadMore(postsToShow.length, attractInvestment.length);
      setToggle(true);
    } else if (toggle) {
      loopWithSlice(0, 3);
      setToggle(false);
    }
  };

  const numberWithComma = (num: any) => {
    console.log(num);
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    loopWithSlice(0, 3);
  }, [loopWithSlice]);

  return (
    <InvestBox>
      <Title title={"투자 정보"} />
      <InvestInfoBox>
        {infoContainerData
          ? infoContainerData.map((item: any, idx: number) => {
              return (
                <InfoWrapper key={idx}>
                  <h1>{item.title}</h1>
                  <span>{item.content}</span>
                </InfoWrapper>
              );
            })
          : null}
      </InvestInfoBox>
      <InvestHistory>
        {postsToShow.map((item: any, idx: number) => {
          return (
            <HistoryWrapper className="wrapper" key={idx}>
              <div className="titleBox">
                <p className="title">{containerTitle}</p>
              </div>
              <div className="contentBox">
                <div className="box">
                  <p className="subTitle">
                    투자 일자 <span>{item.date.slice(0, 10)}</span>
                  </p>
                  <p className="subTitle">
                    투자 금액 <span>{item.invested_fund}</span>
                  </p>
                </div>
                <div className="box">
                  <p className="subTitle">
                    투자 기관 <span>{item.invested_startup}</span>
                  </p>
                  <p className="subTitle">
                    기업 가치{" "}
                    <span>{numberWithComma(item.corporate_value)}</span>
                  </p>
                </div>
                <div className="investBtn">
                  <span>시트 투자</span>
                </div>
              </div>
              <hr />
            </HistoryWrapper>
          );
        })}
        {attractInvestment.length >= 4 && (
          <BtnContainer>
            <LoadMoreBtn onClick={handleShowMorePosts}>
              {!toggle ? "더보기" : "접기"}
            </LoadMoreBtn>
          </BtnContainer>
        )}
      </InvestHistory>
    </InvestBox>
  );
};

export default Invest;

const InvestBox = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 10rem;
`;

const InvestInfoBox = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 25.656rem;
  height: 8.75rem;
  border: 1px solid #d8d8d8;
  border-radius: 6px;

  &:not(:last-child) {
    margin-right: 1.531rem;
  }

  h1 {
    margin-bottom: 1rem;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: bold;
  }
`;

const InvestHistory = styled.div`
  display: flex;
  flex-direction: column;
  padding: 48px 4.5rem;
  border: 1px solid #cdcdcd;
  border-radius: 6px;
`;

const HistoryWrapper = styled.div`
  &:last-child hr {
    display: none;
  }

  .title {
    margin-bottom: 1.5rem;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: bold;
  }

  hr {
    margin: 3rem 0rem;
  }

  .contentBox {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .box {
      margin-right: 14.063rem;

      .subTitle {
        color: #898989;
        font-weight: bold;
        span {
          margin-left: 1.5rem;
          color: #000000;
          font-weight: normal;
        }
      }

      .subTitle:first-child {
        margin-bottom: 1rem;
      }
    }

    .box:first-child {
      margin-right: 0.531rem;
    }

    .investBtn {
      background: #ffffff 0% 0% no-repeat padding-box;
      border: 1px solid #5142e4;
      border-radius: 5px;
      padding: 1.094rem 7.038rem;

      span {
        color: #5541ed;
      }
    }
  }
`;

const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
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
