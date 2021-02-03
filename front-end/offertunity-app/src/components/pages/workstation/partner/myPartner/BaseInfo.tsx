import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import * as Mt from 'api/methods';
import SelectBtn from '../../SelectBtn';
import Necessary from 'components/common/message/Necessary'

const BaseInfo:React.FC<any> = ({ submitBaseInfo }) => {
  const [img, setImg] = useState<any>();
  const [logo, setLogo] = useState<any>();
  const [name, setName] = useState<string>("");
  const [rep, setRep] = useState<string>("");
  const [estDate, setEstDate] = useState<string>("");
  const [sector, setSector] = useState<string>("플랫폼");
  const [tech, setTech] = useState<string>("블록체인");
  const [investCost, setInvestCost] = useState<string>("1천만원 - 5천만원");
  const [homepage, setHompage] = useState<string>("");

  const changeVal = (e:any) => {
    const _target = e.currentTarget;
    console.log(_target)
    switch(_target.className.split(" ")[2]) {
      case 'startup-name':
        setName(_target.value);
        break;
      case 'ceo-name':
        setRep(_target.value);
        break;
      case 'establish':
        setEstDate(_target.value);
        break;
      case 'sector':
        setSector(_target.textContent);
        break;
      case 'tech':
        setTech(_target.textContent);
        break;
      case 'investCost':
        setInvestCost(_target.textContent);
        break;
      case 'homepage':
        setHompage(_target.value);
        break;
    }
  }

  const uploadImg = (e: any) => {
    e.preventDefault();
    const _imgFile = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e:any) => {
      console.log(e.target.result)
      setImg(Mt.dataURLtoFile(e.target.result, 'img'))
    }
    reader.readAsDataURL(_imgFile);
  }

  const uploadLogo = (e:any) => {
    e.preventDefault();
    const _imgFile = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e:any) => {
      console.log(e.target.result)
      setLogo(Mt.dataURLtoFile(e.target.result, 'logo'))
    }
    reader.readAsDataURL(_imgFile);
  }

  const clickSubmit = () => {
    const token = sessionStorage.getItem('token')
    const data = {
      thumbnail: img,
      logoImg: logo,
      name: name,
      rep: rep,
      establishedDate: estDate,
      sectorId: sector,
      coreTechnologyId: tech,
      homepage: homepage,
    }
    const _formData = new FormData();
    Object.keys(data).forEach((key) => {
      _formData.append(key, (data as any)[key])  
    })
    
    axios.post(`${process.env.REACT_APP_URL}/companies/info/startup`,
      _formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Token ${token}`
        }
      }
    )
    .catch((err) => console.log(err))
  }

  return (
    <StBICont>
      <StImgWrap>
        <div className="img-cont">
          <div className="logo-cont">
            <input id="imgUpload" type="file" name="img" onChange={uploadImg}/>
            <label htmlFor="imgUpload">
              <img className="camera" src="/images/icons/camera.svg" alt="camera-logo"/>
            </label>
            <div className="fir txt">* 기업 로고 등록</div>
            <div className="scd txt">이미지 400x400 px</div>
          </div>
        </div>
      </StImgWrap>

      <StFormCont>

        <Necessary/>

        <StFormWrap>
          <div className="title neces" style={{display: 'inline-block'}}>*파트너 기관명</div>
          <div className="name-guide" style={{display: 'inline-block'}}>최대 15글자</div>
          <StInputBox 
            className="startup-name"
            type="text" 
            placeholder="스타트업명을 입력해주세요"
            value={name}
            onChange={changeVal}
          />

          <div className="title neces">*설립일</div>
          <StInputBox 
            className="establish"
            type="date" 
            placeholder="Date"
            value={estDate}
            onChange={changeVal}
          />

          <div className="title neces">*투자 집행 건수</div>
          <StInputBox 
            className="ceo-name"
            type="text" 
            placeholder="00 건"
            value={rep}
            onChange={changeVal}
          />

          <div className="title">총 투자액</div>
          <SelectBtn cName="investCost" mode="investCost" width={208} curVal={investCost} changeVal={changeVal}/>

          <div className="title neces">*대표 관심 분야</div>
          <SelectBtn cName="tech" mode="tech" width={186} curVal={tech} changeVal={changeVal}/>

          <div className="title">홈페이지</div>
          <StInputBox 
            className="homepage"
            type="text" 
            placeholder="홈페이지 URL"
            value={homepage}
            onChange={changeVal}
          />


        </StFormWrap>

        <StButtonWrap onClick={clickSubmit}>기본정보 임시 저장</StButtonWrap>
        
      </StFormCont>

    </StBICont>
  );
}

export default BaseInfo;

const StBICont = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;

  margin-bottom: 120px;
`;

const StImgWrap = styled.div`

  .img-title {
    margin-bottom: 16px;
    font-size: 18px;
    font-weight: bold;
  }
  .img-cont {
    width: 493px;
    height: 493px;
    border: solid 1px #CDCDCD;

    position: relative;

    .logo-cont {
      position: absolute;

      display: flex;
      flex-direction: column;
      align-items: center;

      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);

      img {
        cursor: pointer;
        width: 72px;
      }

      input {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
      }

      .txt {
        font-size: 13px;
        color: #898989;

        &.fir {
          margin-top: 24px;
          margin-bottom: 12px;
          color: red;
        }
      }
    }
  }

`;

const StFormCont = styled.div`
  width: 572px;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
`;

const StLogoWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .logo-cont {
    width: 114px;
    height: 114px;
    border: solid 1px #CDCDCD;
    border-radius: 14px;
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  img {
    cursor: pointer;
    width: 30px;
  }

  input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }

  .txt {
    font-size: 13px;
    color: #898989;
    margin-top: 8px;
  }

`;

const StFormWrap = styled.div`
  .title {
    font-size: 18px;
    font-weight: bold;
    margin-top: 24px;
    margin-bottom: 16px;
    &.neces::before {
      content:'*';
      position:absolute;
      color: red;
      text-shadow: 0 0 1px red;
    }
  }

  .name-guide {
    margin-left: 24px;
    font-size: 13px;
    color: #898989;
  }
`;

const StInputBox = styled.input`
  vertical-align: center;
  line-height: 48px;

  padding: 0 16px;
  border: 1px solid #D8D8D8;
  border-radius:6px;
  &::placeholder{
    color:#D8D8D8;
  }  

  &.startup-name {
    width: 442px;

    font-size: 28px;
    font-weight: bold;
    
    &::placeholder{
      font-size: 20px;
    }  
  }

  &.ceo-name {
    width: 265px;

    font-size: 18px;
    font-weight: normal;
  }

  &.establish {
    width: 275px;

    font-size: 18px;
    font-weight: normal;
  }

  &.homepage {
    width: 572px;

    font-size: 18px;
    font-weight: normal;
  }

`;

const StButtonWrap = styled.span`
  cursor: pointer;
  display: inline-block;
  width: 275px;
  line-height: 56px;
  background: #5541ED;
  border-radius: 5px;

  margin-top: 24px;

  color: white;
  font-size: 18px;
  font-weight: bold;

  text-align: center;
  vertical-align: middle;
`;