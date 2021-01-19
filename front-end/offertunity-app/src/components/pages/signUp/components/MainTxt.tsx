import React from 'react';
import styled from "styled-components";


type Props = {
  subtitle:string
  subtitletwo:string
  title:string
}


const MainTxt:React.FC<Props> = ({subtitle,subtitletwo,title}) => {
  return(
    <Text>
      <p>{subtitle}<br/>{subtitletwo}</p>
      <span>{title}</span>
    </Text>
    
  )
};

export default MainTxt;

const Text = styled.div`
  display: inline-block;
  margin-bottom:4.5rem;
  p{
    font-size:1.5rem;
    margin-bottom:3rem;
    line-height:3rem;
  }
  span{
    font-size:4.5rem;
    font-weight:bold;
  }
`;

