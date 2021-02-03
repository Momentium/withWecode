import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Mt from "api/methods";
import BaseInfo from "./BaseInfo";
import IntroForm from "./IntroForm";
import IntroImg from "./IntroImg";
import InvestDesire from "./InvestDesire";
import InvestHist from "./InvestHist";
import IntroTeam from "./IntroTeam";
import News from "./News";
import BtnSet from "./BtnSet";

interface BasicState {
  name: string;
  rep: string;
  establishedDate: string;
  sector: string;
  coreTechnology: string;
  homepage: string;
}

const MyStartup = () => {
  const _token = sessionStorage.getItem("token");

  const [thumbnail, setThumb] = useState<string>("");
  const [logoImg, setLogo] = useState<string>("");
  const [basicInfo, setBasicInfo] = useState<BasicState>({
    name: "",
    rep: "",
    establishedDate: new Date().toISOString().substring(0, 10),
    sector: "플랫폼",
    coreTechnology: "블록체인",
    homepage: "",
  });

  useEffect(() => {
    const _token = sessionStorage.getItem("token");
    axios
      .get(`${process.env.REACT_APP_URL}/companies/info/startup`, {
        headers: {
          Authorization: `Basic ${_token}`,
        },
      })
      .then((res) => {
        const _resData = res.data.body;
        console.log(_resData)

        if (Object.keys(_resData).length === 0) {
          console.log("body is empty");
        } else {
          setThumb(_resData.thumbnail ? _resData.thumbnail : "");
          setLogo(_resData.logoImg ? _resData.logoImg : "");
          setBasicInfo({
            ...basicInfo,
            ...{
              name: _resData.name,
              rep: _resData.rep,
              establishedDate: new Date(_resData.establishedDate).toISOString().substring(0, 10),
              sector: _resData.sector ? _resData.sector : "플랫폼",
              coreTechnology: _resData.coreTechnology ? _resData.coreTechnology : "블록체인",
              homepage: _resData.homepage ? _resData.homepage : "",
            },
          });
          setIntroSU(_resData.description ? _resData.description : "");
          setIntroItem(_resData.itemDescription ? _resData.itemDescription : "");
        }
      })
      .catch((err) => {
        alert(`데이터 전송에 실패했습니다.\n ${err}`)
        
      })
  }, []);

  const changeBasicInfo = (e: any) => {
    const _target = e.currentTarget;
    switch (_target.className.split(" ")[2]) {
      case "startup-name":
        _target.value.length < 15 &&
          setBasicInfo({ ...basicInfo, ...{ name: _target.value } });
        break;
      case "ceo-name":
        setBasicInfo({ ...basicInfo, ...{ rep: _target.value } });
        break;
      case "establish":
        setBasicInfo({ ...basicInfo, ...{ establishedDate: _target.value } });
        break;
      case "sector":
        setBasicInfo({ ...basicInfo, ...{ sector: _target.textContent } });
        break;
      case "tech":
        setBasicInfo({
          ...basicInfo,
          ...{ coreTechnology: _target.textContent },
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
    
    _formData.append("thumbnail", Mt.dataURLtoFile(thumbnail, "startup_img_"));
    _formData.append("logoImg", Mt.dataURLtoFile(logoImg, "startup_logo_"));

    axios.post(
      `${process.env.REACT_APP_URL}/companies/info/startup/basic/temp`,
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
    _formData.append("thumbnail", Mt.dataURLtoFile(thumbnail, "startup_img_"));
    _formData.append("logoImg", Mt.dataURLtoFile(logoImg, "startup_logo_"));
    Object.keys(basicInfo).forEach((key) => {
      _formData.append(key, (basicInfo as any)[key]);
    });
    _formData.append("description", introSU);
    _formData.append("itemDescription", introItem);

    axios.post(
      `${process.env.REACT_APP_URL}/companies/info/startup/temp`,
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
    _formData.append("thumbnail", Mt.dataURLtoFile(thumbnail, "startup_img_"));
    _formData.append("logoImg", Mt.dataURLtoFile(logoImg, "startup_logo_"));
    Object.keys(basicInfo).forEach((key) => {
      _formData.append(key, (basicInfo as any)[key]);
    });
    _formData.append("description", introSU);
    _formData.append("itemDescription", introItem);

    axios.post(
      `${process.env.REACT_APP_URL}/companies/info/startup/save`,
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
        thumb={thumbnail}
        setThumb={setThumb}
        logo={logoImg}
        setLogo={setLogo}
        basicInfo={basicInfo}
        changeVal={changeBasicInfo}
        submit={saveBasicInfo}
      />

      <IntroForm
        cName={"startup"}
        title={"스타트업 소개"}
        txt={introSU}
        changeVal={changeIntroForm}
      />

      <IntroForm
        cName={"item"}
        title={"아이템 소개"}
        txt={introItem}
        changeVal={changeIntroForm}
      />

      <IntroImg />

      <InvestDesire />
      <InvestHist />
      <IntroTeam />
      <News />
      <BtnSet 
        save={saveForm}
        submit={submitForm} 
      />
    </>
  );
};

export default MyStartup;
