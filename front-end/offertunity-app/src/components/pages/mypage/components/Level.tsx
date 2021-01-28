import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProgressBar from "./ProgressBar";
import CheckBtn from "./CheckBtn";
import axios from "axios";

const Level: React.FC = () => {
  const [checked, setChecked] = useState([]);
  useEffect(() => {
    axios.get("/data/level.json").then((res) => {
      setChecked(res.data.data);
    });
  }, []);

  return (
    <Wrap>
      <Title>
        <p>마이 스타트업 등록 단계</p>
        <span>
          마이 스타트업 정보 관리 <i className="fas fa-chevron-right" />
        </span>
      </Title>
      <ProgressBar />
      <BtnWrap>
        {checked.map((el: any, idx: number) => {
          return <CheckBtn data={el} key={idx} index={idx} />;
        })}
      </BtnWrap>
    </Wrap>
  );
};

export default Level;

const Wrap = styled.div`
  background: #fff;
  box-shadow: 0px 6px 16px #53526217;
  border-radius: 0.5rem;
  padding: 3rem 5rem;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  p {
    font-size: 1.3rem;
    font-weight: bold;
  }
  span {
    font-size: 0.9rem;
    color: #3b24eb;
    border-bottom: 1px solid #3b24eb;
    i {
      color: #00000029;
      margin-left: 1rem;
    }
  }
`;

const BtnWrap = styled.div`
  margin: 3rem 0 0 3rem;
`;
