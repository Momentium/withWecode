import React from "react";
import styled from "styled-components";
import Title from "../../common/title/Title";

const CompanyInvestInfo = ({ data }: any) => {
  const {
    attractInvestment,
    candiateInvestPrice,
    candidateInverstYear,
    currInvestYear,
  } = data;

  const infoContainerData = [
    {
      title: "현재 투자 단계",
      content: currInvestYear,
    },
    {
      title: "희망 투자 단계",
      content: candidateInverstYear.join(","),
    },
    {
      title: "희망 투자 유치 금액",
      content: candiateInvestPrice,
    },
  ];

  return (
    <InvestBox>
      <Title title={"투자정보"} />
      <InvestInfoBox>
        {infoContainerData.map((item: any, idx: number) => {
          return (
            <InfoWrapper key={idx}>
              <h1>{item.title}</h1>
              <span>{item.content}</span>
            </InfoWrapper>
          );
        })}
      </InvestInfoBox>
      <InvestHistory>
        {attractInvestment.map((item: any, idx: number) => {
          return (
            <HistoryWrapper className="wrapper">
              <div className="titleBox">
                <p className="title">{"투자 유치 이력"}</p>
              </div>
              <div className="contentBox">
                <div className="box">
                  <p className="subTitle">
                    투자 일자 <span>{item.date}</span>
                  </p>
                  <p className="subTitle">
                    투자 금액 <span>{item.price}</span>
                  </p>
                </div>
                <div className="box">
                  <p className="subTitle">
                    투자 기관 <span>{item.organization}</span>
                  </p>
                  <p className="subTitle">
                    투자 금액 <span>{item.value}</span>
                  </p>
                </div>
                <div className="investBtn">
                  <span>시트 투자</span>
                </div>
              </div>
              <hr className="investHr" />
            </HistoryWrapper>
          );
        })}
      </InvestHistory>
    </InvestBox>
  );
};

export default CompanyInvestInfo;

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
  .title {
    margin-bottom: 1.5rem;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: bold;
  }

  &:last-child .investHr {
    display: none;
  }

  .investHr {
    margin: 3rem 0rem;
  }

  .contentBox {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .box {
      margin-right: 14.063rem;

      .subTitle {
        span {
          margin-left: 1.5rem;
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
