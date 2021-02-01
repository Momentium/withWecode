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
        <input
          type="file"
          accept="image/jpg,image/png,image/jpeg,image/gif"
          placeholder="프로필 사진 등록"
          onChange={handleImg}
        />
      </label>
    </Img>
  );
};

export default EditProfile;

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
`;
