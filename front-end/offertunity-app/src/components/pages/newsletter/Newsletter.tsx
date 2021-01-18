import React from "react";
import styled from "styled-components";

const backgroundImage = {
  backgroundImage: `url(/images/newsletter/newspaperx2.png)`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

const Newsletter = () => {
  return (
    <Box style={backgroundImage}>
      <InnerBox>
        <div className="top">내게 필요한 지원사업만 알고 싶다면?</div>
        <div className="middle">
          <span>지원사업 큐레이팅 서비스</span>
          <span className="title">소프트 뉴스레터</span>
        </div>
        <div className="bottom">
          <span>무료</span>&nbsp;구독 신청하기
        </div>
        <img src="/images/newsletter/square1.png" />
      </InnerBox>
    </Box>
  );
};

export default Newsletter;

const Box = styled.div`
  width: 100%;
  height: 31.25rem;
  margin-top: 7.5rem;
  cursor: pointer;
`;

const InnerBox = styled.div`
  ${({ theme }) => theme.ConWidth}
  padding-top: 7.75rem;
  padding-bottom: 7.373rem;

  .top,
  .bottom {
    font-size: 0.938rem;
  }

  .middle {
    display: flex;
    flex-direction: column;
    margin-top: 2.25rem;
    font-size: 1.313rem;
    font-weight: bold;

    .title {
      margin-top: 0.688rem;
      font-size: 2.875rem;
    }
  }

  .bottom {
    margin-top: 5.188rem;

    span {
      font-weight: bold;
    }
  }
`;
