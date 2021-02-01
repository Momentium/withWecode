import React from "react";
import styled from "styled-components";
import EditProfile from "./components/EditProfile";
import EditForm from "./components/EditForm";
import WorkStation from "./components/WorkStation";

const EditMypageStartup = () => {
  return (
    <Wrap>
      <Center>
        <Station>
          홈 <i className="fas fa-chevron-right" /> 마이페이지
          <i className="fas fa-chevron-right" /> 프로필 수정
        </Station>
        <Box>
          <EditProfile />
          <EditForm />
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
