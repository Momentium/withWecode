import React from "react";
import Title from "components/common/title/Title";
import MiniTitle from "components/common/title/MiniTitle";
import styled from "styled-components";
import Flicking from "@egjs/react-flicking";

const CompanyTeamInfo = ({ data }: any) => {
  const flicking = React.useRef() as React.MutableRefObject<any>;
  const moveToLeft = () => {
    flicking.current.prev();
  };

  const moveToRight = () => {
    flicking.current.next();
  };
  const flickingContainer = {
    width: "100%",
    height: "14rem",
  };

  return (
    <TeamBox>
      <Title title={"팀소개"} />
      <ShortInfo>
        <MiniTitle title={"한 줄 소개"} />
        <span>{data.team_intro}</span>
      </ShortInfo>
      <div className="bottomBox">
        <TeamCount>
          <MiniTitle title={"팀원 수"} />
          <div className="count">{data.company_members.length}명</div>
        </TeamCount>
        <TeamMember>
          <div className="box">
            <MiniTitle title={"팀원 소개"} />
            {data.company_members.length < 5 ? null : (
              <ControlBtns>
                <LeftBtn onClick={moveToLeft} />
                <RightBtn onClick={moveToRight} />
              </ControlBtns>
            )}
          </div>
          <ImageContainer>
            <Flicking
              className="flicking0"
              gap={64}
              bound={true}
              lastIndex={data.company_members.length}
              style={flickingContainer}
              ref={flicking}
            >
              {data.company_members.map((item: any, idx: number) => {
                return (
                  <ProfileInfo key={idx}>
                    <ProfileImg>
                      <img src={item.img} alt="사원의 프로필 사진입니다." />
                    </ProfileImg>
                    <div className="name">{item.name}</div>
                    <div className="job">{item.position}</div>
                  </ProfileInfo>
                );
              })}
            </Flicking>
          </ImageContainer>
        </TeamMember>
      </div>
    </TeamBox>
  );
};

export default CompanyTeamInfo;

const TeamBox = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 10rem;

  .bottomBox {
    display: flex;
    height: 22.5rem;
  }
`;

const ShortInfo = styled.div`
  display: flex;
  width: 100%;
  height: 5.5rem;
  margin-top: 1.5rem;
  margin-bottom: 2rem;
  padding: 2rem 2.5rem 2rem 2.5rem;
  border: 1px solid #d9d9d9;
  border-radius: 6px;

  span {
    margin-left: 4.5rem;
  }
`;

const TeamCount = styled.div`
  display: flex;
  flex-direction: column;
  width: 15%;
  height: 100%;
  margin-right: 1.5rem;
  padding: 2rem 2.5rem 2.5rem 2rem;
  border: 1px solid #d9d9d9;
  border-radius: 6px;

  .count {
    margin-top: 113px;
    text-align: center;
  }
`;
const TeamMember = styled.div`
  display: flex;
  flex-direction: column;
  width: 83%;
  height: 100%;
  padding: 2rem 2.5rem 4rem 2rem;
  border: 1px solid #d9d9d9;
  border-radius: 6px;

  .box {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 1.938rem;
  z-index: -10;
`;

const ProfileImg = styled.div`
  width: 8.375rem;
  height: 8.375rem;
  border-radius: 10%;

  img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
    object-fit: cover;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  .name {
    margin: 1rem 0;
  }
`;

const ControlBtns = styled.div`
  height: 1.188rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const LeftBtn = styled.button`
  width: 0.6rem;
  height: 1rem;
  margin-right: 2.5rem;
  background-image: url("/images/startupDetail/leftarrow.png");
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
`;

const RightBtn = styled.button`
  width: 0.6rem;
  height: 1rem;
  background-image: url("/images/startupDetail/rightarrow.png");
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
`;
