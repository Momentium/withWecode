import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import ModalWrap from "./ModalWithdrawal";
import * as Mt from "api/methods";
import EditForm from "./EditForm";

type Props = {
  data: any;
};

const EditProfileImg: React.FC<Props> = ({ data }) => {
  const [previewURL, setpreviewURL] = useState("");
  const [Modal, setModal] = useState(false);
  const [removeImg, setRemoveImg] = useState(false);
  const { profile_picture } = data;
  console.log(profile_picture);
  const _token = Mt.getUserInfo().token;

  const handleImg = (event: any) => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onload = (event: any) => {
      const base64 = reader.result;
      if (base64) {
        setpreviewURL(base64.toString());
      }
    };

    if (file && file.type.match("image.*")) {
      setRemoveImg(false);
      reader.readAsDataURL(file);
    } else {
      ProfileImg = (
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-JdoMKl_cBoE-qqWZjn7OH-dvmZK73uVZ9w&usqp=CAU"
          alt="프로필사진"
        />
      );
    }
  };
  const removeImges = () => {
    setRemoveImg(true);
  };

  let ProfileImg = null;
  if (!profile_picture && !previewURL) {
    ProfileImg = (
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-JdoMKl_cBoE-qqWZjn7OH-dvmZK73uVZ9w&usqp=CAU"
        alt="프로필사진"
      />
    );
  }
  if (!profile_picture && previewURL) {
    ProfileImg = <img src={previewURL} alt="프로필사진" />;
  }
  if (profile_picture) {
    ProfileImg = <img src={profile_picture} alt="프로필사진" />;
  }

  if (removeImg) {
    ProfileImg = (
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-JdoMKl_cBoE-qqWZjn7OH-dvmZK73uVZ9w&usqp=CAU"
        alt="프로필사진"
      />
    );
  }

  const profile_img = ProfileImg?.props.src;

  return (
    <>
      <Img>
        <span>
          <i className="fas fa-times" onClick={removeImges} />
          {ProfileImg}
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
      <EditForm data={data} profileSrc={profile_img} />
    </>
  );
};

export default EditProfileImg;

const Img = styled.div`
  position: relative;
  width: 30%;
  margin: 3rem 7.5rem 0 6.06rem;
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
    i {
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
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
  left: 6rem;
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
