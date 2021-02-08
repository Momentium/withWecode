import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Tab = () => {
  const [idTxt, setIdTxt] = useState(false);
  const [pwTxt, setPwTxt] = useState(false);

  const findId = (event: any) => {
    setIdTxt(!idTxt);
  };

  const findPw = (event: any) => {
    setPwTxt(!pwTxt);
  };

  return (
    <Wrap>
      <TabMenu>
        <Link to="/auth/FindId">
          <Id onClick={findId} className={idTxt ? "active" : ""}>
            아이디 찾기
          </Id>
        </Link>
        <Link to="/auth/FindPw">
          <Password onClick={findPw} className={pwTxt ? "active" : ""}>
            비밀번호 찾기
          </Password>
        </Link>
      </TabMenu>
    </Wrap>
  );
};

export default Tab;

const Wrap = styled.div`
  width: 100%;
  background: #f9f8fa;
  height: 6.5rem;
`;

const TabMenu = styled.div`
  padding-top: 5rem;
  margin-left: 20rem;
  span {
    margin-right: 3rem;
    font-size: 1rem;
    font-weight: bold;
    color: #9f9f9f;
    cursor: pointer;
  }
  span.active {
    color: #5541ed;
    border-bottom: 2px solid #5541ed;
  }
`;

const Id = styled.span``;
const Password = styled.span``;
