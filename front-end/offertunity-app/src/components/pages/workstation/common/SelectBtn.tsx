import React, { useState } from 'react';
import styled from 'styled-components';
import { Zoom, Collapse } from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';

const SelectBtn:React.FC<any> = ({ cName, mode, width, curVal, changeVal }) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(!isOpen);
  }
  const handleSelect = (e:any) => {
    setOpen(false)
    changeVal(e);
  }

  return (
    <StBtnCont>
      <div style={{position: "relative"}}>
      <StBtnWrap style={{visibility:"hidden"}} width={width} isOpen={isOpen}>&nbsp;</StBtnWrap>
      <StBtnWrap style={{position: "absolute", top: 0, left: 0, zIndex: 10 }} width={width} isOpen={isOpen} onClick={handleOpen}>
        {curVal}
        <StSvgWrap>
          <ExpandMore style={{visibility: 'hidden'}}/>
          <Zoom in={!isOpen} style={{position: 'absolute', top: 0, left: 0, zIndex: 11,}}><ExpandMore/></Zoom>
          <Zoom in={isOpen} style={{position: 'absolute', top: 0, left: 0, zIndex: 12, color: '#5541ED'}}><ExpandLess/></Zoom>
        </StSvgWrap>
      </StBtnWrap>
      </div>
      <div style={{position: "relative"}}>
        <div style={{position: 'absolute', top: 2, left: 0, zIndex: 13}}>
          <Collapse in={isOpen}>
            <StListCont width={width}>
              {
                (selectData as any)[mode].map((el: string, idx: number) => 
                  curVal !== el && 
                  <StListWrap key={idx} 
                    className={cName}
                    onClick={handleSelect}
                  >
                  {el}</StListWrap>
                )
              }
            </StListCont>
          </Collapse>
        </div>
      </div>
    </StBtnCont>
  );
}
export default SelectBtn;

const StBtnCont = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 18px;
`;

const StBtnWrap = styled.div<{width:number, isOpen:boolean}>`
  cursor: pointer;
  width: ${props => `${props.width}px`};
  height: 48px;
  border: 1px solid ${props => props.isOpen ? '#5541ED' : '#CDCDCD'};
  border-radius: 6px;
  padding: 0 16px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  transition: all 0.1s ease;
`;

const StSvgWrap = styled.div`
  position: relative;
  display: flex;
`;

const StListCont = styled.div<{width:number}>`
  width: ${props => `${props.width}px`};
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  border: 1px solid #C2BDF0;
  border-radius: 5px;

  background: white;
`;

const StListWrap = styled.div`
  cursor: pointer;

  width: 100%;
  height: 48px;
  padding: 0 10px;

  display: flex;
  align-items: center;

  background: white;
  border: 6px solid white;
  border-radius: 5px;

  &:hover {
    background: #C2BDF0;
  }
`;

const selectData = {
  sector: [
    '라이프스타일',
    '커머스',
    '식품',
    '뷰티',
    '반려동물',
    '서비스',
    '금융',
    '모빌리티',
    '바이오/헬스케어',
    '교육',
    '패션',
    '여행',
    '스포츠',
    '게임',
    '농축수산업',
    '방송/통신',
    '기타'
  ],
  tech: [
    "빅데이터",
    "AI",
    "블록체인",
    "로봇/드론",
    "전자상거래",
    "클라우드",
    "IoT",
    "AR/VR",
    "플랫폼",
    "데이터솔루션",
    "기타"
  ],
  invest: [
    "엔젤투자",
    "시드투자",
    "프리 시리즈 A",
    "시리즈 A",
    "시리즈 B",
    "시리즈 C"
  ],
  investCost: [
    "1천만원 - 5천만원",
    "6천만원 - 1억원",
    "2억원 - 5억원",
    "6억원 - 10억원",
    "11억원 - 50억원",
    "51억원 이상"
  ],
  bizType: [
    "개인",
    "법인"
  ],
  employees: [
    "1 - 10명",
    "11 - 20명",
    "21 - 30명",
    "31명 이상"
  ],
  supportField: [
    "자금",
    "시설 공간",
    "사업화",
    "멘토링, 컨설팅",
    "기술지원",
    "해외진출",
    "마케팅",
    "R&D",
    "기타"
  ],
  eligibility: [
    "예비창업자",
    "3년 미만",
    "5년 미만",
    "7년 미만",
    "제한없음",
  ],
}