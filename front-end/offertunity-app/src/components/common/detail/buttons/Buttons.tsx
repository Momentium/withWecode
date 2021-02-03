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

  const getLikeData = () => {
    if (isLogin) {
      axios
        .get(`http://10.0.1.44:3000/likes/company/${companyId}`, {
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

  useEffect(() => {
    getLikeData();
  }, []);

  const clickLike = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isLogin) {
      getLikeData();
    } else {
      alert("로그인 진행해주세요");
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