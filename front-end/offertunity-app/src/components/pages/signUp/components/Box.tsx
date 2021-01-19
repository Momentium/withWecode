import React from 'react';
import styled from "styled-components";

type Props = {
  SubtitleOne:string
  SubtitleTwo: string
  title: string
  ex:string
}

const Box:React.FC<Props> = ({SubtitleOne,SubtitleTwo,title,ex}) => {
  return(
    <Wrap>
      <Subtitle>{SubtitleOne}<br/>{SubtitleTwo}</Subtitle>
      <Button>
        <p>{title}</p>
        <span>{ex}</span>
      </Button>
    </Wrap>
  )
};

export default Box;

const Wrap = styled.div`
  width:36.81rem;
  text-align:center;
`;

const Subtitle = styled.p`
  margin-bottom:2.3rem;
  font-size:1.8rem;
  font-weight: bold;
  line-height:3rem;
`;

const Button = styled.button`
  width:100%;
  height:23rem;
  border:0.18rem solid black;
  cursor: pointer;
  p{
    margin-bottom:1.8rem;
    font-size:3.125rem;
  }
  span{
    font-size:1.25rem;
    font-weight: bold;
    color: #2699FB;
  }

  &:hover{
    background-color:#000;
    transition:.2s;
    p{
      color:#fff;
    }
    span{
      color:#fff;
    }
  }
`;



