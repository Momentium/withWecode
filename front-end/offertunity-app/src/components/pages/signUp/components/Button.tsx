import React from 'react';
import styled from "styled-components";

type Props = {
  txt:string
}

const Button:React.FC<Props> = ({txt}) => {
  return(
    <Btn>{txt}</Btn>
  )
};

export default Button;

const Btn = styled.button`
  width:17.8rem;
  height:4.5rem;
  border:1px solid #707070;
  font-size:1.8rem;
  color:#2699FB;
  line-height:1.8rem;
  text-align:center;
`;

