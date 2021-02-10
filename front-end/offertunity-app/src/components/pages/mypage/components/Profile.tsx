import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

type Props = {
  data: any;
};

const Profile: React.FC<Props> = ({ data }) => {
  const {
    name,
    profile_picture,
    email,
    signup_method_id,
    company_id,
    phone_number,
    type_id,
  } = data;
  console.log(data);

  let profileImg = null;
  if (!profile_picture) {
    profileImg = (
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-JdoMKl_cBoE-qqWZjn7OH-dvmZK73uVZ9w&usqp=CAU"
        alt="프로필사진"
      />
    );
  } else {
    profileImg = <img src={profile_picture} alt="프로필사진" />;
  }

  return (
    <Wrap>
      <Img>
        <span>{profileImg}</span>
        <p>{name}</p>
      </Img>
      <Text>
        <Box className="box">
          <Info>
            <span>아이디</span>
            <p>{email}</p>
          </Info>
          <Info>
            <span>가입경로</span>
            <p>{signup_method_id === 1 && "이메일"}로 가입하기 회원</p>
          </Info>
          <Info>
            <span>회원 구분</span>
            <p>
              {type_id === 1 && "스타트업 회원"}
              {type_id === 2 && "파트너 회원"}
            </p>
          </Info>
          <Link to="/EditMypage">
            <BtnOne>프로필 수정</BtnOne>
          </Link>
        </Box>
        <Box>
          <Info>
            <span>휴대 전화 번호</span>
            <p>{phone_number ? phone_number : "000-0000-0000"}</p>
          </Info>
          <Info>
            <span>
              {type_id === 1 && "소속 스타트업"}
              {type_id === 2 && "파트너 기관"}
            </span>
            {type_id === 2 && (
              <p>{company_id ? company_id : "파트너 기관을 등록해주세요"}</p>
            )}
            {type_id === 1 && (
              <p>{company_id ? company_id : "마이 스타트업을 등록해주세요"}</p>
            )}
          </Info>
          <BtnTwo>
            {type_id === 1 && (
              <Link to="/workstation/mystartup">마이 스타트업 관리</Link>
            )}
            {type_id === 2 && (
              <Link to="/workstation/mypartner">파트너 기관 관리</Link>
            )}
          </BtnTwo>
        </Box>
      </Text>
    </Wrap>
  );
};

export default Profile;

const Wrap = styled.div`
  box-shadow: 0px 6px 16px #53526217;
  background: #fff;
  display: flex;
  padding: 3.4rem 0;
  margin-bottom: 2rem;
  border-radius: 0.5rem;
`;

const Img = styled.div`
  width: 20%;
  margin: 0 10.5rem 0 10.06rem;
  text-align: center;
  span {
    display: inline-block;
    width: 11.4rem;
    height: 11.4rem;
    border-radius: 100%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  p {
    text-align: center;
    margin-top: 2.5rem;
    font-size: 2.25rem;
    font-weight: bold;
  }
`;

const Text = styled.div`
  display: flex;
  align-items: center;
`;

const Info = styled.div`
  margin-bottom: 2rem;
`;

const Box = styled.div`
  position: relative;
  display: inline-block;
  font-size: 0.9rem;
  height: 19.44rem;
  &.box {
    margin-right: 6rem;
  }
  p {
    font-weight: bold;
    margin-top: 1rem;
  }
`;

const BTN = styled.button`
  width: 16rem;
  height: 2.8rem;
  border-radius: 0.3rem;
  line-height: 2.8rem;
  cursor: pointer;
`;

const BtnOne = styled(BTN)`
  background: #1a2536;
  color: #fff;
`;

const BtnTwo = styled(BTN)`
  position: absolute;
  bottom: 1.4rem;
  border: 1px solid #1a2536;
  color: #1a2536;
`;
