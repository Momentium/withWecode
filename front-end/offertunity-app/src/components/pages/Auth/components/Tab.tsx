import React, {  useState } from 'react';
import styled from "styled-components";
import { useHistory } from 'react-router-dom';



const Tab = () => {
  const [idTxt,setIdTxt] = useState(false)
  const [pwTxt,setPwTxt] = useState(false)
  const history = useHistory();

  const findId =(event:any)=>{
    event.preventDefault();
    history.push('/FindId');
    setIdTxt(!idTxt);
  }

  const findPw =(event:any)=>{
    event.preventDefault();
    history.push('/FindPw');
    setPwTxt(!pwTxt);
  }



  return(
    <Wrap>
      <TabMenu>
        <Id onClick={findId} className={idTxt ? 'active' :""}>아이디 찾기</Id>
        <Password onClick={findPw} className={pwTxt ? 'active' :""}>비밀번호 찾기</Password>
      </TabMenu>  
    </Wrap>
  )
};

export default Tab;

const Wrap = styled.div`
  width:100%;
  background:#F9F8FA;
  height:6.5rem;
`;

const TabMenu = styled.div`
  padding-top:5rem;
  margin-left:20rem;
  span{
    margin-right:3rem;
    font-size:1rem;
    font-weight:bold;
    color:#9F9F9F;
    cursor: pointer;
  }
  span.active{
    color:#5541ED;
    border-bottom: 2px solid #5541ED;
  }
`;

const Id = styled.span``;
const Password = styled.span``;