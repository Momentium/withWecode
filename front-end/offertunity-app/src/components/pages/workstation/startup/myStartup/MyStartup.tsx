import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BaseInfo from './BaseInfo';
import IntroForm from './IntroForm';
import IntroImg from './IntroImg';
import InvestDesire from './InvestDesire';
import InvestHist from './InvestHist';
import IntroTeam from './IntroTeam';
import News from './News';
import BtnSet from './BtnSet';

interface BasicState {
  thumbnail: string;
  logoImg: string;
  name: string;
  rep: string;
  establishedDate: Date;
  sectorId: string;
  coreTechnologyId: string;
  homepage: string;
}

const MyStartup = () => {

  const [basicInfo, setBasicInfo] = useState<BasicState>(); 

  // useEffect(() => {
  //   axios.get(`${process.env.REACT_APP_URL}/`)
  // }, [])

  const submitBaseInfo = (_data:any) => {
    axios.post(`${process.env.REACT_APP_URL}/`,
      {}
    )
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
  }
  return (
    <>
      <BaseInfo submitBaseInfo={submitBaseInfo}/>
      <IntroForm title={"스타트업 소개"}/>
      <IntroForm title={"아이템 소개"}/>
      <IntroImg/>
      <InvestDesire/>
      <InvestHist/>
      <IntroTeam/>
      <News/>
      <BtnSet/>
    </>
  );
}

export default MyStartup;

