import React, { useState,useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import withRouterAndRef from "api/withRouterAndRef";
import styled, { css } from "styled-components";
import * as St from "components/styles/styledComp";
import { SearchSvg, UnSearchSvg } from "assets/icons/SearchSvg";

const Header = React.forwardRef<HTMLDivElement, RouteComponentProps>(
  ({ location }, ref) => {
    // const { location } = props
    const [focus, setFocus] = useState<boolean>(false);
    const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
      setFocus(!focus);
    };

    const [showModal,setShowModal] = useState(false)
   
    const handleModal=()=>{
      setShowModal(!showModal)
    }

    const logOut =()=>{
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("userInfo");
      window.location.href = "/";
    }

    return (
      <StSection ref={ref}>
        <HeaderCon>
          <StLogoWrap>
            <Link to="/">
              <img src="/images/header/logo.png" alt="로고" />
            </Link>
          </StLogoWrap>

          {!location.pathname.includes("auth") && (
            <>
              <StNavCont>
                <StLinkWrap
                  name="project"
                  curPage={location.pathname?.substring(1)}
                >
                  <Link to="/project">지원사업</Link>
                </StLinkWrap>
                <StLinkWrap
                  name="startup"
                  curPage={location.pathname?.substring(1)}
                >
                  <Link to="/startup">스타트업</Link>
                </StLinkWrap>
                <StLinkWrap
                  name="partner"
                  curPage={location.pathname?.substring(1)}
                >
                  <Link to="/partner">투자기관</Link>
                </StLinkWrap>
                <StLinkWrap
                  name="demo"
                  curPage={location.pathname?.substring(1)}
                >
                  <Link to="/demo">온라인 데모데이</Link>
                </StLinkWrap>
                <StLinkWrap
                  name="team"
                  curPage={location.pathname?.substring(1)}
                >
                  <Link to="/team">팀빌딩</Link>
                </StLinkWrap>
              </StNavCont>

              <StSearchWrap
                focus={focus}
                onFocus={handleFocus}
                onBlur={handleFocus}
              >
                <div className="rel">
                  <UnSearchSvg />
                  <div className="abs">
                    <SearchSvg />
                  </div>
                </div>
                <input type="text" />
              </StSearchWrap>

              {
                //location.pathname.includes("workstation")  ?
                sessionStorage.getItem("token") ?
                
                <StLogInCont>
                  <img src="/images/icons/사각형 943@2x.png" alt="" className="bell"/>
                  <Link to="/MypageStartup">
                    <img src="/images/icons/사각형 944@2x.png" alt=""/>
                  </Link>
                  <span className="link-workstation" onClick={handleModal}>워크스테이션</span>
                 {showModal && <Modal>
                    <ul>
                      <li>마이 스타트업</li>
                      <li>지원사업 프로젝트</li>
                      <li>IR자료 요청 관리</li>
                      <li>IR자료 및 지원서류 관리</li>
                      <li>회원정보 수정</li>
                      <li onClick={logOut}>로그아웃</li>
                    </ul>
                  </Modal>}
                </StLogInCont>
                
               
                :
                <Auth>
                  <Link to="/auth/signIn">
                    <p>로그인</p>
                  </Link>
                  <Link to="/auth/signUp">
                    <p>회원가입</p>
                  </Link>
                </Auth>
              }
            </>
          )}
        </HeaderCon>
      </StSection>
    );
  }
);

export default withRouterAndRef(Header);

const StLogInCont = styled.div`
position:relative;

  display: flex;
  align-items: center;

  img {
    height: 21px;
   margin-right: 30px;
 &.bell{
  margin-left: 36px;
 }
  }
 
  span {
    cursor: pointer;
    user-select:none;
    display: inline-block;
    width: 150px;
    line-height: 40px;
    border: 1px solid #5142E4;
    border-radius: 5px;

    text-align: center;
    vertical-align: middle;

    color: #5541ED;
    font-size: 15px;
    font-weight: normal;
  }
`;

