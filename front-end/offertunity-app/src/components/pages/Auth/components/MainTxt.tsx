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
  margin-bottom:2.5rem;
  p{
    font-size:1.3rem;
    margin-bottom:3rem;
    line-height:2rem;
  }
  span{
    font-size:3.3rem;
    font-weight:bold;
  }
`;
