import React, { useEffect, useState } from "react";
import styled from "styled-components";

const StButton = ({ changeDetail }: any) => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const getUserInfo = sessionStorage.getItem("userInfo");
    const userInfo = JSON.parse(String(getUserInfo));

    if (userInfo?.type_id === 1) {
      setVisible(true);
    } else if (userInfo?.type_id === 2) {
      setVisible(false);
    } else {
      setVisible(false);
    }
  }, []);

  return visible ? (
    <StButtonWrap onClick={changeDetail}>지원하기</StButtonWrap>
  ) : (
    <StButtonWrap className="disabled" disabled>
      지원하기
    </StButtonWrap>
  );
};

export default StButton;

const StButtonWrap = styled.button`
  width: 18.75rem;
  height: 3.5rem;
  background: #5541ed;
  border-radius: 5px;
  color: white;
  font-size: 1.125rem;
  font-weight: bold;
  cursor: pointer;

  &.disabled {
    background: gray;
    cursor: not-allowed;
  }
`;
