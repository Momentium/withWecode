import React, { useEffect, useState } from 'react';
import styled from "styled-components";



type Props = {
  title:string
  content:string
  notionOne:string
  notionTwo:string
}


const Modal:React.FC<Props> = ({title, content, notionOne, notionTwo}) => {

  const [open,setOpen] = useState(true);

  return(
    <ModalWrap style={{display:open? "block" : "none"}}>
      <Box>
        <CloseButton onClick={() =>{setOpen(!open)}}>
          <button></button>
        </CloseButton>
        <Title>{title}</Title>
        <Content>{content}</Content>
        <Notion>{notionOne}<br/>{notionTwo}</Notion>
        <Button>확인</Button>
      </Box>
    </ModalWrap>
  )
};

export default Modal;

const ModalWrap = styled.div`
  z-index:10;
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height:100vh;
  background:rgba(0,0,0,0.7);
`;

const Box = styled.div`
  position:absolute;
  top:20%;
  left:20%;
  width:60rem;
  height:30rem;
  padding-left:8rem;
  text-align:left;
  background:#fff;
  background-image:url("/images/signUp/modalBg.png");
  background-repeat:no-repeat;
  background-position-y: bottom;
  background-position-x:right;
  background-size:22rem;
`;

const Title = styled.p`
  text-align:center;
  padding:3rem 8rem 4.375rem 0;
  font-size:1.31rem;
  font-weight:bold;
`;
const Content = styled.p`
  font-size:2.25rem;
  font-weight: bold;
`;

const Notion = styled.p`
  font-size:0.9rem;
  line-height:1.5rem;
  padding:2.5rem 0 4.5rem 0;
`;

const Button = styled.button`
  width:15.5rem;
  height:3rem;
  text-align:center;
  line-height:3rem;
  font-size:18;
  background:#5541ED;
  border-radius:0.3rem;
  color:#fff;
`;

const CloseButton = styled.div`
  position:absolute;
  top:1.5rem;
  right:1.5rem;
  background-image:url("/images/signUp/remove.png");
  background-size:contain;
  background-repeat:no-repeat;
  cursor:pointer;
  button{
    width:1.25rem;
    height:1.25rem;
  }
`;