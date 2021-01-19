import React from 'react';
import styled from "styled-components";

const InputBox = () => {
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
      <Term>
        <p>*약관동의</p>
        <div className="agreeAll">
          <label>
            <input type="checkbox"/>
            모든 약관에 동의합니다. 
            <button>더보기</button>
          </label>
        </div>
        <div className="labelBox">
          <label>
            <input type="checkbox"/>
            서비스 이용약관에 동의합니다. (필수)
          </label>
          <label>
            <input type="checkbox"/>
            개인정보 수집 및 이용에 동의합니다. (필수)
          </label>
          <label >
            <input type="checkbox"/>
            마케팅 정보 수신 동의합니다. (선택)
          </label>
          <label> 
            <input type="checkbox"/>
            장기 미접속 시 계정 활성 상태 유지합니다. (선택)
          </label>
        </div>
      </Term>
    </Wrap>
  )
};

export default InputBox;

const Wrap =styled.div`
  width:50%;
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

const Term = styled(Input)`
  .agreeAll{
      z-index:10;
      display: inline-block;
      width:21rem;
      height:3.12rem;
      line-height:3.12rem;
      border:2px solid #BCE0FD;
      border-radius:0.5rem;
      background:#F1F9FF;
      font-size:0.8rem;
      color:#2699FB;
      label{ 
        margin-left:1.8rem;
      }
    }
    .labelBox{
      z-index:1;
      transform: translateY(-0.5rem);
      padding: 2.3rem 2.2rem 1.6rem 0;
      display: inline-block;
      border:1px solid #707070;
      border-radius:0.5rem;
      font-size:0.75rem;
      color:#707070;
      label{
      display:block;
      margin-left:1.8rem;
      }
    }
  input{ 
    margin-right:1.6rem;
    width:1rem;
    height:1rem;
  }
`;