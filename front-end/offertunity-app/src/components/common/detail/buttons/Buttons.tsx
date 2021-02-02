import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import LikeBtn from "../../../common/button/iconBtn/LikeBtn";
import ShareBtn from "../../../common/button/iconBtn/ShareBtn";
import IRBtn from "./IRButton";

const boxStyle = {
  marginRight: "3.531rem",
};

// {
//   headers: {
//     'Authorization': sessionStorage.React::DevTools::lastSelection
//   }
// }

const Buttons = ({ data, title, type, companyId }: any) => {
  const [like, setLike] = useState<boolean>(data);

  const clickLike = (e: React.MouseEvent<HTMLDivElement>) => {
    axios
      .post(`http://10.0.1.44:3000/likes/company/${companyId}`, {
        params: {
          companyId: companyId,
        },
      })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
    setLike(!like);
  };

  return (
    <BtnBox>
      <IRBtn boxStyle={boxStyle} title={title} type={type} />
      <ShareAndLike>
        <span>
          <LikeBtn isLike={like} clickLike={clickLike} />
        </span>
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

  span {
    display: inline-block;
    margin-right: 2rem;
  }
`;
