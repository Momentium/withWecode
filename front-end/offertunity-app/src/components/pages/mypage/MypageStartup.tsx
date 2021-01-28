import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Profile from "./components/Profile";
import WorkStation from "./components/WorkStation";
import Box from "./components/Box";
import Level from "./components/Level";
import Interested from "./components/Interested";

const MypageStartup: React.FC = () => {
  const [profileData, setProfileData] = useState({});
  const [successData, setSuccessData] = useState();
  const [interestData, setInterestData] = useState();
  const [irData, setIrData] = useState();

  useEffect(() => {
    getProfileData();
    getSuccessData();
    getInterestData();
    getIrData();
  }, []);

  const getProfileData = () => {
    axios.get("/data/mypageStartup.json").then((res) => {
      setProfileData(res.data.data.profile);
    });
  };

  const getSuccessData = () => {
    axios.get("/data/boxone.json").then((res) => {
      setSuccessData(res.data.Percentage);
    });
  };
  const getInterestData = () => {
    axios.get("/data/boxtwo.json").then((res) => {
      setInterestData(res.data.interestIn);
    });
  };
  const getIrData = () => {
    axios.get("/data/boxthree.json").then((res) => {
      setIrData(res.data.ir);
    });
  };

  return (
    <>
      <Wrap>
        <Center>
          <Station>
            홈 <i className="fas fa-chevron-right" /> 마이페이지
          </Station>
          <Profile data={profileData} />
          <WorkStation />
          <BoxWrap>
            <Box success={successData} interest={""} ir={""} />
            <Box success={""} interest={interestData} ir={""} />
            <Box success={""} interest={""} ir={irData} />
          </BoxWrap>
          <Level />
        </Center>
      </Wrap>

      <Title>내가 관심있는 스타트업</Title>
      <Interested />
    </>
  );
};

export default MypageStartup;

const Wrap = styled.div`
  background: #f9f8fa;
  border-top: 1px solid #00000029;
  padding-bottom: 7.6rem;
`;

const Center = styled.div`
  ${({ theme }) => theme.conWidth}
`;

const Station = styled.div`
  padding: 2.5rem 0 4.063rem 0;
  font-size: 0.937rem;
  i {
    margin: 0 0.5rem;
  }
`;

const BoxWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const Title = styled.p`
  ${({ theme }) => theme.conWidth};
  padding: 7.5rem 0 3.5rem 0;
  font-size: 1.75rem;
  font-weight: bold;
`;
