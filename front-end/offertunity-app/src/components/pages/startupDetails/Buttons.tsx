import React from "react";
import styled from "styled-components";
import LikeBtn from "../../common/button/iconBtn/LikeBtn";
import ShareBtn from "../../common/button/iconBtn/ShareBtn";
import IRBtn from "./IRBtn";

interface Props {
  like: boolean;
  clickLike: any;
}

const boxStyle = {
  marginRight: "3.531rem",
};

const Buttons: React.FC<Props> = ({ like, clickLike }) => {
  return (
    <BtnBox>
      <IRBtn boxStyle={boxStyle} />
      <ShareAndLike>
        <LikeBtn isLike={like} clickLike={clickLike} />
        <ShareBtn />
      </ShareAndLike>
    </BtnBox>
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
`;
