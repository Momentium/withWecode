import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const MoveBar = () => {
  return (
    <InformationCompany>
      <Link to="/">홈 &nbsp;</Link>
      &gt; &nbsp;
      <Link to="/list">스타트업 &nbsp;</Link>
      &gt; &nbsp;오퍼튜니티
    </InformationCompany>
  );
};

export default MoveBar;

const InformationCompany = styled.div`
  margin-top: 2.5rem;
  margin-bottom: 4rem;
`;
