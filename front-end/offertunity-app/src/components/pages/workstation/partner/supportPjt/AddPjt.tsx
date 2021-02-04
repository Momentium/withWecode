import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import * as Mt from "api/methods";
import PjtBasicInfo from './PjtBasicInfo';
import IntroForm from '../IntroForm';
import BtnSet from '../../BtnSet';

interface BasicState {
  host: string;
  due_date: string;
  eligible_sectors: string;
  eligibilities: string;
  name: string;
  introduction: string;
}

const AddPjt = () => {
  const _token = Mt.getUserInfo().token;
  const _history = useHistory();
  const [poster, setPoster] = useState<string>("");
  const [basicInfo, setBasicInfo] = useState<BasicState>({
    host: "",
    due_date: new Date().toISOString().substring(0, 10),
    eligible_sectors: "공간지원",
    eligibilities: "업력 무관",
    name: "",
    introduction: ""
  });

  const changeBasicInfo = (e: any) => {
    const _target = e.currentTarget;
    switch (_target.className.split(" ")[2]) {
      case "host-name":
        _target.value.length < 15 &&
          setBasicInfo({ ...basicInfo, ...{ host: _target.value } });
        break;
      case "due-date":
        setBasicInfo({ ...basicInfo, ...{ due_date: _target.value } });
        break;
      case "field":
        setBasicInfo({ ...basicInfo, ...{ eligible_sectors: _target.textContent } });
        break;
      case "eligibility":
        setBasicInfo({ ...basicInfo, ...{ eligibilities: _target.textContent } });
        break;
      case "project-name":
        setBasicInfo({ ...basicInfo, ...{ name: _target.value } });
        break;
      case "introduction":
        setBasicInfo({ ...basicInfo, ...{ introduction: _target.value } });
        break;
    }
  };

  const saveBasicInfo = () => {
    const _formData = new FormData();

    _formData.append("project_picture", Mt.dataURLtoFile(poster, `${basicInfo.name}_logo`));
    Object.keys(basicInfo).forEach((key) => {
      _formData.append(key, (basicInfo as any)[key]);
    });

    axios.post(
      `${process.env.REACT_APP_URL}/projects/basicinfo/temp`,
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

  const [outline, setOutline] = useState<string>("");
  const [detail, setDetail] = useState<string>("");
  const [apply, setApply] = useState<string>("");
  const [caution, setCaution] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [postId, setPostId] = useState<number>(0);
  
  const changeIntroForm = (e: any) => {
    const _target = e.currentTarget;

    switch (_target.className.split(" ")[2]) {
      case "outline":
        setOutline(_target.value);
        break;
      case "detail":
        setDetail(_target.value);
        break;
      case "apply":
        setApply(_target.value);
        break;
      case "caution":
        setCaution(_target.value);
        break;
      case "contact":
        setContact(_target.value);
        break;
    }
  };

  const saveForm = () => {
    const _formData = new FormData();

    _formData.append("project_picture", Mt.dataURLtoFile(poster, `${basicInfo.name}_logo`));
    Object.keys(basicInfo).forEach((key) => {
      _formData.append(key, (basicInfo as any)[key]);
    });
    _formData.append("outline", outline);
    _formData.append("detail", detail);
    _formData.append("application_method", apply);
    _formData.append("caution", caution);
    _formData.append("contact", contact);

    axios.post(
      `${process.env.REACT_APP_URL}/projects/allinfo/temp`,
      _formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Basic ${_token}`,
        },
      }
    )
    .then((res) => { 
      console.log(res.data)
      setPostId(res.data.ProjectId);
      alert('임시 저장 성공')
    });
  };
  const submitForm = () => {
    const _formData = new FormData();
    
    // _formData.append("project_picture", Mt.dataURLtoFile(poster, `${basicInfo.name}_logo`));
    // Object.keys(basicInfo).forEach((key) => {
    //   _formData.append(key, (basicInfo as any)[key]);
    // });
    // _formData.append("outline", outline);
    // _formData.append("detail", detail);
    // _formData.append("application_method", apply);
    // _formData.append("caution", caution);
    // _formData.append("contact", contact);
    // _formData.append("contact", contact);

    axios.post(
      `${process.env.REACT_APP_URL}/projects/allinfo/save/${postId}`,
      _formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Basic ${_token}`,
        },
      }
    )
    .then((res) => { 
      alert('저장 성공')
      _history.replace(`/workstation/myproject`)
    });
  };


  return (
    <>
      <PjtBasicInfo
        img={poster}
        setImg={setPoster}
        basicInfo={basicInfo}
        changeVal={changeBasicInfo}
        submit={saveBasicInfo}
      />

      <IntroForm 
        cName={"outline"}
        title={"지원사업 안내"}
        txt={outline}
        changeVal={changeIntroForm}
      />

      <IntroForm 
        cName={"detail"}
        title={"지원 내용"}
        txt={detail}
        changeVal={changeIntroForm}
      />

      <IntroForm 
        cName={"apply"}
        title={"신청방법 및 대상"}
        txt={apply}
        changeVal={changeIntroForm}
      />

      <IntroForm 
        cName={"caution"}
        title={"유의 사항"}
        txt={caution}
        changeVal={changeIntroForm}
      />

      <IntroForm 
        cName={"contact"}
        title={"문의처"}
        txt={contact}
        changeVal={changeIntroForm}
      />



      <BtnSet 
        save={saveForm}
        submit={submitForm} 
      />
    </>
  );
}

export default AddPjt;

