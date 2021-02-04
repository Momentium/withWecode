import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Mt from "api/methods";
import BaseInfo from './BaseInfo';
import IntroForm from '../IntroForm';
import IntroImg from './IntroImg';
import InvestDesire from './InvestDesire';
import InvestHist from './InvestHist';
import IntroTeam from './IntroTeam';
import News from './News';
import BtnSet from '../../BtnSet';

interface BasicState {
  name: string;
  establishedDate: string;
  investedCounts: number;
  totalInvested: string;
  interedtedTechnology: string;
  homepage: string;
}

const MyPartner = () => {
  // const _token = sessionStorage.getItem("token");
  const _token = Mt.getUserInfo().token;
  // const _formData = new FormData();

  const [logoImg, setLogo] = useState<string>("");
  const [basicInfo, setBasicInfo] = useState<BasicState>({
    name: "",
    establishedDate: new Date().toISOString().substring(0, 10),
    investedCounts: 0,
    totalInvested: "1천만원 - 5천만원",
    interedtedTechnology: "블록체인",
    homepage: "",
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/companies/info/partner`, {
        headers: {
          Authorization: `Basic ${_token}`,
        },
      })
      .then((res) => {
        const _resData = res.data.body;
        if (Object.keys(_resData).length === 0) {
          alert("정보가 아직 등록 되어있지 않습니다.")
        } else {
          setLogo(_resData.logoImg ? _resData.logoImg : "");
          setBasicInfo({
            ...basicInfo,
            ...{
              name: _resData.name,
              establishedDate: new Date(_resData.establishedDate).toISOString().substring(0, 10),
              investedCounts: _resData.investedCounts,
              totalInvested: _resData.totalInvested ? _resData.totalInvested : "1천만원 - 5천만원",
              interedtedTechnology: _resData.interedtedTechnology ? _resData.interedtedTechnology : "블록체인",
              homepage: _resData.homepage ? _resData.homepage : "",
            },
          });
        }
      })
      .catch((err) => {
        alert(`데이터 전송에 실패했습니다.\n ${err}`)
      })
  }, []);

  const changeBasicInfo = (e: any) => {
    const _target = e.currentTarget;
    switch (_target.className.split(" ")[2]) {
      case "partner-name":
        _target.value.length < 15 &&
          setBasicInfo({ ...basicInfo, ...{ name: _target.value } });
        break;
      case "establish":
        setBasicInfo({ ...basicInfo, ...{ establishedDate: _target.value } });
        break;
      case "count":
        setBasicInfo({ ...basicInfo, ...{ investedCounts: _target.value } });
        break;
      case "total":
        setBasicInfo({ ...basicInfo, ...{ totalInvested: _target.textContent } });
        break;
      case "tech":
        setBasicInfo({
          ...basicInfo,
          ...{ interedtedTechnology: _target.textContent },
        });
        break;
      case "homepage":
        setBasicInfo({ ...basicInfo, ...{ homepage: _target.value } });
        break;
    }
  };

  const saveBasicInfo = () => {
    const _formData = new FormData();

    Object.keys(basicInfo).forEach((key) => {
      _formData.append(key, (basicInfo as any)[key]);
    });
    
    _formData.append("logoImg", Mt.dataURLtoFile(logoImg, `${basicInfo.name}_logo`));

    axios.post(
      `${process.env.REACT_APP_URL}/companies/info/partner/basic/temp`,
      _formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Basic ${_token}`,
        },
      }
    )
    .then(() => {
      alert("기본 정보가 임시 저장 되었습니다.");
    })
  };

  const [introSU, setIntroSU] = useState<string>("");
  const [introItem, setIntroItem] = useState<string>("");
  const changeIntroForm = (e: any) => {
    const _target = e.currentTarget;
    switch (_target.className.split(" ")[2]) {
      case "startup":
        _target.value.length < 500 && setIntroSU(_target.value);
        break;
      case "item":
        _target.value.length < 500 && setIntroItem(_target.value);
        break;
    }
  };

  const saveForm = () => {
    const _formData = new FormData();
    _formData.append("logoImg", Mt.dataURLtoFile(logoImg, `${basicInfo.name}_logo`));
    Object.keys(basicInfo).forEach((key) => {
      _formData.append(key, (basicInfo as any)[key]);
    });
    _formData.append("description", introSU);
    _formData.append("itemDescription", introItem);

    axios.post(
      `${process.env.REACT_APP_URL}/companies/info/partner/temp`,
      _formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Basic ${_token}`,
        },
      }
    )
    .then((res) => { 
      console.log(res) 
      alert('임시 저장 성공')
    });
  };
  const submitForm = () => {
    const _formData = new FormData();
    _formData.append("logoImg", Mt.dataURLtoFile(logoImg, `${basicInfo.name}_logo`));
    Object.keys(basicInfo).forEach((key) => {
      _formData.append(key, (basicInfo as any)[key]);
    });
    _formData.append("description", introSU);
    _formData.append("itemDescription", introItem);

    axios.post(
      `${process.env.REACT_APP_URL}/companies/info/partner/save`,
      _formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Basic ${_token}`,
        },
      }
    )
    .then((res) => { 
      console.log(res) 
      alert('저장 성공')
    });
  };


  return (
    <>
      <BaseInfo
        logo={logoImg}
        setLogo={setLogo}
        basicInfo={basicInfo}
        changeVal={changeBasicInfo}
        submit={saveBasicInfo}
      />

      <IntroForm 
        cName={"invest"}
        title={"투자 파트너 소개"}
        // txt={introItem}
        // changeVal={changeIntroForm}
      />

      <IntroImg/>
      <InvestHist/>
      <IntroTeam/>
      <News/>
      <BtnSet 
        save={saveForm}
        submit={submitForm} 
      />
    </>
  );
}

export default MyPartner;

