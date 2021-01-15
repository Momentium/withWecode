import React, { useState, useEffect } from 'react'
import Slider from "react-slick";

export default function SimpleSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1, 
    bslidesToShow: 0,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const [invList,setInvestList] = useState([]);
  useEffect(() => {
    fetch("/data/investList.json")
    .then((res) =>res.json())
    .then((res) =>{
      setInvestList(res.invest)
      console.log(res)
    })
  },[])

  return (
    
    <Slider {...settings}>
        {invList.map((logo:any)=>{
          return(
            <div >
              <h3 style={{width:'12.5rem',height:'12.5rem',display:'flex',alignItems:'center'}}>
                <img src={logo.img} alt="" style={{display:'inline-block',width:'100%',padding:'1.5rem'}}/>
              </h3>
            </div>
          )
        })}
    </Slider>
    
  );
  
}






 