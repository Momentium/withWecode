import React from 'react';
import styled from "styled-components";


type Props = {
  ask:string
  button:string
}


const Question:React.FC<Props> = ({ask, button}) => {
  return(
    <Wrap>
      <span>{ask}</span>
      <button>{button}</button>
    </Wrap>
  )
};

export default Question;

const Wrap = styled.div`
  span{
   font-size:0.18rem;
  }
  button{
    color:#5541ED;
    font-size:0.18rem;
    cursor: pointer;
    border-bottom:1px solid #5541ED;
  }
`;