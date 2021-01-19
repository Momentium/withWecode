import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Button, Zoom, Collapse } from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';

interface Props {
  popList: boolean;
  popSelectList: (e: React.MouseEvent<HTMLElement>) => void; 
  value: string|null;
  compList: JSX.Element[];
}

const SelectBtnPrsnt:React.FC<Props> = (props) => {
  const [btnH, setBtnH] = useState<number|undefined>(0);
  const btnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // console.log(btnRef.current?.clientHeight);
    setBtnH(btnRef.current?.clientHeight);
  }, []);

  return (
    <StSelectBtnCont>
      <div ref={btnRef}>
        <StSelectBtnWrap onClick={props.popSelectList} >
          {props.value}
          <StBtnWrap>
            <ExpandMore style={{visibility: 'hidden'}}/>
            <Zoom in={!props.popList} style={{position: 'absolute', top: 0, left: 0, zIndex: 1,}}><ExpandMore/></Zoom>
            <Zoom in={props.popList} style={{position: 'absolute', top: 0, left: 0, zIndex: 2,}}><ExpandLess/></Zoom>
          </StBtnWrap>
        </StSelectBtnWrap>
      </div>

      <StListCont topPos={btnH}>
        <div className="abs-cont">
          <Collapse in={props.popList}>
              {props.compList}
          </Collapse>
        </div>
      </StListCont>

    </StSelectBtnCont>
  );
};
export default SelectBtnPrsnt;

const StSelectBtnCont = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;
`;

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
    text-align: center;
    font: normal normal normal 15px/20px Spoqa Han Sans Neo;
    letter-spacing: 0px;
    color: #000000;
    opacity: 1;
  }

  letter-spacing: 0px;
  color: #2699FB;
  opacity: 1;
`;

const StBtnWrap = styled.div`
  position: relative;
  display: flex;
  margin-left: 4px;
`;

const StListCont = styled.div<{topPos:number|undefined}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .abs-cont {
    position: absolute;
    top: ${props => `${props.topPos}px`};
    transform: translateY(8px);
    z-index: 5;
  }
`;