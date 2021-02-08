import React from 'react';
import styled from "styled-components";

const Or = () => {
  return(
    <OrWrap>
      <span />
      <p>또는</p>
      <span />
    </OrWrap>
  )
};

export default Or;

const OrWrap =styled.div`
  font-size:0.8rem;
  line-height:1.438rem;
  color:#898989;
  p{
    display: inline-block;
    width: 5rem;
  }
  span{
    display: inline-block;
    vertical-align: middle;
    width:9.8rem;
    height:1px;
    background-color:#898989;
  }
`;