import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import * as Mt from "api/methods";
import styled, { css } from "styled-components";

const ViewPjt: React.FC<any> = ({ match, handleModal, modal, applyResult }) => {
  const _params = match.params.tab;
  const _token = Mt.getUserInfo().token;
  const _nullTxt = "정보를 입력해 주세요.";
  const [logoImg, setLogo] = useState<any>();
  const [name, setName] = useState<string>("");
  const [rep, setRep] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [address, setAddr] = useState<string>("");
  const [sector, setSector] = useState<string>("마케팅");
  const [technology, setTech] = useState<string>("블록체인");
  const [businessType, setBizType] = useState<string>("개인");
  const [businessLicenseNum, setBizLicense] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [memberCount, setMemberCnt] = useState<number>(0);
  const [homepage, setHompage] = useState<string>("");
  const [instagram, setInsta] = useState<string>("");
  const [facebook, setFacebook] = useState<string>("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/companies/project_info/startup`, {
        headers: {
          Authorization: `Basic ${_token}`,
        },
      })
      .then((res) => {
        const _resData = res.data.body;
        console.log(_resData);
        setLogo(_resData.logoImg);
        setName(_resData.name ? _resData.name : _nullTxt);
        setRep(_resData.rep ? _resData.rep : _nullTxt);
        setContact(_resData.contact ? _resData.contact : _nullTxt);
        setAddr(_resData.address ? _resData.address : _nullTxt);
        setSector(_resData.sector);
        setTech(_resData.technology);
        setBizType(_resData.businessType ? _resData.businessType : "개인");
        setBizLicense(
          _resData.businessLicenseNum ? _resData.businessLicenseNum : _nullTxt
        );
        setEmail(_resData.email ? _resData.email : _nullTxt);
        setMemberCnt(_resData.memberCount ? _resData.memberCount : 0);
        setHompage(_resData.homepage ? _resData.homepage : _nullTxt);
        setInsta(_resData.instagram ? _resData.instagram : _nullTxt);
        setFacebook(_resData.facebook ? _resData.facebook : _nullTxt);
      });
  }, [modal]);

  const sessionSave = () => {
    const _data = {
      logoImg,
      name,
      rep,
      contact,
      address,
      sector,
      technology,
      businessType,
      businessLicenseNum,
      email,
      memberCount,
      homepage,
      instagram,
      facebook,
    };
    sessionStorage.setItem("sessionSave", JSON.stringify(_data));
  };

  return (
    <StCont>
      <StLogoCont logo={logoImg}>
        <div className="img-wrap">
          <div>이미지를 등록해 주세요</div>
        </div>
        {_params === "myproject" ? (
          <Link to={`/workstation/myproject/editInfo`} onClick={sessionSave}>
            <StBtn>제출 정보 편집</StBtn>
          </Link>
        ) : applyResult ? (
          <StBtn>기본 정보 편집</StBtn>
        ) : (
          <StBtn
            onClick={() => {
              handleModal();
              sessionSave();
            }}
          >
            기본 정보 편집
          </StBtn>
        )}
      </StLogoCont>

      <StTableCont>
        <div className="form-cont">
          <div>
            <StTableWrap>
              <div className="label">기업명</div>
              <div className={name === _nullTxt ? "null" : "element"}>
                {name}
              </div>
            </StTableWrap>

            <StTableWrap>
              <div className="label">대표자명</div>
              <div className={rep === _nullTxt ? "null" : "element"}>{rep}</div>
            </StTableWrap>

            <StTableWrap>
              <div className="label">대표자연락처</div>
              <div className={contact === _nullTxt ? "null" : "element"}>
                {contact}
              </div>
            </StTableWrap>

            <StTableWrap>
              <div className="label">기업 주소</div>
              <div className={address === _nullTxt ? "null" : "element"}>
                {address}
              </div>
            </StTableWrap>

            <StTableWrap>
              <div className="label">산업 영역</div>
              <div className={sector === _nullTxt ? "null" : "element"}>
                {sector}
              </div>
            </StTableWrap>

            <StTableWrap>
              <div className="label">기술</div>
              <div className={technology === _nullTxt ? "null" : "element"}>
                {technology}
              </div>
            </StTableWrap>
          </div>

          <div>
            <StTableWrap>
              <div className="label">사업자 구분</div>
              <div className={businessType === _nullTxt ? "null" : "element"}>
                {businessType}
              </div>
            </StTableWrap>

            <StTableWrap>
              <div className="label">사업자 등록 번호</div>
              <div
                className={businessLicenseNum === _nullTxt ? "null" : "element"}
              >
                {businessLicenseNum}
              </div>
            </StTableWrap>

            <StTableWrap>
              <div className="label">대표 이메일</div>
              <div className={email === _nullTxt ? "null" : "element"}>
                {email}
              </div>
            </StTableWrap>

            <StTableWrap>
              <div className="label">직원 수</div>
              <div className={"element"}>{memberCount}</div>
            </StTableWrap>

            <StTableWrap>
              <div className="label">홈페이지</div>
              {homepage === _nullTxt ? (
                <div className="null">{homepage}</div>
              ) : (
                <a
                  className="element"
                  href={`//${homepage}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {homepage}
                </a>
              )}
            </StTableWrap>

            <StTableWrap>
              <div className="label">인스타그램</div>
              {instagram === _nullTxt ? (
                <div className="null">{instagram}</div>
              ) : (
                <a
                  className="element"
                  href={`//${instagram}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {instagram}
                </a>
              )}
            </StTableWrap>

            <StTableWrap>
              <div className="label">페이스북</div>
              {facebook === _nullTxt ? (
                <div className="null">{facebook}</div>
              ) : (
                <a
                  className="element"
                  href={`//${facebook}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {facebook}
                </a>
              )}
            </StTableWrap>
          </div>
        </div>
      </StTableCont>
    </StCont>
  );
};
export default withRouter(ViewPjt);

const StCont = styled.div`
  margin-bottom: 96px;
  padding: 0 50px;

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

  background: #192334;
  color: white;
  border: 1px solid #192334;

  font-size: 18px;
  font-weight: bold;
`;

const StTableCont = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;

  .form-cont {
    display: flex;
    & > div {
      min-width: 265px;
    }
    & > div:first-child {
      margin-right: 88px;
    }
  }

  .btn-cont {
    margin-top: 96px;
    span:first-child {
      margin-right: 56px;
    }
  }
`;

const StTableWrap = styled.div<any>`
  margin-bottom: 32px;
  &:last-child {
    margin: 0;
  }

  font-size: 18px;
  .label {
    margin-bottom: 16px;
  }
  .element {
    font-weight: bold;
  }
  .null {
    color: gray;
  }
`;
