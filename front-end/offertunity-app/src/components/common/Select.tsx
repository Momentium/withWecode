import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

interface CProps {
  curPage: string
  category: string
}

const Select:React.FC<CProps> = ({ curPage, category }) => {
  const [select, setSelect] = useState<any>(null);
  useEffect(() => {
     axios.get('data/selectData.json')
     .then((res) => {
      const resData = res.data;
      const cateList = resData[curPage];
      const selectList = cateList[category];
      setSelect(<SelectP val={selectList[0]}/>)
     });
  }, []);

  return (
    <>
    {select}
    </>
  );
}
export default Select;

interface PProps {
  val: string,
}

const SelectP:React.FC<PProps> = ({ val }) => {
  return (
    <StSelectWrap>
      {val}
    </StSelectWrap>
  );
}

const StSelectWrap = styled.div`
  
  background: #F1F9FF 0% 0% no-repeat padding-box;
  border: 2px solid #BCE0FD;
  border-radius: 10px;
  opacity: 1;

  text-align: left;
  font: normal normal normal 14px/16px Arial;
  letter-spacing: 0px;
  color: #2699FB;
  opacity: 1;
`;