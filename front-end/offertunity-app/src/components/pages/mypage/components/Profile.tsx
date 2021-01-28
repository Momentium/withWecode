import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";

type Props = {
  data: {};
};

const Profile: React.FC<Props> = ({ data }) => {
  return (
    <Wrap>
      <Img>
        <span>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuxUTL6JRSyW63O0dNiXSjLDHgdKf3K1DFNQ&usqp=CAU"
            alt="프로필사진"
          />
        </span>
        <p>Mat</p>
      </Img>
      <Text>
        <Box className="box">
          <Info>
            <span>아이디</span>
            <p>ma0621@naver.com</p>
          </Info>
          <Info>
            <span>가입경로</span>
            <p>이메일로 가입하기 회원</p>
          </Info>
          <Info>
            <span>회원 구분</span>
            <p>스타트업 회원</p>
          </Info>
          <BtnOne>프로필 수정</BtnOne>
        </Box>
        <Box>
          <Info>
            <span>휴대 전화 번호</span>
            <p>010-9511-3975</p>
          </Info>
          <Info>
            <span>소속 스타트업</span>
            <p>마이 스타트업을 등록해주세요.</p>
          </Info>
          <BtnTwo>마이 스타트업 관리</BtnTwo>
        </Box>
      </Text>
    </Wrap>
  );
};

export default Profile;

const Wrap = styled.section`
  ${({ theme }) => theme.ConWidth};
  box-shadow: 0px 6px 16px #53526217;
  background: #fff;
  display: flex;
  padding: 3.4rem 0;
  margin-bottom: 2rem;
  border-radius: 0.5rem;
`;

const Img = styled.div`
  width: 20%;
  margin: 0 10.5rem 0 10.06rem;
  text-align: center;
  span {
    display: inline-block;
    width: 11.4rem;
    height: 11.4rem;
    border-radius: 100%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  p {
    text-align: center;
    margin-top: 2.5rem;
    font-size: 2.25rem;
    font-weight: bold;
  }
`;

const Text = styled.div`
  display: flex;
  align-items: center;
`;

const Info = styled.div`
  margin-bottom: 2rem;
`;

const Box = styled.div`
  position: relative;
  display: inline-block;
  font-size: 0.9rem;
  height: 19.44rem;
  &.box {
    margin-right: 6rem;
  }
  p {
    font-weight: bold;
    margin-top: 1rem;
  }
`;

const BTN = styled.button`
  width: 16rem;
  height: 2.8rem;
  border-radius: 0.3rem;
  line-height: 2.8rem;
  cursor: pointer;
`;

const BtnOne = styled(BTN)`
  background: #1a2536;
  color: #fff;
`;

const BtnTwo = styled(BTN)`
  position: absolute;
  bottom: 1.4rem;
  border: 1px solid #1a2536;
  color: #1a2536;
`;
