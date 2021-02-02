import React from "react";
import styled from "styled-components";

type Props = {
  success: any;
  interest: any;
  ir: any;
};

const Box: React.FC<Props> = ({ success, interest, ir }) => {
  return (
    <Wrap>
      <Text>
        <p>
          {success && "마이 스타트업 완성률"}
          {interest && "관심 지원사업"}
          {ir && "IR 자료 요청 건"}
        </p>
        {success && <span>{success}%</span>}
        {interest && <span>{interest}개</span>}
        {ir && <span>{ir}회</span>}
      </Text>
      <div>
        <Button>
          {success && "마이 스타트업 정보 관리"}
          {interest && "지원 사업 관리"}
          {ir && "IR자료 요청/검토 현황"}
        </Button>
      </div>
    </Wrap>
  );
};

export default Box;

const Wrap = styled.div`
  display: inline-block;
  width: 24.5rem;
  height: 16.5rem;
  background: #fff;
  box-shadow: 0px 6px 16px #53526217;
  text-align: center;
  border-radius: 0.5rem;
`;

const Text = styled.div`
  display: inline-block;
  padding-top: 3rem;
  text-align: left;
  p {
    font-size: 1.3rem;
  }
  span {
    display: inline-block;
    margin: 1.5rem 0 2rem 0;
    font-size: 2.875rem;
    font-weight: bold;
  }
`;

const Button = styled.button`
  cursor: pointer;
  width: 15.38rem;
  height: 3rem;
  border: 1px solid #3b24eb;
  border-radius: 2rem;
  font-size: 0.9rem;
  color: #3b24eb;
`;
