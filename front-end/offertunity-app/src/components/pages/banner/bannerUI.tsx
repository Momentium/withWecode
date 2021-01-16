import React, { useState, useEffect } from 'react'
import Slider from "react-slick";
import BannerCard from "./BannerCard"

export default function SimpleSlider() {

    const[ banner,setBanner ]=useState([])
    useEffect(()=>{
      fetch("/data/mainBanner.json")
      .then((res)=>res.json())
      .then((res)=>{
        setBanner(res.bannerCon)
        console.log(res)
      })
    },[])

    function SamplePrevArrow(props:any) {
      const { className, style, onClick } = props;
      return (
        <div
          className={className}
          style={{ 
            ...style, 
            display: "inline-block",
            position: "absolute", 
            zIndex: "100",
            bottom: "6rem",
            right: "21rem"}}
            onClick={onClick}
        >
          <i className="fas fa-chevron-left" style={{fontSize:"1.25rem",color:"white"}}/>
        </div>
        
      );
    }
    
    function SampleNextArrow(props:any) {
      const { className, style, onClick } = props;
      return (
        <div
          className={className}
          style={{ 
            ...style, 
            display: "inline-block",
            position: "absolute",
            zIndex: "100",
            bottom: "6rem",
            right: "18rem" }}
            onClick={onClick}
        >
          <i className="fas fa-chevron-right"style={{fontSize:"1.25rem",color:"white"}}/>
        </div>
      );
    }

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1, 
    bslidesToShow: 0,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  return (
    <Slider {...settings}>
      {banner.map((bannercon:string) => {
        return(
          <div>
            <h3>
              <BannerCard data={bannercon}/>
            </h3>
          </div>
        )
      })}
    </Slider>
  );
}