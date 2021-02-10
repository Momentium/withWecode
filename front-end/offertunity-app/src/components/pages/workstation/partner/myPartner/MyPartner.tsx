import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Mt from "api/methods";
import BaseInfo from "./BaseInfo";
import IntroForm from "../IntroForm";
import IntroImg from "./IntroImg";
import InvestInfo from "../../common/investHist/InvestInfo";
import IntroTeam from "./IntroTeam";
import News from "./News";
import BtnSet from "../../common/BtnSet";

interface BasicState {
  name: string;
  establishedDate: string;
  investedCounts: number;
  totalInvested: string;
  interedtedTechnology: string;
  homepage: string;
}

const MyPartner = () => {
  const _token = Mt.getUserInfo().token;

  const [logoImg, setLogo] = useState<string>("");
  const [basicInfo, setBasicInfo] = useState<BasicState>({
    name: "",
    establishedDate: new Date().toISOString().substring(0, 10),
    investedCounts: 0,
    totalInvested: "1천만원 - 5천만원",
    interedtedTechnology: "블록체인",
    homepage: "",
  });
  const [introTxt, setintroTxt] = useState<string>("");
  const [investInfo, setInvestInfo] = useState<any[]>([]);
  const [submitInvest, setSubmitInvest] = useState<any[]>([]);
  const [newInvest, setNewInvest] = useState<{}>({
    temp: 0,
    investedDates: "",
    investedStartups: "",
    investedFunds: "1천만원 - 5천만원",
    investedValues: "",
    investedSeries: "엔젤투자",
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
          alert("정보가 아직 등록 되어있지 않습니다.");
        } else {
          console.log(_resData);
          setLogo(_resData.logoImg ? _resData.logoImg : "");
          setBasicInfo({
            ...basicInfo,
            ...{
              name: _resData.name,
              establishedDate: new Date(_resData.establishedDate)
                .toISOString()
                .substring(0, 10),
              investedCounts: _resData.investedCounts,
              totalInvested: _resData.totalInvested
                ? _resData.totalInvested
                : "1천만원 - 5천만원",
              interedtedTechnology: _resData.interedtedTechnology
                ? _resData.interedtedTechnology
                : "블록체인",
              homepage: _resData.homepage ? _resData.homepage : "",
            },
          });
          setintroTxt(_resData.description ? _resData.description : "");
          setInvestInfo(_resData.investedTo);
        }
      })
      .catch((err) => {
        alert(`데이터 전송에 실패했습니다.\n ${err}`);
      });
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
        setBasicInfo({
          ...basicInfo,
          ...{ totalInvested: _target.textContent },
        });
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

    _formData.append(
      "logoImg",
      Mt.dataURLtoFile(logoImg, `${basicInfo.name}_logo`)
    );

    axios
      .post(
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
      .catch((err) => {
        console.log(err);
      });
  };

  const changeIntroForm = (e: any) => {
    const _target = e.currentTarget;
    switch (_target.className.split(" ")[2]) {
      case "invest-partner":
        setintroTxt(_target.value);
        _target.value.length > 500 &&
          setintroTxt(_target.value.substring(0, 500));
        break;
    }
  };

  const changeInvestForm = (e: any) => {
    const _target = e.currentTarget;
    switch (_target.className.split(" ")[2]) {
      case "invest_day":
        setNewInvest({ ...newInvest, ...{ investedDates: _target.value } });
        break;
      case "invest_depart":
        setNewInvest({ ...newInvest, ...{ investedStartups: _target.value } });
        break;
      case "invest-cost":
        setNewInvest({
          ...newInvest,
          ...{ investedFunds: _target.textContent },
        });
        break;
      case "company_value":
        setNewInvest({ ...newInvest, ...{ investedValues: _target.value } });
        break;
      case "invest-series":
        setNewInvest({
          ...newInvest,
          ...{ investedSeries: _target.textContent },
        });
        break;
    }
  };

  const addInvest = () => {
    setInvestInfo([newInvest].concat(investInfo));
    setSubmitInvest(submitInvest.concat(newInvest));
    setNewInvest({
      temp: (newInvest as any).temp + 1,
      investedDates: "",
      investedStartups: "",
      investedFunds: "1천만원 - 5천만원",
      investedValues: "",
      investedSeries: "엔젤투자",
    });
  };
  const removeInvest = (e: any) => {
    const _target = e.currentTarget.className.split(" ");

    if (_target[1] !== "undefined") {
      setInvestInfo(
        investInfo.filter((el: any) => el.id !== Number(_target[1]))
      );
      setSubmitInvest(submitInvest.concat({ id: _target[1] }));
    } else if (_target[2] !== "undefined") {
      setInvestInfo(
        investInfo.filter((el: any) => el.temp !== Number(_target[2]))
      );
      setSubmitInvest(
        submitInvest.filter((el: any) => el.temp !== Number(_target[2]))
      );
    }
  };

  const saveForm = () => {
    const _formData = new FormData();
    _formData.append(
      "logoImg",
      Mt.dataURLtoFile(logoImg, `${basicInfo.name}_logo`)
    );
    Object.keys(basicInfo).forEach((key) => {
      _formData.append(key, (basicInfo as any)[key]);
    });
    _formData.append("description", introTxt);

    axios
      .post(
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
        console.log(res);
        alert("임시 저장 성공");
      });
  };

  const submitForm = () => {
    const _formData = new FormData();
    _formData.append(
      "logoImg",
      Mt.dataURLtoFile(logoImg, `${basicInfo.name}_logo`)
    );
    Object.keys(basicInfo).forEach((key) => {
      _formData.append(key, (basicInfo as any)[key]);
    });
    _formData.append("description", introTxt);
    _formData.append("investedTo", JSON.stringify(submitInvest));

    axios
      .post(
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
        console.log(res);
        alert("저장 성공");
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
        cName={"invest-partner"}
        title={"투자 파트너 소개"}
        txt={introTxt}
        changeVal={changeIntroForm}
      />

      <IntroImg />

      <InvestInfo
        view={"partner"}
        data={investInfo}
        value={newInvest}
        changeVal={changeInvestForm}
        addInvest={addInvest}
        removeInvest={removeInvest}
      />

      <IntroTeam />
      <News />
      <BtnSet save={saveForm} submit={submitForm} />
    </>
  );
};

export default MyPartner;
