import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Modal from "../components/Modal"



const InputBox = () => {

  const [modal,setModal] = useState(false);
  

  const [checkAll,setCheckAll] = useState(false);
  const [checkService,setCheckService] =useState(false);
  const [checkPersonalInfo,setCheckPersonalInfo]=useState(false);
  const [checkMarketing,setCheckMarketing]=useState(false);
 
  useEffect(() => {

      const True = (checkService && checkPersonalInfo && checkMarketing )
      setCheckAll(True);

  },[checkService,checkPersonalInfo,checkMarketing])

  const handleCheckAll = () => {
    setCheckAll(!checkAll)
    setCheckService(!checkAll);
    setCheckPersonalInfo(!checkAll);
    setCheckMarketing(!checkAll);
    
  }
  
  const service =()=>{
    setCheckService(!checkService)
  }
  const personal =()=>{
    setCheckPersonalInfo(!checkPersonalInfo)
  }
  const marketing =()=>{
    setCheckMarketing(!checkMarketing)
  }

  return(
    <Wrap>
       {modal && <Modal 
        title="이메일 인증하기" 
        content="22312@asnj.com" 
        notionOne="입력해주신 이메일로 인증번호를 보냈습니다." 
        notionTwo="확인 후 인증번호를 입력해주세요 !"
        /> }
      <Email>
        <p><span>*</span>E-mail (아이디)</p>
        <GetEmeil>
          <input type="text" placeholder="aaa@mail.com"/>
          <button>인증하기</button>
        </GetEmeil>
        <CheckEmeil>
          <input type="text" placeholder="인증번호를 입력해주세요."/>
          <button onClick={() =>{setModal(!modal)}}>
            인증확인
          </button>
        </CheckEmeil>
      </Email>
      <Name>
        <p><span>*</span>이름</p>
        <input type="text" placeholder="홍길동"/>
      </Name>

      <Pw>
        <p><span>*</span>비밀번호</p>
        <PwWrap>
          <input type="password" placeholder="비밀번호를 입력해주세요"/>
          <button/>
        </PwWrap>
        <span>영문,숫자,특수문자(!@#$%^&*+_)를 조합한 8자이상 </span>
      </Pw>

      <PwCheck>
        <p><span>*</span>비밀번호 확인</p>
        <PwWrap>
          <input type="password" placeholder="비밀번호를 다시 입력해주세요"/>
          <button/>
        </PwWrap>
        <PwAlert>비밀번호가 일치하지 않습니다.</PwAlert>
      </PwCheck>

      <Agree>
        <p><span>*</span>약관 동의</p>
        <CheckAll>
          <div onClick={handleCheckAll}>
            <i className={"fa-check-circle " + (checkAll? "fas" : "far")} style={{color:checkAll? "#707070" : "#D8D2D2"}}/>
            <span>모든 약관에 동의합니다.</span>
          </div>
          <button>펼쳐보기</button>
        </CheckAll>
          <Terms>
            <Term onClick={service}>
              <i className={"fa-check-circle " + (checkService? "fas" : "far")} style={{color:checkService? "#707070" : "#D8D2D2"}}/>
              <p>서비스 이용약관에 동의합니다. (필수)</p>
            </Term>
            <Term onClick={personal}>
              <i className={"fa-check-circle " + (checkPersonalInfo? "fas" : "far")} style={{color:checkPersonalInfo? "#707070" : "#D8D2D2"}}/>
              <p>개인정보 수집 및 이용 에 동의합니다. (필수)</p>
            </Term>
            <Term onClick={marketing}>
              <i className={"fa-check-circle " + (checkMarketing? "fas" : "far")} style={{color:checkMarketing? "#707070" : "#D8D2D2"}}/>
              <p>마케팅 정보 수신 동의합니다. (선택)</p>
            </Term>
          </Terms>
      </Agree>
    </Wrap>
  )
};

export default InputBox;

const Wrap =styled.div``;

const Input = styled.div `
  display: inline-block;
  margin-bottom:1rem;
  p{
    margin-bottom:0.5rem;
    font-size:0.9rem;
    color:#000;
    span{
      display: inline-block;
      font-size:1.1rem;
      color:#FF0000;
    }
  }
  input{
    margin-right:0.75rem;
    width:20rem;
    height:3rem;
    border:1px solid #D8D8D8;
    border-radius:0.3rem;
    padding:0.5rem 2.5rem 0.5rem 1rem;
    background:#fff;
    &::placeholder{
      font-size:0.9rem;
      color:#D8D8D8;
    }
    &:focus{
      outline:none;
    }
  }
  
`;

const Email = styled(Input)`
  button{
    position:absolute;
    top: 0.5rem;
    right:1.3rem;
    width:5.6rem;
    height:2rem;
    border-radius:0.3rem;
    color:#fff;
    cursor: pointer;
  }
`;

const GetEmeil = styled.div`
  position: relative;
  button{
    background:#C3BDF4;
  }
`;

const CheckEmeil = styled.div`
  position: relative;
  margin-top:1rem;
  button{
    background:#5541ED;
  }
`;

const Name = styled(Input)``;

const Pw = styled(Input)`
  span{
    margin-top:0.5rem;
    display:block;
    font-size:0.68rem;
    color:#898989;
  }
  `;

const PwCheck = styled(Input)``;

const PwAlert = styled.span`
  display: inline-block;
  border-radius:0.3rem;
  text-align:center;
  width:11.56rem;
  height:2rem;
  line-height:2rem;
  font-size:0.67rem;
  background:#C3BDF4;
  color:#fff;
`;

const PwWrap=styled.div`
  position:relative;
  display: inline-block;
    button{ 
      position:absolute;
      top:1rem;
      right:2rem;
      width:0.75rem;
      height:0.75rem;
      background-image:url("/images/signup/remove.png");
      background-size:contain;
      cursor:pointer;
    }
`;

const Agree = styled(Input)`
  
`;

const CheckAll = styled.div`
    width:20rem;
    height:3rem;
    border:1px solid #D8D8D8;
    border-radius:0.3rem;
    background:#fff;
    line-height:3rem;
  div{
    display: inline-block;
  }
  i{
    vertical-align:middle;
    margin:0 1.18rem;
    font-size:1.18rem;
    color:#D8D2D2;
    cursor: pointer;
  }
  span{
    cursor: pointer;
    font-weight: bold;
    font-size:0.9rem;
  }
  button{
    padding-right:1rem;
    display: inline-block;
    margin-left:2.56rem;
    font-size:0.68rem;
    color:#898989;
    background-image:url("/images/signup/arrowDownSmall.png");
    background-repeat:no-repeat;
    background-position:right;
    background-size:0.5rem;
  }
`;

const Terms = styled.div`
  padding:1rem 2rem;
  width:20rem;
  border:1px solid #D8D8D8;
  background-color:#F9F8FA;
`;

const Term = styled.div`
  height:2rem;
  i{
    margin-right:1.4rem;
    font-size:1rem;
    cursor: pointer;
  }
  p{
    display: inline-block;
    font-size:0.75rem;
    margin:0;
    color:#707070;
    cursor: pointer;
  }
`;



