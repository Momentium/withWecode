import React, { useState } from "react";
import styled from "styled-components";
import LikeBtn from "../../../common/detail/buttons/Buttons";
import Title from "./Title";
import axios from "axios";
import * as Mt from "api/methods";

const Card = ({ data, name, background, service, isLogin, id }: any) => {
  const [like, setLike] = useState<boolean>(data.is_liked);
  const _token = Mt.getUserInfo().token;
  const cardImage = {
    backgroundImage: `url(${data.startups[0].thumbnail})`,
    backgroundSize: background,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  const clickLike = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isLogin) {
      axios
        // .get(`http://10.0.1.44:3000/likes/company/${id}`, {
        .get(`${process.env.REACT_APP_URL}/likes/company/${id}`, {
          headers: {
            Authorization: `${_token}`,
          },
        })
        .then((res) => setLike(!like))
        .catch((error) => console.log(error));
    } else {
      alert("오퍼튜니티에 로그인 하신 후 이용해 주시기 바랍니다.");
    }
  };

  return (
    <Wrapper className={name}>
      <Image style={cardImage} className={name}>
        <div className="likebtnWrap">
          <LikeBtn
            isLike={like}
            clickLike={clickLike}
            page={"list"}
            isLogin={isLogin}
          />
        </div>
      </Image>
      <BottomCon className={name}>
        <Title title={data.name} />
        {service ? (
          <Service>
            <span>주요 서비스</span>
          </Service>
        ) : null}
        <Description className={name}>{data.description}</Description>
      </BottomCon>
      <LabelWrapper>
        {data.tag.map((element: any, idx: number) => (
          <Label key={idx}>{element}</Label>
        ))}
      </LabelWrapper>
    </Wrapper>
  );
};

export default Card;

const Wrapper = styled.div`
  cursor: pointer;
  &.startupList {
    position: relative;
    width: 18.875rem;
    height: 435px;
    margin-bottom: 2rem;
    padding: 2rem;
    border: 1px solid #c6c6c6;
  }

  &.startupList:not(:nth-child(4n)) {
    margin-right: 1.5rem;
  }

  &.issueStartup {
    width: 25rem;
  }

  &.issueStartup:not(:nth-child(3n)) {
    margin-right: 2.5rem;
  }
`;

const Image = styled.div`
  width: 14.875rem;
  height: 10.375rem;
  display: flex;
  justify-content: flex-end;

  .likebtnWrap {
    position: absolute;
    right: 1%;
    top: 2%;
  }

  &.issueStartup {
    position: relative;
    width: 100%;
    height: 16.667rem;
    margin-bottom: 0.958rem;
  }
`;

const Description = styled.div`
  width: 100%;
  overflow: hidden;
  margin-top: 0.5rem;
  font-size: 0.938rem;

  &.issueStartup {
    height: 55px;
  }

  &.startupList {
    height: 90px;
  }
`;
const LabelWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const Service = styled.div`
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  margin-top: 1rem;
  margin-bottom: 8px;

  span {
    margin-right: 1.5rem;
    color: #5541ed;
  }
`;

const Label = styled.div`
  height: 26px;
  border: 1px solid #c2bdf0;
  padding: 4px 8px;
  margin-top: 1rem;
  color: #c2bdf0;
  font-size: 11px;
  font-weight: 400;

  &:not(:last-child) {
    margin-right: 8px;
  }
`;

const ShortDescription = styled.div`
  margin: 1.5rem 0 1rem 0;
  font-size: 0.938rem;
  font-weight: bold;
`;

const BottomCon = styled.div`
  &.issueStartup {
    height: 120px;
  }

  &.startupList {
    height: 120px;
  }
`;
