import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import * as Mt from "api/methods";
import styled, { css } from "styled-components";
import BasicBtn from "components/common/button/BasicBtn";
import InputBox from "../../common/InputBox";
import SelectBtn from "../../common/SelectBtn";

const EditInfo = () => {
  const _token = Mt.getUserInfo().token;
  const sessionSave = JSON.parse(String(sessionStorage.getItem("sessionSave")));
  const _history = useHistory();
  const _nullTxt = "정보를 입력해 주세요.";
  const [data, setData] = useState<any>(sessionSave);
  useEffect(() => {
    sessionStorage.removeItem("sessionSave")
  }, [])

  const changeVal = (e: any) => {
    const _target = e.currentTarget;
    // console.log(_target);
    switch (_target.className.split(" ")[2]) {
      case "name":
        setData({ ...data, ...{name:_target.value}});
        break;
      case "rep":
        setData({ ...data, ...{rep:_target.value}});
        break;
      case "contact":
        setData({ ...data, ...{contact:_target.value}});
        break;
      case "address":
        setData({ ...data, ...{address:_target.value}});
        break;
      case "sector":
        setData({ ...data, ...{sector:_target.textContent}});
        break;
      case "tech":
        setData({ ...data, ...{technology:_target.textContent}});
        break;
      case "bizType":
        setData({ ...data, ...{businessType:_target.textContent}});
        break;
      case "bizLicense":
        setData({ ...data, ...{businessLicenseNum:_target.value}});
        break;
      case "email":
        setData({ ...data, ...{email:_target.value}});
        break;
      case "memberCount":
        setData({ ...data, ...{memberCount:Number(_target.value)}});
        break;
      case "homepage":
        setData({ ...data, ...{homepage:_target.value}});
        break;
      case "insta":
        setData({ ...data, ...{instagram:_target.value}});
        break;
      case "facebook":
        setData({ ...data, ...{facebook:_target.value}});
        break;
    }
  };

  const uploadLogo = (e: any) => {
    e.preventDefault();
    const _imgFile = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      // props.setLogo(e.target.result);
    };
    reader.readAsDataURL(_imgFile);
  };

  const submit = () => {
    const _formData = new FormData();
    Object.keys(data).forEach((key) => {
      console.log((data as any)[key])
      if((data as any)[key] === _nullTxt) {
        _formData.append(key, "");
      }
      else {
        _formData.append(key, (data as any)[key]);
      }
    })

    axios.post(`${process.env.REACT_APP_URL}/companies/project_info/startup/save`,
    _formData,
    {
      headers: {
        Authorization: `Basic ${_token}`
      }
    })
    .then((res) => {
      alert("저장 성공")
      _history.replace('/workstation/myproject')
    })
  };

  return (
    <StCont>
      <StLogoCont logo={data.logoImg}>
        <div className="img-wrap">
          <div>이미지를 등록해 주세요</div>
        </div>
        <StBtn>로고 이미지 등록</StBtn>
      </StLogoCont>

      <StFormCont>
        <div className="form-cont">
          <div>
            <StFormWrap>
              <div className="label">기업명</div>
              <InputBox
                type={"text"}
                width={314}
                height={48}
                fSize={18}
                cName={"name"}
                value={data.name !== _nullTxt ? data.name : ""}
                placeholder={_nullTxt}
                changeVal={changeVal}
              />
            </StFormWrap>

            <StFormWrap>
              <div className="label">대표자명</div>
              <InputBox
                type={"text"}
                width={314}
                height={48}
                fSize={18}
                cName={"rep"}
                value={data.rep !== _nullTxt ? data.rep : ""}
                placeholder={_nullTxt}
                changeVal={changeVal}
              />
            </StFormWrap>

            <StFormWrap>
              <div className="label">대표자연락처</div>
              <InputBox
                type={"text"}
                width={314}
                height={48}
                fSize={18}
                cName={"contact"}
                value={data.contact !== _nullTxt ? data.contact : ""}
                placeholder={_nullTxt}
                changeVal={changeVal}
              />
            </StFormWrap>

            <StFormWrap>
              <div className="label">기업 주소</div>
              <InputBox
                type={"text"}
                width={314}
                height={48}
                fSize={18}
                cName={"address"}
                value={data.address !== _nullTxt ? data.address : ""}
                placeholder={_nullTxt}
                changeVal={changeVal}
              />
            </StFormWrap>

            <StFormWrap dir>
              <div className="label">산업 영역</div>
              <SelectBtn
                cName={"sector"}
                mode={"sector"}
                width={186}
                curVal={data.sector}
                changeVal={changeVal}
              />
            </StFormWrap>

            <StFormWrap dir>
              <div className="label">기술</div>
              <SelectBtn
                cName={"tech"}
                mode={"tech"}
                width={186}
                curVal={data.technology}
                changeVal={changeVal}
              />
            </StFormWrap>

            {/* <StFormWrap dir>
              <div className="label">서비스 형태</div>
              <SelectBtn
                  cName={'service'}
                  mode={'tech'} 
                  width={186} 
                  curVal={service} 
                  changeVal={changeVal}
                />
            </StFormWrap> */}
          </div>

          <div>
            <StFormWrap dir>
              <div className="label">사업자 구분</div>
              <SelectBtn
                cName={"bizType"}
                mode={"bizType"}
                width={186}
                curVal={data.businessType}
                changeVal={changeVal}
              />
            </StFormWrap>

            <StFormWrap>
              <div className="label">사업자 등록 번호</div>
              <InputBox
                type={"text"}
                width={314}
                height={48}
                fSize={18}
                cName={"bizLicense"}
                value={data.businessLicenseNum !== _nullTxt ? data.businessLicenseNum : ""}
                placeholder={_nullTxt}
                changeVal={changeVal}
              />
            </StFormWrap>

            <StFormWrap>
              <div className="label">대표 이메일</div>
              <InputBox
                type={"text"}
                width={314}
                height={48}
                fSize={18}
                cName={"email"}
                value={data.email !== _nullTxt ? data.email : ""}
                placeholder={_nullTxt}
                changeVal={changeVal}
              />
            </StFormWrap>

            <StFormWrap dir>
              <div className="label">직원 수</div>
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <InputBox
                  type={"number"}
                  width={112}
                  height={48}
                  fSize={18}
                  cName={"memberCount"}
                  value={data.memberCount}
                  changeVal={changeVal}
                />
                <div style={{ marginLeft: "18px", fontSize: "18px" }}>명</div>
              </div>
            </StFormWrap>

            <StFormWrap>
              <div className="label">홈페이지</div>
              <InputBox
                type={"text"}
                width={314}
                height={48}
                fSize={18}
                cName={"homepage"}
                value={data.homepage !== _nullTxt ? data.homepage : ""}
                placeholder={_nullTxt}
                changeVal={changeVal}
              />
            </StFormWrap>

            <StFormWrap>
              <div className="label">인스타그램</div>
              <InputBox
                type={"text"}
                width={314}
                height={48}
                fSize={18}
                cName={"insta"}
                value={data.instagram !== _nullTxt ? data.instagram : ""}
                placeholder={_nullTxt}
                changeVal={changeVal}
              />
            </StFormWrap>

            <StFormWrap>
              <div className="label">페이스북</div>
              <InputBox
                type={"text"}
                width={314}
                height={48}
                fSize={18}
                cName={"facebook"}
                value={data.facebook !== _nullTxt ? data.facebook : ""}
                placeholder={_nullTxt}
                changeVal={changeVal}
              />
            </StFormWrap>
          </div>
        </div>

        <div className="btn-cont">
          <BasicBtn
            width={335}
            height={56}
            fSize={18}
            fWeight={"bold"}
            txt={"프로필 저장"}
            click={submit}
          />

          <BasicBtn
            width={275}
            height={56}
            backColor={"white"}
            fSize={18}
            fWeight={"bold"}
            txt={"취소하기"}
            click={() => {_history.replace('/workstation/myproject')}}
          />
        </div>
      </StFormCont>
    </StCont>
  );
};
export default EditInfo;

