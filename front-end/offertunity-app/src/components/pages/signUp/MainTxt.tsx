import React from 'react';
import styled from "styled-components";


type Props = {
  subtitle:string
  title:string
}


const MainTxt:React.FC<Props> = ({subtitle,title}) => {
  return(
    <Text>
      <p>{subtitle}</p>
      <span>{title}</span>
    </Text>
  )
};

export default MainTxt;

const Text = styled.div`
  p{
    font-size:1.8rem;
    margin-bottom:1rem;
  }
  span{
    font-size:5rem;
    font-weight:bold;
  }
`;

