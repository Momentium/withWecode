import React, { useState, useEffect } from 'react';
import styled from 'styled-components';


interface BannerProps{
  img : string
  script: string
  title: string
}

const BannerPresent:React.FC<BannerProps>= ({img,script,title})=> {

  

  const [bannerImg,setBannerImg]=useState([]);
  const [moveX,setMoveX] = useState(0);

  const sliderGoRight =() =>{ 
    if(moveX === -100*(bannerImg.length-1)){
      return;
    }else 
    { setMoveX(moveX - 100)};
  }

  const sliderGoLeft =() =>{ 
    if(moveX === 0){
      return;
    }else 
    { setMoveX(moveX + 100)};
  }

  useEffect(() => {
    fetch("/data/mainBanner.json")
    .then(res =>res.json())
    .then(res=>{
      console.log(setBannerImg)
      setBannerImg(res.banner)
    
    })
  },[])



  return(
    <BannerPre >
      <LeftButton  onClick={sliderGoLeft}><i className="fas fa-chevron-left"/></LeftButton>
      <BannerSlider style={{ transform: `translateX(${moveX}%)` }}>
       {bannerImg.map((slide:any,idx:number) =>{
         return(
         <li key={idx} >
           <img src={slide.img} alt=""/>
           <div>
            <span>{slide.script}</span>
            <p>{slide.title}</p>
           </div>
          </li>
          
         )    
       })}
      </BannerSlider>
      <RightButton onClick={sliderGoRight}><i className="fas fa-chevron-right"/></RightButton>
    </BannerPre>
  );
};

export default BannerPresent;  

const BannerPre = styled.div`
 position:relative;
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
    position:relative;
    min-width:100%;
    height:100%;
    list-style:none;
    img{
      width:100%;
      height:100%;
    }
    div{ 
      position:absolute;
      top:27.31rem;
      left:19.94rem;
      width:19rem;
      color: #FFFFFF;
      span{ 
        display: inline-block;
        font-size:0.93rem;
        padding-bottom:2.28rem;
      }
      p{ 
        font-size:2.87rem;
        font-weight:bold;
        letter-spacing: -0.46px;
        color: #FFFFFF;
      }
    }
  
  }
`

const Button = styled.button`
  position:absolute;
  top:37rem;
  color: #FFFFFF;
`;

const RightButton =styled(Button)`
  right:15.63rem;
  
`;

const LeftButton =styled(Button)`
  right:20rem; 
  z-index: 10;
`;