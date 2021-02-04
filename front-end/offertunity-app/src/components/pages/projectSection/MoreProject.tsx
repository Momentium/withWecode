import React from 'react';
import styled from 'styled-components';

const MoreProject = () => {
  return(
    <More>
      <div>더보기</div>
      <img src="/projectImg/arrow.png" alt="더보기"/>
    </More>
  )
};

export default MoreProject;

const More =styled.button`
  display:inline-block;
  width: 5.18rem;
  cursor:pointer;
  p{
    font-size:0.8rem;
    font-weight:normal;
  }
  img{
    display:inherit;
  }
`;
