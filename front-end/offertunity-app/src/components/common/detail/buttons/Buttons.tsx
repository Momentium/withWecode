import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import LikeBtn from "./LikeBtn";
import ShareBtn from "../../../common/button/iconBtn/ShareBtn";
import IRBtn from "./IRButton";

const boxStyle = {
  marginRight: "3.531rem",
};

const Buttons = ({ data, title, type, companyId, page, isLogin }: any) => {
  const [like, setLike] = useState<boolean>(data);

  useEffect(() => {
    getLikeData();
  }, []);

  const getLikeData = () => {
    if (isLogin) {
      axios
        .get(`${process.env.REACT_APP_URL}/likes/company/${companyId}`, {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        })
        .then((res) => setLike(res.data.result))
        .catch((error) => console.log(error));
    } else {
      setLike(false);
    }
  };

  const clickLike = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isLogin) {
      getLikeData();
    } else {
      alert("로그인후에 이용 가능합니다.");
    }
  };

  return (
    <>
      {page === ("list" || "project" || "partner") ? (
        <span>
          <LikeBtn isLike={like} clickLike={clickLike} />
        </span>
      ) : (
        <BtnBox>
          <IRBtn boxStyle={boxStyle} title={title} type={type} />
          <ShareAndLike>
            <span>
              <LikeBtn isLike={like} clickLike={clickLike} />
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
