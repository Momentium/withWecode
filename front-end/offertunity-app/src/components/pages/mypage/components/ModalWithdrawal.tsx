import React from "react";
import styled from "styled-components";

const ModalWithdrawal = () => {
  return (
    <ModalWrap>
      <Box>
        <H1>회원 탈퇴를 하면 모든 데이터가 사라집니다.</H1>
        <InputBox>
          <p>비밀번호 입력</p>
          <input type="text" placeholder="비밀호를 입력해주세요." />
        </InputBox>
        {/* <Button>
          <Submit>확인</Submit>
          <Cancel>취소</Cancel>
        </Button> */}
      </Box>
    </ModalWrap>
  );
};

export default ModalWithdrawal;

const ModalWrap = styled.div`
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
`;
const Box = styled.div`
  position: absolute;
  top: 20%;
  left: 20%;
  width: 60rem;
  height: 30rem;
  padding-left: 8rem;
  text-align: left;
  background: #fff;
  background-image: url("/images/signUp/modalBg.svg");
  background-repeat: no-repeat;
  background-position-y: 18rem;
  background-position-x: 49rem;
  background-size: 9rem;
`;

const H1 = styled.p`
  text-align: center;
  padding: 3rem 8rem 4.375rem 0;
  font-size: 1.31rem;
  font-weight: bold;
`;

const InputBox = styled.div`
  p {
    font-size: 0.8rem;
    color: #898989;
  }
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

const Button = styled.div``;

const Btn = styled.button`
  margin-top: 2rem;
  width: 16rem;
  height: 2.8rem;
  line-height: 2.8rem;
  border-radius: 0.3rem;
  font-size: 0.9rem;
  cursor: pointer;
`;

const Submit = styled(Btn)`
  margin-right: 4.5rem;
  background: #1a2536;
  color: #fff;
`;
const Cancel = styled(Btn)`
  border: 1px solid #1a2536;
  color: #1a2536;
`;
