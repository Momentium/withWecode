import React, { useState, useEffect } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import styled, { css } from 'styled-components';
import * as St from 'components/styles/styledComp';
import { SearchSvg, UnSearchSvg } from 'assets/icons/SearchSvg';

const Header:React.FC<RouteComponentProps> = ({ location }) => {

  const [focus, setFocus] = useState<boolean>(false);
  const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    setFocus(!focus)
  } 

  return(
    <St.Section>
      <HeaderCon>

        <StLogoWrap>
          <Link to="/">
            <img src="/images/header/logo.png" alt="로고"/>
          </Link>
        </StLogoWrap>

        <StNavCont>
          <StLinkWrap name="project" curPage={location.pathname?.substring(1)}>
            <Link to="/project">지원사업</Link>
          </StLinkWrap>
          <StLinkWrap name="startup" curPage={location.pathname?.substring(1)}>
            <Link to="/startup">스타트업</Link>
          </StLinkWrap>
          <StLinkWrap name="invest" curPage={location.pathname?.substring(1)}>
            <Link to="/invest">투자기관</Link>
          </StLinkWrap>
          <StLinkWrap name="demo" curPage={location.pathname?.substring(1)}>
            <Link to="/demo">온라인 데모데이</Link>
          </StLinkWrap>
          <StLinkWrap name="team" curPage={location.pathname?.substring(1)}>
            <Link to="/team">팀빌딩</Link>
          </StLinkWrap>
        </StNavCont>

        <StSearchWrap focus={focus} onFocus={handleFocus} onBlur={handleFocus}>
          <div className="rel">
            <UnSearchSvg/>
            <div className="abs">
              <SearchSvg/>
            </div>
          </div>
          <input type="text"/>
        </StSearchWrap>

        <Auth>
          <p>로그인</p>
          <p>회원가입</p>
        </Auth>

      </HeaderCon>
    </St.Section>
  )
};

export default withRouter(Header);


const HeaderCon =styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  width:100%;
  height:4.37rem;
  background: #fff;
  text-align:center;
`;

const StLogoWrap = styled(St.FlexDiv)`
  display: flex;
  flex: 1;
  
  img {
    width:10.25rem;
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

const StLinkWrap = styled.div<{name: string, curPage: string}>`
  margin-right: 56px;

  @keyframes colorChangeNav{
    0% { 
      font-weight: 400;
      color: black; 
    }
    20% {
      font-weight: 400;
      color: #DEDEDE; 
    }
    40% {
      font-weight: 400;
      color: #C3BDF4; 
    }
    60% {
      font-weight: 500;
      color: #5541ED; 
    }
    80% {
      font-weight: 500;
      color: #5541ED; 
    }
    100% { 
      font-weight: 700;
      color: #5541ED; 
    }
  }
  
  ${props => props.name === props.curPage && 
  css`
    * {
      animation: colorChangeNav 0.2s forwards;
    }
  `}
`;

const StSearchWrap = styled.div<{focus: boolean}>`
  display: flex;
  flex: 1;

  border-radius: 15px;
  border: 1px solid #D8D8D8;
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
      ${props => props.focus && css`
        animation: fadeInIcon 0.2s forwards;
      `};
    }
  }
  
  input{
    width: 100%;
    border: 0px;
    box-sizing:border-box;
    &:focus{
      outline: none;
    }
  }

  ${props => props.focus && css`
    animation: colorChangeSearch 0.2s forwards;
  `};

  @keyframes colorChangeSearch{
    0% { 
      border-color: #D8D8D8;
    }
    20% {
      border-color: #DEDEDE; 
    }
    40% {
      border-color: #C3BDF4; 
    }
    60% {
      border-color: #5541ED; 
    }
    80% {
      border-color: #5541ED; 
    }
    100% { 
      border-color: #5541ED; 
    }
  }

  @keyframes fadeInIcon{
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

  p{
    display: inline-block;
    margin-left:1.43rem;
    font-size:0.8rem;
    color:#898989;
    cursor: pointer;
  }
`;
