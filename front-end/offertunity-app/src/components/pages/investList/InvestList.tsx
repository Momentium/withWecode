import React from "react";
import styled from "styled-components";
import AutoSlider from "./AutoSlider";
import MoreBtn from "components/common/button/iconBtn/MoreBtn";

const InvestList = () => {
  return (
    <div
      style={{
        position: "relative",
        marginBottom: "12.8rem",
        marginTop: "12rem",
      }}
    >
      <Wrap>
        <Title>투자기관 리스트</Title>
        <MoreBtn txt={"더 많은 투자기관 보기"} toLink={"/invest"} />
        {/* <More>
          더 많은 투자기관 보기
          <img src="images/investList/arrow.png" alt=""/>
        </More> */}
      </Wrap>
      <AutoSlider />
    </div>
  );
};

export default InvestList;

const Wrap = styled.section`
  ${({ theme }) => theme.conWidth};
  margin-bottom: 5.8rem;

  display: flex;
  justify-content: space-between;
`;

const Title = styled.span`
  font-size: 1.68rem;
  font-weight: bold;
`;

// const More = styled.div`
//   font-size:0.87rem;
//   float:right;
//   cursor:pointer;
//   img{
//     width:5rem;
//     margin-left:1.5rem;
//   }
// `;
