import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Profile from "./components/Profile";
import WorkStation from "./components/WorkStation";
import Box from "./components/Box";
import Level from "./components/Level";
import Card from "./components/Card";

const Mypage: React.FC = () => {
  const [profileData, setProfileData] = useState({});
  const [successData, setSuccessData] = useState();
  const [interestData, setInterestData] = useState();
  const [irData, setIrData] = useState();
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    getProfileData();
    getSuccessData();
    getInterestData();
    getIrData();
    getCardData();
  }, []);

  const getProfileData = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/users/mypage`, {
        headers: {
          Authorization: `token ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setProfileData(res.data.userInfo);
        console.log(res.data);
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

  const getCardData = () => {
    axios.get("/data/mypageInterestList.json").then((res) => {
      setCardData(res.data.data);
    });
  };

  return (
    <>
      <Wrap>
        <Center>
          <Station>
            <Link to="/">홈</Link> <i className="fas fa-chevron-right" />
            마이페이지
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
      <Intertest>
        {cardData.map((el: any, idx: number) => {
          return <Card data={el} key={idx} index={idx} />;
        })}
      </Intertest>
    </>
  );
};

export default Mypage;

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
  cursor: pointer;
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

const Intertest = styled.div`
  ${({ theme }) => theme.conWidth};
`;
