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
        <div className="btntxt">
          <p>{title}</p>
          <span>{ex}</span>
        </div>
      </Button>
    </Wrap>
  )
};

export default Box;

const Wrap = styled.div`
  width:25rem;
  text-align:center;
`;

const Subtitle = styled.p`
  margin-bottom:4rem;
  font-size:1.3rem;
  font-weight: bold;
  line-height:2rem;
`;

const Button = styled.div`
  width:100%;
  height:18.75rem;
  border-radius:0.5rem;
  text-align:left;
  cursor: pointer;
  .btntxt{
    padding: 2rem
  }
  p{
    margin-bottom:1.8rem;
    font-size:2.25rem;
    font-weight: bold;
  }
  span{
    font-size:0.9rem;
    font-weight: bold;
  }

  &:hover{
    background-color:rgba(0,0,0,0.7);
    transition:.2s;
    p{
      color:#fff;
    }
    span{
      color:#fff;
    }
  }
`;



