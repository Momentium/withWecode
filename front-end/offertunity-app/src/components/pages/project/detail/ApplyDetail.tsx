import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Card from "./Card";
import Description from "./Description";
import Files from "./Files";
import ShareIcon from "@material-ui/icons/Share";
import GetAppIcon from "@material-ui/icons/GetApp";

const ApplyDetail = ({ match }: any) => {
  const _resId = match.params.id;

  return (
    <Cont>
      <Header>
        <Link to="/">
          <div className="logoBox">
            <img src="/images/header/logo.png" alt="로고" />
          </div>
        </Link>
        <ShareAndDown>
          <ShareIcon />
          <GetAppIcon />
        </ShareAndDown>
      </Header>
      <Content>
        <Card />
        <Description />
        <Files />
        <ButtonCont>
          <Button>저장</Button>
        </ButtonCont>
      </Content>
    </Cont>
  );
};

export default ApplyDetail;

const Cont = styled.div``;

const Header = styled.div`
  width: 100%;
  height: 64px;
  padding: 0px 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fbfaff 0% 0% no-repeat padding-box;

  .logoBox {
    width: 154px;
    height: 19px;
    img {
      width: 100%;
      height: 100%;
    }
  }
`;

const Content = styled.div`
  width: 100%;
  padding: 0px 80px;
  margin-top: 40px;
`;

const ShareAndDown = styled.div`
  display: flex;

  svg {
    margin-right: 10px;
    font-size: 33px;
    color: #5542ed;
  }
`;

const ButtonCont = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const Button = styled.button`
  width: 390px;
  height: 56px;
  background-color: #5541ed;
  color: white;
`;
