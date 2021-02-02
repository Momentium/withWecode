import React, { useState } from "react";
import styled from "styled-components";

const ModalChangePw = () => {
  const [Modal, setModal] = useState(true);
  const [inputs, setInputs] = useState({
    password: "",
    newPassword: "",
    chkPassword: "",
  });
  const { password, newPassword, chkPassword } = inputs;

  const handlePassword = (event: any) => {
    event.preventDefault();
    setInputs({
      ...inputs,
      password: event.target.value,
    });
  };

  const handleNewPassword = (event: any) => {
    event.preventDefault();
    setInputs({
      ...inputs,
      newPassword: event.target.value,
    });
  };

  const handleChkPassword = (event: any) => {
    event.preventDefault();
    setInputs({
      ...inputs,
      chkPassword: event.target.value,
    });
  };

  const reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$+ %^&*-]).{8,}$/;
  const regPassword = reg.test(newPassword);
  const samePassword = newPassword === chkPassword;

  return (
    <ModalWrap style={{ display: Modal ? "inline-block" : "none" }}>
      <Box>
        <i
          className="fas fa-times"
          onClick={() => {
            setModal(false);
          }}
        />
        <Title>비밀번호 변경</Title>
        <InputBox>
          <p>현재 비밀번호</p>
          <input
            type="password"
            placeholder="현재 비밀번호를 입력해주세요."
            onChange={handlePassword}
          />
        </InputBox>
        <InputBox>
          <p>새로운 비밀번호</p>
          <input
            type="password"
            placeholder="새로운 비밀번호를 입력해주세요."
            onChange={handleNewPassword}
          />
          <span>
            8자리 이상 소문자, 대문자, 숫자, 특수문자가 포함되어야합니다.
          </span>
        </InputBox>
        <InputBox>
          <p>비밀번호 확인</p>
          <input
            type="password"
            placeholder="비밀번호를 다시 입력해주세요."
            onChange={handleChkPassword}
          />
        </InputBox>
        <Button
          style={{
            background: regPassword && samePassword ? "#1a2536" : "#ccc",
          }}
          onClick={() => {
            regPassword && samePassword && setModal(false);
          }}
        >
          확인
        </Button>
      </Box>
    </ModalWrap>
  );
};

export default ModalChangePw;

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
  padding-top: 2rem;
  background: #fff;
  background-image: url("/images/signUp/modalBg.svg");
  background-repeat: no-repeat;
  background-position-y: 18rem;
  background-position-x: 49rem;
  background-size: 9rem;
  .fa-times {
    position: absolute;
    top: 2rem;
    right: 2rem;
    cursor: pointer;
  }
`;

const Title = styled.p`
  margin-bottom: 2rem;
  text-align: center;
  font-size: 1.31rem;
  font-weight: bold;
`;

const InputBox = styled.div`
  display: block;
  margin-top: 1rem;
  padding-left: 11rem;
  text-align: left;
  p {
    margin-bottom: 1rem;
    font-size: 0.9rem;
    font-weight: bold;
    color: #000;
  }
  input {
    padding: 0.5rem 1rem;
    width: 23rem;
    height: 2.5rem;
    border: 1px solid #898989;
    border-radius: 0.3rem;
    &::placeholder {
      font-size: 0.9rem;
      color: #898989;
    }
  }
  span {
    margin-top: 0.5rem;
    display: block;
    font-size: 0.8rem;
    color: #898989;
  }
`;

const Button = styled.button`
  margin: 2.5rem 0 0 11rem;
  width: 10rem;
  height: 2.8rem;
  line-height: 2.8rem;
  background: #1a2536;
  color: #fff;
  border-radius: 0.3rem;
  font-size: 0.9rem;
  cursor: pointer;
`;
