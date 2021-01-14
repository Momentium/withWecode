import React from 'react';
import styled from 'styled-components';

interface Props {
  data:any
  index:number
}

const NewCard:React.FC<Props> = ({data, index}) => {
  const {order,title,minititle,date,img} = data;

  return (

    <Card key={index}>
      <Number>{order}</Number>
      <TxtWrap>
        <Newtitle>{title}</Newtitle>
        <NewMinititle>{minititle}</NewMinititle>
        <NewDate>{date}</NewDate>
      </TxtWrap>
      <img src={img} alt={title}/>
    </Card>

  )
};

export default NewCard;

const Card =styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom:1.56rem;
  img{
    width:7.5rem;
    height: 5rem;
  }
`;

const Number = styled.span`
  font-size:1.75rem;
  font-weight:bold;
`;

const TxtWrap = styled.div`
  display: inline-block;
  padding:0 1.25rem;
`;

const Newtitle =styled.p`
  font-size:0.9rem;
`;

const NewMinititle = styled.p`
  margin:0.3rem 0;
  font-size:0.8rem;
  color:#9F9F9F;
`;

const NewDate = styled.p`
  font-size:0.8rem;
  color:#5541ED;
`;