import React from 'react';
import styled from 'styled-components';
import { Button, } from '@material-ui/core';

interface Props {
  value: string;
  changeSelect: (e: React.MouseEvent<HTMLElement>) => void;
}

const SelectItem:React.FC<Props> = ({ value, changeSelect }) => {
  return (
    <StItemWrap onClick={changeSelect}>
      {value}
    </StItemWrap>
  );
};

export default SelectItem;

const StItemWrap = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;

  background: #F1F9FF 0% 0% no-repeat padding-box;
  border: 2px solid #BCE0FD;
  border-radius: 10px;
  padding: 8px 16px;
  opacity: 1;
  text-align: left;

  .MuiButton-label {
    margin-left: 4px;
  }

  font: normal normal normal 14px/16px Arial;
  letter-spacing: 0px;
  color: #2699FB;
  opacity: 1;
`;