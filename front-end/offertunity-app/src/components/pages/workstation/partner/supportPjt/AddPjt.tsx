import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import * as Mt from "api/methods";
import PjtBasicInfo from './PjtBasicInfo';
import IntroForm from '../IntroForm';
import CheckDoc from './CheckDoc';
import BtnSet from '../../common/BtnSet';

interface BasicState {
  host: string;
  due_date: string;
  eligible_sectors: string;
  eligibilities: string;
  name: string;
  introduction: string;
  application_url: string;
}

const AddPjt:React.FC<any> = ({ id }) => {
  const _token = Mt.getUserInfo().token;
  const _history = useHistory();
  const [poster, setPoster] = useState<string>("");
  const [basicInfo, setBasicInfo] = useState<BasicState>({
    host: "",
    due_date: new Date().toISOString().substring(0, 10),
    eligible_sectors: "자금",
    eligibilities: "예비창업자",
    name: "",
    introduction: "",
    application_url: "",
  });
  const [outline, setOutline] = useState<string>("");
  const [detail, setDetail] = useState<string>("");
  const [apply, setApply] = useState<string>("");
  const [caution, setCaution] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [checkDoc, setCheckDoc] = useState<string[]>([]);

  useEffect(() => {
    if(id) {
      axios.get(`${process.env.REACT_APP_URL}/projects/${id}`)
      .then((res) => {
        const _resData = res.data.cleanedProject;
        console.log(_resData)
        console.log(_resData.application_url)

        setPoster(_resData.project_images);
        setBasicInfo({
          host: _resData.host,
          due_date: new Date(_resData.due_date).toISOString().substring(0, 10),
          eligible_sectors: _resData.eligible_sectors,
          eligibilities: _resData.eligibilities,
          name: _resData.name,
          introduction: _resData.introduction,
          application_url: _resData.application_url,
        })

        setOutline(_resData.outline)
        setDetail(_resData.detail)
        setApply(_resData.application_method);
        setCaution(_resData.caution)
        setContact(_resData.contact);
        setCheckDoc(_resData.required_documents);
      })
    }
  }, [])

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
      case "related-link":
        setBasicInfo({ ...basicInfo, ...{ application_url: _target.value } });
        break;
    }
  };

  // const saveBasicInfo = () => {
  //   const _formData = new FormData();

  //   _formData.append("project_picture", Mt.dataURLtoFile(poster, `${basicInfo.name}_logo`));
  //   Object.keys(basicInfo).forEach((key) => {
  //     _formData.append(key, (basicInfo as any)[key]);
  //   });

  //   axios.post(
  //     `${process.env.REACT_APP_URL}/projects/basicinfo/temp`,
  //     _formData,
  //     {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         Authorization: `Basic ${_token}`,
  //       },
  //     }
  //   )
  //   .then(() => {
  //     alert("기본 정보가 임시 저장 되었습니다.");
  //   })
  // };

 
  // const [postId, setPostId] = useState<number>(0);
  
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

  const changeCheckBox = (e: any) => {
    const _target = e.currentTarget.value;
    checkDoc.includes(_target) ? 
    setCheckDoc(checkDoc.filter((el:string) => el !== _target))
    :
    setCheckDoc([...checkDoc, _target])
  };

  // const saveForm = () => {
  //   const _formData = new FormData();

  //   _formData.append("project_picture", Mt.dataURLtoFile(poster, `${basicInfo.name}_logo`));
  //   Object.keys(basicInfo).forEach((key) => {
  //     _formData.append(key, (basicInfo as any)[key]);
  //   });
  //   _formData.append("outline", outline);
  //   _formData.append("detail", detail);
  //   _formData.append("application_method", apply);
  //   _formData.append("caution", caution);
  //   _formData.append("contact", contact);

  //   axios.post(
  //     `${process.env.REACT_APP_URL}/projects/allinfo/temp`,
  //     _formData,
  //     {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         Authorization: `Basic ${_token}`,
  //       },
  //     }
  //   )
  //   .then((res) => { 
  //     console.log(res.data)
  //     alert('임시 저장 성공')
  //   });
  // };

  const submitForm = () => {
    const _formData = new FormData();
    _formData.append("project_images", Mt.dataURLtoFile(poster, `${basicInfo.name}_logo`));
    Object.keys(basicInfo).forEach((key) => {
      _formData.append(key, (basicInfo as any)[key]);
    });
    _formData.append("outline", outline);
    _formData.append("detail", detail);
    _formData.append("application_method", apply);
    _formData.append("caution", caution);
    _formData.append("contact", contact);
    checkDoc.forEach((el:string) => {
      _formData.append("required_documents", el);
    })

    if(id) {
      axios.put(
        `${process.env.REACT_APP_URL}/projects/allinfo/save/${id}`,
        _formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Basic ${_token}`,
          },
        }
      )
      .then(() => { 
        alert('저장 성공')
        _history.replace(`/workstation/myproject`)
      });
    }
    else {
      axios.post(
        `${process.env.REACT_APP_URL}/projects/allinfo/save`,
        _formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Basic ${_token}`,
          },
        }
      )
      .then(() => { 
        alert('저장 성공')
        _history.replace(`/workstation/myproject`)
      });
    }
  };


  return (
    <>
      <PjtBasicInfo
        img={poster}
        setImg={setPoster}
        basicInfo={basicInfo}
        changeVal={changeBasicInfo}
        // submit={saveBasicInfo}
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

      <CheckDoc
        checkDoc={checkDoc}
        changeVal={changeCheckBox}
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
        // save={saveForm}
        submit={submitForm} 
      />
    </>
  );
}

export default AddPjt;

