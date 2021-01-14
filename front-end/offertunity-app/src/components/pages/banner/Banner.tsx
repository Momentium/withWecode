<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Banner = () => {
  const [bannerImg, setBannerImg] = useState([]);
  const [moveX, setMoveX] = useState(0);

  const activeSlider = () => {
    setMoveX(moveX - 100);
  };

  useEffect(() => {
    fetch("/data/mainBanner.json")
      .then((res) => res.json())
      .then((res) => {
        console.log(res, "res");
        setBannerImg(res.banner);
      });
  }, []);

  return (
    <Bannercon>
      <BannerSlider
        onClick={activeSlider}
        style={{ transform: `translateX(${moveX}%)` }}
      >
        {bannerImg.map((slide) => {
          <li>
            <img src="{slide}" alt="" />
          </li>;
        })}
      </BannerSlider>
    </Bannercon>
  );
};

export default Banner;

const Bannercon = styled.div`
  width: 100%;
  height: 43.74rem;
`;

const BannerSlider = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  transition: 0.4s;
  li {
    min-width: 100%;
    height: 100%;
    list-style: none;
    img {
      width: 100%;
      height: 100%;
    }
  }
`;
=======
import React from 'react';
import BannerPresent from '../banner/bannerUI';



const Banner = () => {
  return (
    <div>
      <BannerPresent img={""} script={""} title={""} />
    </div>
  )
};

export default Banner;
>>>>>>> 78eb8fa7c2c81a0194eebbf3937898dd636d6cfa
