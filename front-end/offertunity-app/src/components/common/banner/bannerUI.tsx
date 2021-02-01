import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import BannerCard from "./BannerCard";
import styled from "styled-components";

export default function SimpleSlider() {
  const [banner, setBanner] = useState([]);

  const getUrl = () => {
    const partnerList = window.location.pathname.includes("/partner/list");
    if (partnerList) {
      return "/data/partnerBanner.json";
    } else {
      return "/data/mainBanner.json";
    }
  };

  useEffect(() => {
    axios.get("/data/mainBanner.json").then((res) => {
      const _resData = res.data;
      setBanner(_resData.bannerCon);
    });
  }, []);

  function SamplePrevArrow(props: any) {
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
          right: "21rem",
          cursor: "pointer",
        }}
        onClick={onClick}
      >
        <i
          className="fas fa-chevron-left"
          style={{ fontSize: "1.25rem", color: "white" }}
        />
      </div>
    );
  }

  function SampleNextArrow(props: any) {
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
          right: "18rem",
          cursor: "pointer",
        }}
        onClick={onClick}
      >
        <i
          className="fas fa-chevron-right"
          style={{ fontSize: "1.25rem", color: "white" }}
        />
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
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <Wrap>
      <Slider {...settings}>
        {banner.map((bannercon: string) => {
          return (
            <div>
              <h3>
                <BannerCard data={bannercon} />
              </h3>
            </div>
          );
        })}
      </Slider>
      <Level>
        <div />
      </Level>
    </Wrap>
  );
}

const Wrap = styled.div`
  position: relative;
`;
const Level = styled.div`
  position: absolute;
  bottom: 4.25rem;
  left: 20rem;
  width: 23.5rem;
  height: 0.2rem;
  border: 1px solid #ccc;
  border-radius: 3px;
  overflow: hidden;
  div {
    width: 100%;
    height: 100%;
    background-color: white;
    transform: translateX(-75%);
  }
`;
