import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import EditProfileImg from "./components/EditProfileImg";

import WorkStation from "./components/WorkStation";
import * as Mt from "api/methods";

const EditMypage: React.FC = (Props) => {
  const [data, setData] = useState({});

  const _token = Mt.getUserInfo().token;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/users/mypage`, {
        headers: {
          Authorization: _token,
        },
      })
      .then((res) => {
        setData(res.data);
        console.log(data);
      });
  }, []);

  return (
    <Wrap>
      <Center>
        <Station>
          <Link to="/">홈 </Link>
          <i className="fas fa-chevron-right" />
          <Link to="/Mypage"> 마이페이지</Link>
          <i className="fas fa-chevron-right" /> 프로필 수정
        </Station>
        <Box>
          <EditProfileImg data={data} />
        </Box>
        <WorkStation />
      </Center>
    </Wrap>
  );
};

export default EditMypage;

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
