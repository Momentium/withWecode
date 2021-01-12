import React, { useEffect, useState } from 'react';
import styled from 'styled-components';


const Header = () => {

  const [navList,setNavList] = useState([]);

  useEffect(()=>{
    fetch("/data/navList.json")
    .then(res=>res.json())
    .then(res=>{
      setNavList(res.navMenu)
      console.log(navList)
    })
  },[]);

  return(
    <HeaderCon>
      <header className="conBox">
        <h1><span>OFFER</span>TUNITY</h1>
        <nav>
          <ul>
          {navList.map(menu => {
            return(<li>{menu}</li>)
            
          })}
          </ul>
        </nav>
        <Auth>
          <div>
            <input type="text"/>
            <i className="fas fa-search"/>
            </div>
          <p>로그인</p>
          <p>회원가입</p>
        </Auth>
      </header>
    </HeaderCon>
  )
  
};

export default Header;

const HeaderCon =styled.div`
  width:100%;
  height:4.37rem;
  background: #fff;

  .conBox {
    margin:0 auto;
    width:80rem;
    h1 {
      display:inline-block;
      font-size:1.5rem;
      line-height:1.8rem;
      font: normal normal bold 1.5rem/1.8rem Spoqa Han Sans Neo;
      span{
        color:#5541ED;
      }
    }
    nav {
      display: inline-block;
      font-size:0.9rem;
      line-height:1.2rem;
      ul{
        padding-left:0;
          li{
          display: inline-block;
          margin-left:3.5rem;
          list-style:none;
          font: normal normal normal 0.9rem/1.25rem Spoqa Han Sans Neo;
          
        }
      }
      
    }
  }
`;

const Auth = styled.div`
display:inline-block;
margin-left:12.19rem;

div{ 
  display: inline-block;
  position: relative;
  input{
    width: 12.5rem;
    height: 1.75rem;
    border-radius: 0.9rem;
    border: 1px solid #D8D8D8;
    box-sizing:border-box;
    padding: 4px 34px 4px 13px;
    &:focus{
      outline:none;
    }
  }
    i{
      position: absolute;
      top: 0.43rem;
      right:0.62rem;
      color:#707070;
    }
  }
  p{
    display: inline-block;
    margin-left:1.43rem;
    font-size:0.8rem;
    color:#898989;
  }
`;
