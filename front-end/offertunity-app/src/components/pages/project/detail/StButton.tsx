import { userInfo } from "os";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const StButton = ({ changePage, text, userType }: any) => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (userType) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, []);

  return visible ? (
    <StButtonWrap onClick={changePage}>{text}</StButtonWrap>
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
