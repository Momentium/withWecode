import axios from "axios";
import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";

type Props = {
  typeId: string;
};

const InputBox: React.FC<Props> = ({ typeId }) => {
  const [modal, setModal] = useState(false);
  const [checkAll, setCheckAll] = useState(false);
  const [checkService, setCheckService] = useState(false);
  const [checkPersonalInfo, setCheckPersonalInfo] = useState(false);
  const [checkMarketing, setCheckMarketing] = useState(false);
  const [btnActive, setBtnActive] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);
  const [showPwAlert, setShowPwAlert] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    name: "",
    password: "",
    passwordAgain: "",
    isPwSame: false,
    validateEmail: false,
    validatePassword: false,
  });
  const {
    email,
    name,
    password,
    passwordAgain,
    isPwSame,
    validateEmail,
    validatePassword,
  } = inputs;
  const history = useHistory();

  const SIGNUP = () => {
    axios
      .post("http://10.0.1.29:3000/users/signup", {
        email: email,
        name: name,
        password: password,
        typeId: typeId,
        signUpMethodId: "1",
      })
      .then(function (response) {
        alert("회원가입 성공");
      })
      .catch(function (error) {
        alert("필수사항을 입력해 주세요");
      });

    if (typeId === "2") {
      history.push("/Auth/SignupFinishPartner");
    }
    if (typeId === "1") {
      history.push("/Auth/SignupFinishStartup");
    }
  };

  const handleEmail = (event: any) => {
    event.preventDefault();
    const emailStandard = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
    const checkEmail = emailStandard.test(email);
    setInputs({
      ...inputs,
      email: event.target.value,
      validateEmail: checkEmail,
    });
  };

  const handleModal = (event: any) => {
    setModal(!modal);
  };

  const handlePw = (event: any) => {
    event.preventDefault();
    const { value } = event.target;
    const reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$+ %^&*-]).{8,}$/;

    setInputs({
      ...inputs,
      password: value,
      validatePassword: reg.test(value),
    });
  };

  const handleSamePw = (event: any) => {
    event.preventDefault();
    const { value } = event.target;
    const samePw = password === value;
    setInputs({
      ...inputs,
      isPwSame: samePw,
    });
    setShowPwAlert(!showPwAlert);
  };

  const handleName = (event: any) => {
    event.preventDefault();
    setInputs({
      ...inputs,
      name: event.target.value,
    });
  };

  useEffect(() => {
    if (checkService && checkPersonalInfo) {
      setBtnActive(true);
      if (checkMarketing) setCheckAll(true);
      else setCheckAll(false);
    } else {
      setBtnActive(false);
      setCheckAll(false);
    }
  }, [checkService, checkPersonalInfo, checkMarketing]);

  const handleCheckAll = () => {
    setCheckAll(!checkAll);
    setCheckService(!checkAll);
    setCheckPersonalInfo(!checkAll);
    setCheckMarketing(!checkAll);
    setBtnActive(!btnActive);
  };

  const service = () => {
    setCheckService(!checkService);
  };
  const personal = () => {
    setCheckPersonalInfo(!checkPersonalInfo);
  };
  const marketing = () => {
    setCheckMarketing(!checkMarketing);
  };

  const handleTerm = () => {
    setOpenTerms(!openTerms);
  };

  return (
    <Wrap>
      {modal && (
        <Modal
          title="이메일 인증하기"
          content={email}
          notionOne="입력해주신 이메일로 인증번호를 보냈습니다."
          notionTwo="확인 후 인증번호를 입력해주세요 !"
        />
      )}
      <Email>
        <p>
          <span>*</span>E-mail (아이디)
        </p>
        <GetEmeil>
          <input
            type="text"
            placeholder="aaa@mail.com"
            onChange={handleEmail}
          />
          <button
            style={{ background: validateEmail ? "#5541ED" : "#C3BDF4" }}
            onClick={validateEmail ? handleModal : undefined}
          >
            인증하기
          </button>
        </GetEmeil>
        <CheckEmeil>
          <input type="text" placeholder="인증번호를 입력해주세요." />
          <button>인증확인</button>
        </CheckEmeil>
      </Email>
      <Name>
        <p>
          <span>*</span>이름
        </p>
        <input type="text" placeholder="홍길동" onChange={handleName} />
      </Name>

      <Pw>
        <p>
          <span>*</span>비밀번호
        </p>
        <PwWrap>
          <input
            type="text"
            placeholder="비밀번호를 입력해주세요"
            onChange={handlePw}
          />
          {validatePassword && <i className="fas fa-check" />}
        </PwWrap>
        <span>영문,숫자,특수문자(!@#$%^&*+_)를 조합한 8자이상 </span>
      </Pw>

      <PwCheck>
        <p>
          <span>*</span>비밀번호 확인
        </p>
        <PwWrap>
          <input
            type="text"
            placeholder="비밀번호를 다시 입력해주세요"
            onChange={handleSamePw}
          />
          {isPwSame && <i className="fas fa-check" />}
        </PwWrap>
        {isPwSame ? "" : <PwAlert>비밀번호가 일치하지 않습니다.</PwAlert>}
      </PwCheck>

      <Agree>
        <p>
          <span>*</span>약관 동의
        </p>
        <CheckAll>
          <div onClick={handleCheckAll}>
            <i
              className={"fa-check-circle " + (checkAll ? "fas" : "far")}
              style={{ color: checkAll ? "#707070" : "#D8D2D2" }}
            />
            <span>모든 약관에 동의합니다.</span>
          </div>
          <button onClick={handleTerm}>펼쳐보기</button>
        </CheckAll>
        {openTerms && (
          <Terms>
            <Term onClick={service}>
              <i
                className={"fa-check-circle " + (checkService ? "fas" : "far")}
                style={{ color: checkService ? "#707070" : "#D8D2D2" }}
              />
              <p>서비스 이용약관에 동의합니다. (필수)</p>
            </Term>
            <Term onClick={personal}>
              <i
                className={
                  "fa-check-circle " + (checkPersonalInfo ? "fas" : "far")
                }
                style={{ color: checkPersonalInfo ? "#707070" : "#D8D2D2" }}
              />
              <p>개인정보 수집 및 이용 에 동의합니다. (필수)</p>
            </Term>
            <Term onClick={marketing}>
              <i
                className={
                  "fa-check-circle " + (checkMarketing ? "fas" : "far")
                }
                style={{ color: checkMarketing ? "#707070" : "#D8D2D2" }}
              />
              <p>마케팅 정보 수신 동의합니다. (선택)</p>
            </Term>
          </Terms>
        )}
      </Agree>
      <div>
        <Enroll
          style={{ background: btnActive ? "#5541ED" : "#C3BDF4" }}
          onClick={btnActive ? SIGNUP : undefined}
        >
          가입
        </Enroll>
        <Cancle>취소</Cancle>
      </div>
    </Wrap>
  );
};

