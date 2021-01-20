import React, { useEffect, useState } from 'react';
import styled from "styled-components";


const InputBox = () => {

  const [checkAll,setCheckAll] = useState(false);

  const [checkService,setCheckService] =useState(false);
  const [checkPersonalInfo,setCheckPersonalInfo]=useState(false);
  const [checkMarketing,setCheckMarketing]=useState(false);
  const [checkAccountWake,setCheckAccountWake] =useState(false);

  useEffect(() => {

      const True = (checkService && checkPersonalInfo && checkMarketing && checkAccountWake)
      setCheckAll(True);

  },[checkService,checkPersonalInfo,checkMarketing,checkAccountWake])

  
  const handleCheckAll = () => {
    setCheckAll(!checkAll)
    setCheckService(!checkAll);
    setCheckPersonalInfo(!checkAll);
    setCheckMarketing(!checkAll);
    setCheckAccountWake(!checkAll);
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
  const unLogin =()=>{
    setCheckAccountWake(!checkAccountWake)
  }

  return(
    <Wrap>
      <Email>
        <p>*E-mail (아이디)</p>
        <input type="text" placeholder="aaa@mail.com"/>
        <button>인증하기</button>
      </Email>
      <Name>
        <p>*이름</p>
        <input type="text" placeholder="홍길동"/>
      </Name>
      <Pw>
        <p>*비밀번호</p>
        <input type="text" placeholder="비밀번호를 입력해주세요"/>
      </Pw>
      <PwCheck>
        <p>*비밀번호 확인</p>
        <input type="text" placeholder="비밀번호를 다시 입력해주세요"/>
        <div>비밀번호가 일치하지 않습니다.</div>
      </PwCheck>
      <Agree>
        <p>*약관 동의</p>
        <CheckAll>
          <div onClick={handleCheckAll}>
            <i className="fas fa-check-circle" style={{color:checkAll? "#707070" : "#D8D2D2"}}/>
            <span>모든 약관에 동의합니다.</span>
          </div>
          <button>펼쳐보기<i className="fas fa-chevron-down"/></button>
        </CheckAll>
          <Terms>
            <Term onClick={service}>
              <i className="fas fa-check-circle" style={{color:checkService? "#707070" : "#D8D2D2"}}/>
              <p>서비스 이용약관에 동의합니다. (필수)</p>
            </Term>
            <Term onClick={personal}>
              <i className="fas fa-check-circle" style={{color:checkPersonalInfo? "#707070" : "#D8D2D2"}}/>
              <p>개인정보 수집 및 이용 에 동의합니다. (필수)</p>
            </Term>
            <Term onClick={marketing}>
              <i className="fas fa-check-circle" style={{color:checkMarketing? "#707070" : "#D8D2D2"}}/>
              <p>마케팅 정보 수신 동의합니다. (선택)</p>
            </Term>
            <Term onClick={unLogin}>
              <i className="fas fa-check-circle" style={{color:checkAccountWake? "#707070" : "#D8D2D2"}}/>
              <p>장기 미접속 시 계정 활성 상태 유지합니다. (선택)</p>
            </Term>
          </Terms>
        
      </Agree>
    </Wrap>
  )
};

export default InputBox;

const Wrap =styled.div`
  width:41%;
`;

const Input = styled.div `
  margin-bottom:3rem;
  p{
    margin-bottom:0.5rem;
    font-size:0.8rem;
    color:#2699FB;
  }
  input{
    margin-right:0.75rem;
    width:21rem;
    height:3.12rem;
    border:2px solid #BCE0FD;
    border-radius:0.5rem;
    padding:0.5rem 2.5rem 0.5rem 1rem;
    background:#F1F9FF;
    &::placeholder{
    color:#2699FB;
    }
    &:focus{
      outline:none;
    }
  }
  
`;

const Email = styled(Input)`
  button{
    width:11rem;
    height:3.1rem;
    border:2px solid #BCE0FD;
    border-radius:0.5rem;
    background:#F1F9FF;
    color:#2699FB;
  }
`;
const Name = styled(Input)``;
const Pw = styled(Input)``;

const PwCheck = styled(Input)`
 div{
    display: inline-block;
    background-color:#2699FB;
    width:11rem;
    height:3.1rem;
    border-radius:0.5rem;
    text-align:center;
    line-height:3.1rem;
    font-size:0.8rem;
    color:#fff;
 }
`;

const Agree = styled(Input)`
  
`;

const CheckAll = styled.div`
  width:21rem;    
  height:4.3rem;
  line-height:4.3rem;
  background:#F1F9FF;
  border:2px solid #BCE0FD;
  border-radius:0.5rem;
  font-size:0.8rem;
  color:#2699FB;
  div{
    display: inline-block;
  }
  i{
    vertical-align:middle;
    margin:0 1.4rem;
    font-size:1.3rem;
    color:#D8D2D2;
    cursor: pointer;
  }
  span{
    cursor: pointer;
  }
  button{
    display: inline-block;
    margin-left:5rem;
    font-size:0.5rem;
    color:#2699FB;
    i{ 
      font-size:0.8rem;
      margin:0 0 0 0.3rem;
    }
  }
`;

const Terms = styled.div`
  padding:1rem 2rem;
  width:21rem;
  border:1px solid #D8D2D2;
  border-radius:0.5rem;
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

