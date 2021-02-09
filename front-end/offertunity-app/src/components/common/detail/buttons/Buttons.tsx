import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import LikeBtn from "./LikeBtn";
import ShareBtn from "../../../common/button/iconBtn/ShareBtn";
import IRBtn from "./IRButton";
const boxStyle = {
  marginRight: "3.531rem",
};
const Buttons = ({ title, type, page, isLike, clickLike }: any) => {
  return (
    <>
      {page === ("list" || "project" || "partner") ? (
        <span>
          <LikeBtn isLike={isLike} clickLike={clickLike} />
        </span>
      ) : (
        <BtnBox>
          <IRBtn boxStyle={boxStyle} title={title} type={type} />
          <ShareAndLike>
            <span>
              <LikeBtn isLike={isLike} clickLike={clickLike} />
            </span>
            <ShareBtn />
          </ShareAndLike>
        </BtnBox>
      )}
    </>
  );
};
export default Buttons;
const BtnBox = styled.div`
  display: flex;
  align-items: center;
`;
const ShareAndLike = styled.div`
  display: flex;
  &:first-child {
    margin-right: 6.25rem;
  }
  span {
    display: inline-block;
    margin-right: 2rem;
  }
`;