export default InputBox;

const Wrap = styled.div`
  width: 41%;
`;

const Input = styled.div`
  display: inline-block;
  margin-bottom: 1rem;
  p {
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    color: #000;
    span {
      display: inline-block;
      font-size: 1.1rem;
      color: #ff0000;
    }
  }
  input {
    margin-right: 0.75rem;
    width: 20rem;
    height: 3rem;
    border: 1px solid #d8d8d8;
    border-radius: 0.3rem;
    padding: 0.5rem 2.5rem 0.5rem 1rem;
    background: #fff;
    &::placeholder {
      font-size: 0.9rem;
      color: #d8d8d8;
    }
    &:focus {
      outline: none;
    }
  }
`;

const Email = styled(Input)`
  button {
    position: absolute;
    top: 0.5rem;
    right: 1.3rem;
    width: 5.6rem;
    height: 2rem;
    border-radius: 0.3rem;
    color: #fff;
    cursor: pointer;
  }
`;

const GetEmeil = styled.div`
  position: relative;
`;

const CheckEmeil = styled.div`
  position: relative;
  margin-top: 1rem;
  button {
    background: #c3bdf4;
  }
`;

const Name = styled(Input)``;

const Pw = styled(Input)`
  span {
    margin-top: 0.5rem;
    display: block;
    font-size: 0.68rem;
    color: #898989;
  }
`;

const PwCheck = styled(Input)``;

const PwAlert = styled.span`
  display: inline-block;
  border-radius: 0.3rem;
  text-align: center;
  width: 11.56rem;
  height: 2rem;
  line-height: 2rem;
  font-size: 0.67rem;
  background: #c3bdf4;
  color: #fff;
`;

const PwWrap = styled.div`
  position: relative;
  display: inline-block;
  button {
    position: absolute;
    top: 1rem;
    right: 2rem;
    width: 0.75rem;
    height: 0.75rem;
    cursor: pointer;
  }
  i {
    display: inline-block;
    position: absolute;
    top: -1rem;
    right: 1rem;
    font-size: 0.8rem;
    color: #5541ed;
  }
`;

const Agree = styled(Input)``;

const CheckAll = styled.div`
  width: 20rem;
  height: 3rem;
  border: 1px solid #d8d8d8;
  border-radius: 0.3rem;
  background: #fff;
  line-height: 3rem;
  div {
    display: inline-block;
  }
  i {
    vertical-align: middle;
    margin: 0 1.18rem;
    font-size: 1.18rem;
    color: #d8d2d2;
    cursor: pointer;
  }
  span {
    cursor: pointer;
    font-weight: bold;
    font-size: 0.9rem;
  }
  button {
    padding-right: 1rem;
    display: inline-block;
    margin-left: 2.56rem;
    font-size: 0.68rem;
    color: #898989;
    background-image: url("/images/signup/arrowDownSmall.png");
    background-repeat: no-repeat;
    background-position: right;
    background-size: 0.5rem;
    cursor: pointer;
  }
`;

const Terms = styled.div`
  padding: 1rem 2rem;
  width: 20rem;
  border: 1px solid #d8d8d8;
  background-color: #f9f8fa;
`;

const Term = styled.div`
  height: 2rem;
  i {
    margin-right: 1.4rem;
    font-size: 1rem;
    cursor: pointer;
  }
  p {
    display: inline-block;
    font-size: 0.75rem;
    margin: 0;
    color: #707070;
    cursor: pointer;
  }
`;

const BTN = styled.button`
  width: 9.5rem;
  height: 3rem;
  font-size: 1.12rem;
  line-height: 3rem;
  text-align: center;
  border-radius: 0.3rem;
  cursor: pointer;
`;

const Enroll = styled(BTN)`
  margin-right: 1rem;
  color: #fff;
`;

const Cancle = styled(BTN)`
  background-color: #fff;
  border: 1px solid #b7b7b7;
  color: #000;
`;
