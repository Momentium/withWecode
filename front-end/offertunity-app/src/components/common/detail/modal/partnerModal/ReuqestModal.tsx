import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const RequestModal = ({ title, onChange, onClick }: any) => {
  const [items, setItems] = useState([]);
  const [showList, setShowList] = useState(false);
  const [selectText, setSelectText] = useState<string | null>();

  useEffect(() => {
    axios.get("data/partnerData/uploadData.json").then((res) => {
      const data = res.data.data;
      setItems(data);
    });
  }, []);

  useEffect(() => {
    if (items.length !== 0) {
      setSelectText("IR 자료 선택하기");
    } else {
      setSelectText("등록된 IR 자료가 없습니다");
    }
  }, [items]);

  const handleListDisplay = () => {
    if (items.length) {
      setShowList(!showList);
    }
  };

  const handleOptionClick = (event: React.MouseEvent) => {
    setSelectText(event.currentTarget.getAttribute("data-name"));
    setShowList(false);
    onChange(true);
    onClick(
      items.find(
        (item: any) =>
          item.title === event.currentTarget.getAttribute("data-name")
      )
    );
  };

  const goToUploadData = () => {
    window.location.replace("/mypage");
  };

  return (
    <Content>
      <BackpicLeft />
      <BackpicRight />
      <Title>{title}</Title>
      <Information>
        <StartupInfo>
          <div>
            <span>스타트업 이름</span>
            <span>오퍼튜니티</span>
          </div>
          <div>
            <span>담당자 이메일</span>
            <span>offertunity@offertunity.kr</span>
          </div>
        </StartupInfo>
        <DataBtn onClick={goToUploadData}>IR 자료 등록하기</DataBtn>
      </Information>
      <p className="selectTitle">IR 자료 선택하기</p>
      <SelectContainer>
        <SelectData
          className={showList ? "select-text active" : "select-text"}
          onClick={handleListDisplay}
        >
          {selectText}
        </SelectData>
        {showList && (
          <ul className="select-options">
            {items.map((option: any, idx: number) => {
              return (
                <li
                  className="select-option"
                  data-name={option.title}
                  onClick={handleOptionClick}
                  key={idx}
                >
                  {option.title}
                </li>
              );
            })}
          </ul>
        )}
      </SelectContainer>
      <CheckMsg>
        <span>
          *선택하신 IR 자료는 해당 투자자 파트너에게 전달됩니다.
          <br />
          보내기 전 다시 한번 꼭 확인해주세요!
        </span>
      </CheckMsg>
    </Content>
  );
};

export default RequestModal;

const Content = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 24px;
  width: 644px;

  .selectTitle {
    width: 80%;
    margin-bottom: 8px;
    font-weight: bold;
  }
`;

const BackpicLeft = styled.div`
  position: absolute;
  width: 102px;
  height: 160px;
  padding-right: 800px;
  bottom: 0px;
  background-image: url("/images/partnerDetail/backpic2.png");
  background-repeat: no-repeat;
  z-index: -1;
`;

const BackpicRight = styled.div`
  position: absolute;
  width: 102px;
  height: 160px;
  margin-left: 750px;
  bottom: 0px;
  background-image: url("/images/partnerDetail/backpic.png");
  background-repeat: no-repeat;
  z-index: -1;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 30px;
  margin-bottom: 48px;
`;

const Information = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const StartupInfo = styled.div`
  display: flex;
  flex-direction: column;

  div:first-child {
    margin-bottom: 16px;
  }

  div:last-child {
    margin-bottom: 48px;
  }

  div span:first-child {
    color: #898989;
    margin-right: 40px;
  }
`;

const DataBtn = styled.button`
  width: 149px;
  height: 40px;
  border-radius: 3px;
  color: white;
  background-color: #5541ed;
  cursor: pointer;
`;

const SelectContainer = styled.div`
  width: 80%;
  height: 48px;
  display: inline-block;
  text-align: center;
  position: relative;

  &:focus {
    outline: none;
  }

  .select-options {
    position: absolute;
    width: 100%;
    margin-top: 4px;
    border: 1px solid #5541ed;
    border-radius: 6px;

    li {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 15px;
      height: 44px;
      background: #ffffff;
      border-radius: 6px;
      cursor: pointer;

      &:nth-of-type(2n) {
        background: #fbfaff;
      }
    }
  }
`;

const SelectData = styled.div`
  width: 100%;
  height: 100%;
  padding: 6px 20px;
  border: 1px solid #5541ed;
  border-radius: 6px;
  background-color: #fbfaff;

  &.select-text {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
  }

  &.select-text::after {
    content: "";
    width: 10px;
    height: 10px;
    background-image: url("/images/partnerDetail/arrow.png");
    background-repeat: no-repeat;
    position: absolute;
    right: 15px;
    top: 15px;
    border: 7px solid transparent;
  }
`;

const CheckMsg = styled.div`
  width: 80%;
  height: 74px;
  margin-top: 24px;
  margin-bottom: 72px;
  border: 1px solid #b7b7b7;
  padding: 19px;

  span {
    color: #898989;
    font-size: 13px;
  }
`;
