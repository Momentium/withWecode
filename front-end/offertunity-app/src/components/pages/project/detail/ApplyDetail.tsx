import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ShareBtn from "../../../common/button/iconBtn/ShareBtn";
import Card from "./Card";
import Description from "./Description";
import Files from "./Files";

const ApplyDetail = ({ match }: any) => {
  const _resId = match.params.id;

  return (
    <Cont>
      <Header>
        <Link to="/">
          <img src="/images/header/logo.png" alt="로고" />
        </Link>
        <ShareAndDown>
          <ShareBtn />
        </ShareAndDown>
      </Header>
      <Card />
      <Description />
      <Files />
      <ButtonCont>
        <Button>저장</Button>
      </ButtonCont>
    </Cont>
  );
};

export default ApplyDetail;

const Cont = styled.div``;

const Header = styled.div`
  display: flex;
`;

const ShareAndDown = styled.div``;

const ButtonCont = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  width: 390px;
  height: 56px;
  background-color: #5541ed;
  color: white;
`;
