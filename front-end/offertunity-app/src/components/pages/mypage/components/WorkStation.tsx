import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as Mt from "api/methods";

const WorkStation = () => {
  const typeId = Mt.getUserInfo().type_id;
  console.log(typeId);
  return (
    <Wrap>
      <Text>
        마이페이지는 프로필 관리와 간략한 프로젝트 현황 정보를 포함하고
        있습니다. <br />
        스타트업 정보, 지원사업. 투자 관리 등은
        <Link
          to={
            typeId === 2 ? "/workstation/mypartner" : "/workstation/mystartup"
          }
        >
          <span>[워크스테이션]</span> 을 이용해주세요!
        </Link>
      </Text>
      <Link
        to={typeId === 2 ? "/workstation/mypartner" : "/workstation/mystartup"}
      >
        <Button>워크 스테이션 바로가기</Button>
      </Link>
    </Wrap>
  );
};

export default WorkStation;

const Wrap = styled.section`
  ${({ theme }) => theme.ConWidth};
  display: flex;
  box-shadow: 0px 6px 16px #53526217;
  background: #fff;
  padding: 3.4rem 0 3.6rem 0;
  font-size: 0.93rem;
  margin-bottom: 2rem;
  border-radius: 0.5rem;
`;

const Text = styled.div`
  display: inline-block;
  margin: 0 17.06rem 0 11.25rem;
  line-height: 1.5rem;
  span {
    color: #5541ed;
    cursor: pointer;
  }
`;

const Button = styled.button`
  cursor: pointer;
  width: 18.88rem;
  height: 3.12rem;
  border-radius: 0.3rem;
  color: #fff;
  background: #5541ed;
  cursor: pointer;
`;
