import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import StartupReqList from "./StartupReqList";
import * as Mt from "api/methods";

const ProjectRequestList = ({ data, text, id, btn }: any) => {
  const [reqList, setReqList] = useState();

  const stepBy = [
    {
      num: "Step.1",
      text: "지원자 선택",
    },
    {
      num: "Step.2",
      text: "지원 내용 확인",
    },
    {
      num: "Step.3",
      text: "지원 내용별 채점 기록",
    },
    {
      num: "Step.3",
      text: "전체 합산 후 점수 확인",
    },
    {
      num: "Step.5",
      text: "합격/불합격 선택",
    },
  ];

  const _token = Mt.getUserInfo().token;

  useEffect(() => {
    axios
      // .get(`http://10.0.1.44:3000/applies/${id}`, {
      .get(`${process.env.REACT_APP_URL}/applies/${id}`, {
        headers: {
          Authorization: `${_token}`,
        },
      })
      .then((res) => setReqList(res.data.applicants));
  }, []);

  return (
    <ReqListCon>
      <h2>이용방법 안내</h2>
      <StepInfo>
        {stepBy.map((item, idx) => {
          return (
            <>
              <Wrapper>
                <div className="numTitle">
                  <span>{item.num}</span>
                </div>
                <div className="content">
                  <span>{item.text}</span>
                </div>
              </Wrapper>
            </>
          );
        })}
      </StepInfo>
      <CurrReq>
        <h2>지원자 현황</h2>
        <StartupReqList reqList={reqList} />
      </CurrReq>
      <ButtonCont>{btn}</ButtonCont>
    </ReqListCon>
  );
};

export default ProjectRequestList;

const ReqListCon = styled.section`
  margin-top: 120px;
  h2 {
    font-weight: bold;
    font-size: 28px;
    margin-bottom: 32px;
  }
`;

const StepInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 64px;
  width: 1281px;
  height: 256px;
  background: #f9f9fc 0% 0% no-repeat padding-box;
`;

const Wrapper = styled.div`
  position: static;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-right: 52px;

  .numTitle {
    margin-bottom: 24px;
    font-size: 20px;
    color: #5541ed;
    font-weight: bold;
  }

  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 128px;
    height: 128px;
    background: #ffffff 0% 0% no-repeat padding-box;
    border-radius: 100%;

    span {
      width: 70%;
      text-align: center;
    }
  }
`;

const CurrReq = styled.div`
  margin-top: 96px;

  .top {
    display: flex;
    p {
      font-size: 21px;
    }
  }
`;

const ButtonCont = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;
