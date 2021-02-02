import React, { useEffect, useState } from "react";
import styled from "styled-components";

const EditForm = () => {
  return (
    <Wrap>
      <ID>
        <Static className="id">
          <Title>아이디</Title>
          <Box>mat @ naver.com</Box>
        </Static>
        <Static className="user">
          <Title>회원구분</Title>
          <Box>스타트업 회원</Box>
        </Static>
      </ID>
      <Pw>
        <Title>비밀번호</Title>
        <button>비밀번호 변경</button>
      </Pw>
      <Name>
        <Title>이름</Title>
        <Input>
          <input type="text" placeholder="MAT" />
        </Input>
      </Name>
      <Phone>
        <Title>휴대 전화 번호</Title>
        <Input>
          <input type="text" placeholder="010-1234-5678" />
        </Input>
        <button>인증하기</button>
      </Phone>
      <BtnWrap>
        <SaveBtn>프로필저장</SaveBtn>
        <CancleBtn>취소</CancleBtn>
      </BtnWrap>
    </Wrap>
  );
};

export default EditForm;

const Wrap = styled.div``;

const ID = styled.div`
  display: flex;
`;

const Static = styled.div`
  &.id {
    width: 18.94rem;
    margin-right: 1.5rem;
  }
  &.user {
    width: 14rem;
  }
`;
const Box = styled.div`
  font-size: 0.9rem;
  font-weight: bold;
  background: #eeedf8;
  height: 2.5rem;
  line-height: 2.5rem;
  padding-left: 1rem;
  border-radius: 0.3rem;
`;

const Title = styled.p`
  margin-bottom: 0.9rem;
  margin-top: 2rem;
  font-size: 0.9rem;
`;

const Pw = styled.div`
  button {
    width: 15.5rem;
    height: 2.5rem;
    line-height: 2.5rem;
    border: 1px solid #000;
    border-radius: 0.3rem;
    font-size: 0.9rem;
    font-weight: bold;
    cursor: pointer;
  }
`;

const Name = styled.div``;
const Phone = styled.div`
  button {
    margin-left: 1.5rem;
    width: 6rem;
    height: 2.5rem;
    line-height: 2.5rem;
    font-size: 0.9rem;
    background: #eeedf8;
    border-radius: 0.3rem;
    cursor: pointer;
  }
`;

const Input = styled.div`
  display: inline-block;
  input {
    padding: 0.5rem 1rem;
    width: 18.88rem;
    height: 2.5rem;
    border: 1px solid #c2bdf0;
    border-radius: 0.3rem;
    &::placeholder {
      font-weight: bold;
      font-size: 0.9rem;
      color: #000;
    }
  }
`;

const BtnWrap = styled.div``;
const Btn = styled.button`
  margin-top: 2rem;
  width: 16rem;
  height: 2.8rem;
  line-height: 2.8rem;
  border-radius: 0.3rem;
  font-size: 0.9rem;
  cursor: pointer;
`;

const SaveBtn = styled(Btn)`
  margin-right: 4.5rem;
  background: #1a2536;
  color: #fff;
`;
const CancleBtn = styled(Btn)`
  border: 1px solid #1a2536;
  color: #1a2536;
`;
