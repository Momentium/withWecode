import React, { useState } from "react";
import styled from "styled-components";
import ModalWrap from "./ModalWithdrawal";

const EditProfile = () => {
  const [previewURL, setpreviewURL] = useState("");
  const [Modal, setModal] = useState(false);

  const handleImg = (event: any) => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onload = (event: any) => {
      setpreviewURL(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Img>
      <span>
        {previewURL ? (
          <img src={previewURL} alt="프로필사진" />
        ) : (
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-JdoMKl_cBoE-qqWZjn7OH-dvmZK73uVZ9w&usqp=CAU"
            alt="프로필사진"
          />
        )}
      </span>
      <Label>
        프로필 사진등록
        <input
          id="upload"
          type="file"
          accept="image/jpg,image/png,image/jpeg,image/gif"
          onChange={handleImg}
        />
      </Label>
      <Notion>*권장 사이즈 : 400x400</Notion>
      <Button
        onClick={() => {
          setModal(!Modal);
        }}
      >
        <p>회원탈퇴</p>
        <i className="fas fa-chevron-right" />
      </Button>
      {Modal && <ModalWrap />}
    </Img>
  );
};

export default EditProfile;

const Img = styled.div`
  position: relative;
  width: 20%;
  margin: 3rem 10.5rem 0 10.06rem;
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
`;

const Button = styled.button`
  margin-top: 3rem;
  font-size: 0.8rem;
  color: #898989;
  cursor: pointer;
  p {
    display: inline-block;
    border-bottom: 1px solid #898989;
  }
  i {
    margin-left: 0.5rem;
  }
`;

const Notion = styled.p`
  margin-top: 6rem;
  font-size: 0.8rem;
  color: #898989;
`;

const Label = styled.label`
  position: absolute;
  top: 14rem;
  left: 2rem;
  width: 11.5rem;
  height: 2.5rem;
  line-height: 2.5rem;
  border: 1px solid #1a2536;
  border-radius: 24px;
  font-weight: bold;
  cursor: pointer;

  input {
    position: absolute;
    top: 14rem;
    left: 2rem;
    margin-top: 2.5rem;
    z-index: -8;
  }
`;
