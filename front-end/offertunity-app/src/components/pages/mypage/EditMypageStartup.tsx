import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import EditProfileImg from "./components/EditProfileImg";
import EditForm from "./components/EditForm";
import WorkStation from "./components/WorkStation";

const EditMypageStartup: React.FC = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/users/mypage`, {
        headers: {
          Authorization: `token ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setData(res.data.userInfo);
      });
  }, []);

  return (
    <Wrap>
      <Center>
        <Station>
          <Link to="/">홈 </Link>
          <i className="fas fa-chevron-right" />
          <Link to="/MypageStartup"> 마이페이지</Link>
          <i className="fas fa-chevron-right" /> 프로필 수정
        </Station>
        <Box>
          <EditProfileImg data={data} />
          <EditForm data={data} />
        </Box>
        <WorkStation />
      </Center>
    </Wrap>
  );
};

export default EditMypageStartup;

const Wrap = styled.div`
  background: #f9f8fa;
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

const Box = styled.div`
  box-shadow: 0px 6px 16px #53526217;
  background: #fff;
  display: flex;
  padding: 3.4rem 0;
  margin-bottom: 2rem;
  border-radius: 0.5rem;
`;
