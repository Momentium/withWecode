import React from 'react';
import styled from "styled-components";

type Props = {
  txt:string
}

const Button:React.FC<Props> = ({txt}) => {
  return(
    <div>
      <Btn>
        <span>{txt}</span>
        <i className="fas fa-chevron-right"></i>
      </Btn>
    </div>
  )
};

export default Button;

const Btn = styled.span`
  font-size:0.9rem;
  color:#5541ED;
  cursor: pointer;
  span{
    font-weight:bold;
    border-bottom:1px solid #5541ED;
  }
  i{
    margin-left:0.9rem;
    color: #707070;
  }
`;