const StCont = styled.div`
  margin-bottom: 96px;

  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const StLogoCont = styled.div<any>`
  display: flex;
  flex-direction: column;
  align-items: center;

  .img-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #898989;

    width: 200px;
    height: 200px;

    border-radius: 50%;

    ${(props) =>
      props.logo === ""
        ? css`
            background: #f2f2f2;
          `
        : css`
            background-image: url(${props.logo});
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            div {
              display: none;
            }
          `}

    margin: 48px 0;
  }
`;

const StBtn = styled.span`
  cursor: pointer;
  user-select: none;
  display: inline-block;

  border-radius: 5px;
  text-align: center;
  vertical-align: middle;

  width: 224px;
  line-height: 56px;

  background: white;
  color: #192334;
  border: 1px solid #192334;

  font-size: 18px;
  font-weight: bold;
`;

const StFormCont = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;

  .form-cont {
    display: flex;
    & > div:first-child {
      margin-right: 48px;
    }
  }

  .btn-cont {
    margin-top: 96px;
    span:first-child {
      margin-right: 56px;
    }
  }
`;

const StFormWrap = styled.div<any>`
  margin-bottom: 24px;
  &:last-child {
    margin: 0;
  }

  ${(props) =>
    props.dir
      ? css`
          width: 314px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        `
      : css`
          .label {
            margin-bottom: 8px;
          }
        `}
`;
