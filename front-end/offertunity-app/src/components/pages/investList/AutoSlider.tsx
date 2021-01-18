import React, { useState, useEffect } from 'react'
import Slider from "react-slick";

function SamplePrevArrow(props:any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "inline-block",  fontSize:"1.25rem",position: "absolute",
      top: "-7.5rem",
      left: "24rem",
    cursor:"pointer"}}
      onClick={onClick}
    >
      <i className="fas fa-chevron-left"/>
    </div>
    
  );
}

function SampleNextArrow(props:any) {
  const { className, style, onClick } = props;
  return (
    <div 
      className={className}
      style={{ ...style, display: "inline-block",fontSize:"1.25rem",position: "absolute",
      top: "-7.5rem",
      left: "27rem",
      cursor:"pointer" }}
      onClick={onClick}
    >
      <i className="fas fa-chevron-right"/>
    </div>
  );
}



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
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1180,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
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
              <h3 style={{width:"12.5rem",height:"12.5rem",display:'flex',alignItems:'center',cursor:"pointer"}}>
                <img src={logo.img} alt="" style={{display:'inline-block',width:'100%',padding:'1.5rem'}}/>
              </h3>
            </div>
          )
        })}
    </Slider>
    
  );
  
}






 