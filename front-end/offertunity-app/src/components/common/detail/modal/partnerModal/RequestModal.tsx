import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const RequestModal = ({ title, onChange, handleRequest }: any) => {
  const [items, setItems] = useState<any>();
  const [showList, setShowList] = useState(false);
  const [selectText, setSelectText] = useState<string | null>();

  useEffect(() => {
    axios
      .get("data/partnerData/uploadData.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((res) => {
        const data = res.data.data;
        setItems(data);
      });
  }, []);

  console.log(items);
  useEffect(() => {
    if (items?.length) {
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
    handleRequest(
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
    <>
      <Title>IR 자료 전달</Title>
      <Content>
        <BackpicLeft />
        <BackpicRight />
        <CompanyTitle>{title}</CompanyTitle>
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
    </>
  );
};

export default RequestModal;

const Title = styled.div`
  width: 100%;
  left: 0;
  color: #5b5b5b;
  font-size: 1.313rem;
  font-weight: bold;
`;

const Content = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 1.5rem;
  width: 40.25rem;

  .selectTitle {
    width: 80%;
    margin-bottom: 0.5rem;
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
  width: 6.375rem;
  height: 10rem;
  margin-left: 45rem;
  bottom: 0;
  background-image: url("/images/partnerDetail/backpic.png");
  background-repeat: no-repeat;
  z-index: -1;
`;

const CompanyTitle = styled.h1`
  font-weight: bold;
  font-size: 1.875rem;
  margin-bottom: 3rem;
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
    margin-bottom: 1rem;
  }

  div:last-child {
    margin-bottom: 3rem;
  }

  div span:first-child {
    margin-right: 2.5rem;
    color: #898989;
  }
`;

const DataBtn = styled.button`
  width: 9.313rem;
  height: 2.5rem;
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

  /* &:focus {
    outline: none;
  } */

  .select-options {
    position: absolute;
    width: 100%;
    margin-top: 0.25rem;
    border: 1px solid #5541ed;
    border-radius: 6px;

    li {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.938rem;
      height: 2.75rem;
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
  padding: 0.375rem 1.25rem;
  border: 1px solid #5541ed;
  border-radius: 6px;
  background-color: #fbfaff;

  &.select-text {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.938rem;
  }

  &.select-text::after {
    content: "";
    width: 0.625rem;
    height: 0.625rem;
    background-image: url("/images/partnerDetail/arrow.png");
    background-repeat: no-repeat;
    position: absolute;
    right: 0.938rem;
    top: 0.938rem;
    border: 7px solid transparent;
  }
`;

const CheckMsg = styled.div`
  width: 80%;
  height: 4.625rem;
  margin-top: 1.5rem;
  margin-bottom: 4.5rem;
  border: 1px solid #b7b7b7;
  padding: 1.188rem;

  span {
    color: #898989;
    font-size: 0.813rem;
  }
`;
