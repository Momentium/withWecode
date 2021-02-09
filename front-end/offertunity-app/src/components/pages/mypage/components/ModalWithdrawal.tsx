import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import * as Mt from "api/methods";

const ModalWithdrawal = () => {
  const [Modal, setModal] = useState(true);
  const [pw, setPw] = useState("");
  const handlePw = (event: any) => {
    const value = event.target.value;
    setPw(value);
    console.log(pw);
  };
  const _token = Mt.getUserInfo().token;

  const handleWithrawal = () => {
    axios
      .delete("http://10.0.1.29:3000/users/mypage", {
        headers: {
          Authorization: _token,
        },
        data: {
          password: pw,
        },
      })
      .then((res) => {
        alert("회원탈퇴 되었습니다");
        console.log(res);
      })
      .catch((err) => {
        alert("잘못된 비밀번호 입니다");
        console.log(err);
      });
  };
  return (
    <ModalWrap style={{ display: Modal ? "inline-block" : "none" }}>
      <Box>
        <H1>회원 탈퇴를 하면 모든 데이터가 사라집니다.</H1>
        <InputBox>
          <p>비밀번호를 입력해주세요.</p>
          <input
            type="password"
            placeholder="비밀호를 입력해주세요."
            onChange={handlePw}
          />
        </InputBox>
        <Button
          onClick={() => {
            setModal(false);
          }}
        >
          <Submit onClick={handleWithrawal}>확인</Submit>
          <Cancel>취소</Cancel>
        </Button>
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
  text-align: center;
  background: #fff;
  background-image: url("/images/signUp/modalBg.svg");
  background-repeat: no-repeat;
  background-position-y: 18rem;
  background-position-x: 49rem;
  background-size: 9rem;
`;

const H1 = styled.p`
  text-align: center;
  padding: 5rem 0 4.375rem 0;
  font-size: 1.31rem;
  font-weight: bold;
`;

const InputBox = styled.div`
  display: inline-block;
  margin-top: 2rem;
  text-align: left;
  p {
    margin-bottom: 1rem;
    font-size: 0.9rem;
    font-weight: bold;
    color: #000;
  }
  input {
    padding: 0.5rem 1rem;
    width: 25rem;
    height: 3rem;
    border: 1px solid #1a2536;
    border-radius: 0.3rem;
    &::placeholder {
      font-size: 0.9rem;
      color: #898989;
    }
  }
`;

const Button = styled.div`
  margin-top: 6rem;
`;

const Btn = styled.button`
  width: 10rem;
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
