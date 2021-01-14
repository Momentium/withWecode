import React from 'react';
import styled from 'styled-components';

const MoreProject = () => {
  return(
    <More>
      <p>더보기</p>
      <img src="/projectImg/arrow.png" alt="더보기"/>
    </More>
  )
};

export default MoreProject;

const More =styled.div`
  display:inline-block;
  width:5.18rem;
  p{
    font-size:0.8rem;
    font-weight:normal;
  }
`;
