import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface Props {
  snsLink: {}
}

const FooterP:React.FC<Props> = ({snsLink}) => {
  return (
    <StFooterWrap>
      <div className="left-cont">
        <div className="company"></div>
        <div className="info">
          <div>대표이사 백양제 조원선 | 사업자번호 654-87-01239 | help@momentium.fo.kr</div>
          <div>서울특별시 강남구 강남대로 327 대륭서초타워 16층</div>
        </div>
      </div>
      <div className="right-cont">
        <div className="instagram"></div>
        <div className="facebook"></div>
      </div>
    </StFooterWrap>
  );
};
export default FooterP;

const StFooterWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left-cont {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .right-cont {

  }
`;