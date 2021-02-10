import React from "react";
import styled from "styled-components";

const Card = () => {
  const stack = [
    {
      title: "산업 영역",
      content: "커머스",
    },
    {
      title: "기술",
      content: "블록체인",
    },
    {
      title: "서비스 형태",
      content: "웹사이트",
    },
  ];

  const info = [
    {
      title: "사업자 구분",
      content: "개인",
    },
    {
      title: "사업자 등록 번호",
      content: "000-00-00000",
    },
    {
      title: "기업 주소",
      content: "서울시 강남구 역삼대로234234",
    },
    {
      title: "직원 수",
      content: "1~10명",
    },
    {
      title: "홈페이지",
      content: "ㅇ리ㅓㄴㅇ링ㄴ랑ㄴ",
    },
  ];

  return (
    <CardBox>
      <div>
        <Profile>
          <Image>
            <img src="/images/profile.png" />
          </Image>
          <UserInfo>
            <h2>오퍼튜니티</h2>
            <span>황노아</span>
            <span>010-1234-1234</span>
            <span>wweweqweqrqfqfq@gmail.com</span>
          </UserInfo>
        </Profile>
        <CompanyStack>
          {stack.map((el) => {
            return (
              <div className="stackWrapper">
                <span>{el.title}</span>
                <span className="content">{el.content}</span>
              </div>
            );
          })}
        </CompanyStack>
      </div>
      <div>
        <CompanyInfo>
          {info.map((el) => {
            return (
              <div className="stackWrapper">
                <span>{el.title}</span>
                <span className="content">{el.content}</span>
              </div>
            );
          })}
        </CompanyInfo>
      </div>
    </CardBox>
  );
};

export default Card;

const CardBox = styled.div`
  display: flex;
  width: 100%;
`;

const Profile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 680px;
  height: 280px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #c2bdf0;
  border-radius: 24px;

  h2 {
    margin-bottom: 32px;
  }
  span {
    margin-bottom: 16px;
  }
`;

const Image = styled.div`
  width: 142px;
  height: 142px;
  border-radius: 100%;
  margin-right: 64px;

  img {
    width: 100%;
    height: 100%;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 28px;
    font-weight: bold;
  }

  span {
    font-size: 18px;
    font-weight: bold;
  }
`;

const CompanyStack = styled.div`
  display: flex;
  margin-top: 16px;

  .stackWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 16px;

    width: 216px;
    height: 216px;

    background-color: #f9f9fc;
    border-radius: 24px;

    span {
      margin-bottom: 32px;
    }

    .content {
      font-weight: bold;
    }
  }
`;

const CompanyInfo = styled.div`
  width: 416px;
  height: 512px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #c2bdf0;
  border-radius: 24px;
  .stackWrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin: 40px 48px;

    span {
      margin-bottom: 10px;
    }

    .content {
      font-weight: bold;
    }
  }
`;
