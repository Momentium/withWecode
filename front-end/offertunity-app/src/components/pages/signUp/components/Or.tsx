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
  font-size:1.25rem;
  line-height:1.438rem;
  p{
    display: inline-block;
    width: 5rem;
  }
  span{
    display: inline-block;
    vertical-align: middle;
    width:17.8rem;
    height:1px;
    background-color:#707070;
  }
`;