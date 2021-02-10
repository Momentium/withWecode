import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ModalChangePw from "./ModalChangePw";
import * as Mt from "api/methods";

type Props = {
  data: any;
  profileSrc: any;
};

const EditForm: React.FC<Props> = ({ data, profileSrc }) => {
  const [Modal, setModal] = useState(false);
  const [inputs, setInputs] = useState({
    nameInput: "",
    phoneNumber: "",
  });
  const { nameInput, phoneNumber } = inputs;
  const { email, name, phone_number, type_id } = data;
  const _token = Mt.getUserInfo().token;

  const saveData = () => {
    const formData = new FormData();
    formData.append("profile_picture", Mt.dataURLtoFile(profileSrc, "profile"));
    formData.append("name", nameInput);
    formData.append("phone_number", phoneNumber);
    console.log(profileSrc);

    axios({
      method: "post",
      url: `${process.env.REACT_APP_URL}/users/mypage`,
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: _token,
      },
      data: formData,
    }).then((res) => {
      alert("회원정보가 수정되었습니다");
    });
  };

  const handleName = (event: any) => {
    event.preventDefault();
    setInputs({
      ...inputs,
      nameInput: event.target.value,
    });
  };

  const handlePhonenumber = (event: any) => {
    event.preventDefault();

    setInputs({
      ...inputs,
      phoneNumber: event.target.value,
    });
  };

  const openModal = () => {
    setModal(!Modal);
  };

  // const validatePhoneNumber = () => {
  //   const regPhone = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
  //   if (!regPhone.test(phoneNumber)) {
  //     alert("휴대전화번호 형식에 맞지 않는 번호 입니다");
  //   }
  // };

  const BtnTrue = nameInput.length > 2;

  return (
    <Wrap>
      <ID>
        <Static className="id">
          <Title>아이디</Title>
          <Box>{email}</Box>
        </Static>
        <Static className="user">
          <Title>회원구분</Title>
          <Box>{type_id === 2 ? "파트너 회원" : "스타트업 회원"} </Box>
        </Static>
      </ID>
      <Pw>
        <Title>비밀번호</Title>
        <button onClick={openModal}>비밀번호 변경</button>
      </Pw>
      <Name>
        <Title>이름</Title>
        <Input>
          <input type="text" placeholder={name} onChange={handleName} />
        </Input>
      </Name>
      <Phone>
        <Title>휴대 전화 번호</Title>
        <Input>
          <input
            type="text"
            placeholder={phone_number}
            onChange={handlePhonenumber}
          />
        </Input>
        {/* <button onClick={validatePhoneNumber}>인증하기</button> */}
      </Phone>
      <BtnWrap>
        {/* <Link to="/Mypage"> */}
        <SaveBtn
          style={{ background: BtnTrue ? "#1a2536" : "#ccc" }}
          onClick={saveData}
        >
          프로필저장
        </SaveBtn>
        {/* </Link> */}
        <Link to="/Mypage">
          <CancleBtn>취소</CancleBtn>
        </Link>
      </BtnWrap>

      {Modal && <ModalChangePw />}
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
  color: #fff;
`;
const CancleBtn = styled(Btn)`
  border: 1px solid #1a2536;
  color: #1a2536;
`;
