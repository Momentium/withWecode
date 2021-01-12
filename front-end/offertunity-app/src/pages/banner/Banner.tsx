import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Banner = () => {

  const [moveX,setMoveX] = useState(0);
  const activeSlider =() =>{
    setMoveX(moveX - 100);
  }

  

  return(
    <Bannercon>
      <BannerSlider onClick={activeSlider} style={{ transform: `translateX(${moveX}%)` }}>
       <li >
         <img src="/images/greenbanner.jpg" alt=""/>
       </li>
       <li >
         <img src="/images/yellowbanner.jpg" alt=""/>
       </li>
      </BannerSlider>
    </Bannercon>
  );
};

export default Banner;  

const Bannercon = styled.div`
  width: 100%;
  height:43.74rem;
`;

const BannerSlider = styled.ul`
  display:flex;
  margin:0;
  padding:0;
  width: 100%;
  height:100%;
  transition: 0.4s;
  li{
    min-width:100%;
    height:100%;
    list-style:none;
    img{
      
      width:100%;
      height:100%;
    }
  }
`