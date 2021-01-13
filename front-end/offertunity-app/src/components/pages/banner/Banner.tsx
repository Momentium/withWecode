import React, { useState, useEffect } from 'react';
import styled from 'styled-components';


interface BannerProps{
  img : string
}

const BannerPresent:React.FC<BannerProps>= ({img})=> {

  const [bannerImg,setBannerImg]=useState([]);
  const [moveX,setMoveX] = useState(0);

  const activeSlider =() =>{
    setMoveX(moveX - 100);
  }

  useEffect(() => {
    fetch("/data/mainBanner.json")
    .then(res =>res.json())
    .then(res=>{
      console.log(res, 'res')
      setBannerImg(res.banner)
    
    })
  },[])

  return(
    <BannerPre>
      <BannerSlider onClick={activeSlider} style={{ transform: `translateX(${moveX}%)` }}>
       {bannerImg.map((slide:any,idx:number) =>{
         return(
         <li key={idx} >
           <img src={slide.img} alt=""/>
          </li>
         )
         
         
       })}
      </BannerSlider>
    </BannerPre>
  );
};

export default BannerPresent;  





const BannerPre = styled.div`
  width: 100%;
  height:43.74rem;
  overflow: hidden;
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