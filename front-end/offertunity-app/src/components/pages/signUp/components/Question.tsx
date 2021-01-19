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
   font-size:1.25rem;
  }
  button{
    color:red;
    font-size:1.25rem;
    cursor: pointer;
  }
`;