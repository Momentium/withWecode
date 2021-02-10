import React, { useState } from "react";
import styled from "styled-components";
import ApplyDetail from "./ApplyDetail";

const StartupReqList = ({ reqList }: any) => {
  const [visiblePopUp, setVisiblePopUp] = useState(false);
  const tabs = ["", "스타트업", "산업", "기술", "지원날짜"];

  const handleDetailInfo = (e: any) => {
    const id = e.currentTarget.id;
    window.open(`/project/apply/${id}`, "_blank");
  };

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
        {reqList?.map((el: any) => {
          return (
            <>
              <Startup id={el.id} onClick={handleDetailInfo}>
                <ImageLogo>
                  <img src={el.logoImg} />
                </ImageLogo>
                <span>{el.name}</span>
                <span>{el.sector}</span>
                <span>{el.technology}</span>
                <span>{el.appliedDate.slice(0, 10)}</span>
              </Startup>
            </>
          );
        })}
      </StartupList>
      {visiblePopUp && <ApplyDetail />}
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
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
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
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  padding: 0px 15px;

  &:hover {
    background: #f9f9fc 0% 0% no-repeat padding-box;
    box-shadow: 0px 6px 16px #dfdfea;
    border-radius: 10px;
  }
`;

const DownloadAll = styled.span`
  margin-left: 24px;
  font-size: 21px;
  font-weight: bold;
  text-decoration: underline;
  color: #5541ed;
`;

const ImageLogo = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 100%;

  img {
    width: 100%;
    height: 100%;
  }
`;