const Modal = styled.div`
  z-index:10;
  position:absolute;
  top: 50px;
  left: 118px;
  width:176px;
  height:233px;
  background: var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  border-radius: 5px;
  box-shadow: 3px -1px 10px #0000004A;
  opacity: 1;
  ul{ 
    width: 100%;
    padding: 1rem;
    li{
      font-size:13px;
      line-height:35px;
      cursor:pointer
    }
    li:nth-child(5){
      border-top:1px solid #0000004A;
    }
  }
`;

const StSection = styled.div`
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;

  background: white;
  /* width: 80rem;
  padding: 0 320px;
  box-sizing: content-box; */

  width: 100%;
  border-bottom: 1px solid #00000029;
`;

const HeaderCon = styled.header`
  display: flex;
  justify-content: ${({ theme }) =>
    theme.pathname.includes("auth") ? "flex-start" : "space-between"};
  align-items: center;

  width: 80rem;
  height: 4.37rem;
  margin: 0 auto;
  background: #fff;
  text-align: center;
`;

const StLogoWrap = styled(St.FlexDiv)`
  display: flex;
  flex: ${({ theme }) => !theme.pathname.includes("auth") && 1};

  img {
    width: 10.25rem;
    display: block;
  }
`;

const StNavCont = styled.nav`
  display: flex;
  flex: 5;
  justify-content: center;

  & > div:nth-child(5) {
    margin-right: 0;
  }
`;

const StLinkWrap = styled.div<{ name: string; curPage: string }>`
  margin-right: 56px;

  @keyframes colorChangeNav {
    0% {
      font-weight: 400;
      color: black;
    }
    20% {
      font-weight: 400;
      color: #dedede;
    }
    40% {
      font-weight: 400;
      color: #c3bdf4;
    }
    60% {
      font-weight: 500;
      color: #5541ed;
    }
    80% {
      font-weight: 500;
      color: #5541ed;
    }
    100% {
      font-weight: 700;
      color: #5541ed;
    }
  }

  ${(props) =>
    props.curPage.includes(props.name) &&
    css`
      * {
        animation: colorChangeNav 0.2s forwards;
      }
    `}
`;

const StSearchWrap = styled.div<{ focus: boolean }>`
  display: flex;
  flex: 1;

  border-radius: 15px;
  border: 1px solid #d8d8d8;
  width: 172px;
  height: 28px;
  padding: 4px 16px 4px 0;

  svg {
    width: 18px;
    height: 100%;
  }

  .rel {
    position: relative;
    padding: 0 8px;
  }
  .abs {
    position: absolute;
    top: 0;
    z-index: 1;
    & > svg {
      opacity: 0;
      ${(props) =>
        props.focus &&
        css`
          animation: fadeInIcon 0.2s forwards;
        `};
    }
  }

  input {
    width: 100%;
    border: 0px;
    box-sizing: border-box;
    &:focus {
      outline: none;
    }
  }

  ${(props) =>
    props.focus &&
    css`
      animation: colorChangeSearch 0.2s forwards;
    `};

  @keyframes colorChangeSearch {
    0% {
      border-color: #d8d8d8;
    }
    20% {
      border-color: #dedede;
    }
    40% {
      border-color: #c3bdf4;
    }
    60% {
      border-color: #5541ed;
    }
    80% {
      border-color: #5541ed;
    }
    100% {
      border-color: #5541ed;
    }
  }

  @keyframes fadeInIcon {
    0% {
      opacity: 0;
    }
    20% {
      opacity: 0.2;
    }
    40% {
      opacity: 0.2;
    }
    60% {
      opacity: 0.6;
    }
    80% {
      opacity: 0.8;
    }
    100% {
      opacity: 1;
    }
  }
`;

const Auth = styled.div`
  display: flex;
  flex: 1;

  p {
    display: inline-block;
    margin-left: 1.43rem;
    font-size: 0.8rem;
    color: #898989;
    cursor: pointer;
  }
`;
