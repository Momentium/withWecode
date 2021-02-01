import React from "react";
import styled from "styled-components";

const Card = () => {
  return (
    <Wrap>
      <LikeBtn>
        <img src="/images/mypage/likeBtn.png" alt="좋아요" />
      </LikeBtn>
      <Logo>
        <img src="/images/mypage/logo.png" alt="로고" />
      </Logo>
      <Text>
        <Title>히든트랙</Title>
        <Info>당근 마켓 중고거래 어플</Info>
        <Sub>
          In order to put an action such as a Checkbox or a button inside of the
          AccordionSummary, you need to stop the propagation of the focus and
          click events to prevent the accordion from expanding/collapsing when
          using the action. You should also provide an aria-label for the
          action, otherwise the label of the nested action will be included in
          the label of the parent button that controls the accordion expansion.
        </Sub>
      </Text>
    </Wrap>
  );
};

export default Card;

const Wrap = styled.div`
  position: relative;
  display: inline-block;
  width: 25.3rem;
  height: 36.44rem;
  border: 1px solid #c6c6c6;
  margin: 0 2rem 2rem 0;
  text-align: center;
  &:nth-child(3n) {
    margin-right: 0;
  }
`;

const Logo = styled.div`
  img {
    width: 19.9rem;
    height: 13.88rem;
  }
`;

const Text = styled.div`
  display: inline-block;
  width: 19.9rem;
  text-align: left;
`;

const Title = styled.p`
  font-size: 1.3rem;
  font-weight: bold;
`;

const Info = styled.p`
  margin: 2rem 0 1.3rem 0;
  font-size: 0.9rem;
  font-weight: bold;
`;

const Sub = styled.p`
  font-size: 0.9rem;
  line-height: 1.3rem;
`;

const LikeBtn = styled.div`
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;

  img {
    width: 2.5rem;
    height: 2.9rem;
  }
`;
