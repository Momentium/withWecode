import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Zoom } from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';

interface Props {
  value: string;
}

const SelectBtnPrsnt:React.FC<Props> = ({ value }) => {
  const [zoomIn, setZoomIn] = useState<boolean>(true);
  const handleClick = () => {
    setZoomIn(!zoomIn);
  }

  return (
    <StSelectBtnWrap onClick={handleClick} >
      {"value"}
      <StBtnWrap>
        <ExpandMore style={{visibility: 'hidden'}}/>
        <Zoom in={zoomIn} style={{position: 'absolute', top: 0, left: 0, zIndex: 1,}}><ExpandMore/></Zoom>
        <Zoom in={!zoomIn} style={{position: 'absolute', top: 0, left: 0, zIndex: 2,}}><ExpandLess/></Zoom>
      </StBtnWrap>
    </StSelectBtnWrap>
  );
};
export default SelectBtnPrsnt;

const StSelectBtnWrap = styled(Button)`
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

const StBtnWrap = styled.div`
  position: relative;
  display: flex;
  margin-left: 4px;
`;
