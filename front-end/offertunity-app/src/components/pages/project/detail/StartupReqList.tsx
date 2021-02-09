import React from "react";
import styled from "styled-components";

const StartupReqList = ({ reqList }: any) => {
  const tabs = ["스타트업", "산업", "기술", "지원날짜", "평가점수", "지원날짜"];
  return (
    <List>
      <div className="top">
        <p>{reqList?.length}기업</p>
        <DownloadAll>전체 다운</DownloadAll>
      </div>
      <TabCont>
        {tabs.map((el, idx) => {
          return <Tab>{el}</Tab>;
        })}
      </TabCont>
      <StartupList>
        {reqList?.map((el: any, idx: any) => {
          return (
            <>
              <Startup key={idx}>
                <span>{el.title}</span>
                <span>{el.sanup}</span>
                <span>{el.tech}</span>
                <span>{el.date}</span>
              </Startup>
            </>
          );
        })}
      </StartupList>
    </List>
  );
};

export default StartupReqList;

const List = styled.div`
  width: 100%;
  margin-top: 32px;
`;

const TabCont = styled.div`
  height: 88px;
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
`;

const Tab = styled.div`
  font-size: 21px;
  font-weight: bold;
`;

const StartupList = styled.div`
  display: flex;
  flex-direction: column;
`;

const Startup = styled.div`
  height: 88px;
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  padding: 0px 15px;

  &:hover {
    background: #f9f9fc 0% 0% no-repeat padding-box;
    box-shadow: 0px 6px 16px #dfdfea;
    border-radius: 10px;
  }
`;

const PassOrFail = styled.div`
  display: flex;
`;

const PFBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  font-weight: bold;
  box-shadow: 0;
  transition: box-shadow 1s ease-in-out;

  &.hover {
    background: #f9f9fc 0% 0% no-repeat padding-box;
    box-shadow: 0px 6px 16px #dfdfea;
    border-radius: 39px;
  }
`;

const DownloadAll = styled.span`
  margin-left: 24px;
  font-size: 21px;
  font-weight: bold;
  text-decoration: underline;
  color: #5541ed;
`;
