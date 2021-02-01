import React, { useState } from "react";
import styled from "styled-components";

const EditProfile = () => {
  const [previewURL, setpreviewURL] = useState("");

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
        <img src={previewURL} alt="프로필사진" />
      </span>
      <label>
        프로필 사진등록
        <input
          id="upload"
          type="file"
          accept="image/jpg,image/png,image/jpeg,image/gif"
          onChange={handleImg}
        />
      </label>
      <button>
        <p>회원탈퇴</p>
        <i className="fas fa-chevron-right" />
      </button>
    </Img>
  );
};

export default EditProfile;

const Img = styled.div`
  position: relative;
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
  input {
    position: absolute;
    top: 14rem;
    left: 2rem;
    margin-top: 2.5rem;
    z-index: -8;
  }
  label {
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
  }
  button {
    margin-top: 7rem;
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
  }
`;
