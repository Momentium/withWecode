import styled, { css } from "styled-components";
import SelectBtn from "../../SelectBtn";
import Necessary from "components/common/message/Necessary";

const BaseInfo: React.FC<any> = (props) => {
  const {
    name,
    establishedDate,
    investedCounts,
    totalInvested,
    interedtedTechnology,
    homepage,
  } = props.basicInfo;

  const uploadLogo = (e: any) => {
    e.preventDefault();
    const _imgFile = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      props.setLogo(e.target.result);
    };
    reader.readAsDataURL(_imgFile);
  };

  return (
    <StBICont>
      <StLogoCont>
        <label htmlFor="imgUpload">
          <StLogoWrap logo={props.logo}>
            <img
              className="camera"
              src="/images/icons/camera.svg"
              alt="camera-logo"
            />
            <div className="fir txt">* 기업 로고 등록</div>
            <div className="scd txt">이미지 400x400 px</div>
          </StLogoWrap>
        </label>
        <input id="imgUpload" type="file" name="img" onChange={uploadLogo} />
      </StLogoCont>

      <StFormCont>
        <Necessary />

        <StFormWrap>
          <div className="title neces" style={{ display: "inline-block" }}>
            *파트너 기관명
          </div>
          <div className="name-guide" style={{ display: "inline-block" }}>
            최대 15글자
          </div>
          <StInputBox
            className="partner-name"
            type="text"
            placeholder="스타트업명을 입력해주세요"
            value={name}
            onChange={props.changeVal}
          />

          <div className="title neces">*설립일</div>
          <StInputBox
            className="establish"
            type="date"
            placeholder="Date"
            value={establishedDate}
            onChange={props.changeVal}
          />

          <div className="title neces">*투자 집행 건수</div>
          <span style={{ fontSize: "18px" }}>
            <StInputBox
              className="count"
              type="text"
              placeholder="00"
              value={investedCounts}
              onChange={props.changeVal}
            />
            &nbsp;&nbsp;&nbsp;건
          </span>

          <div className="title">총 투자액</div>
          <SelectBtn
            cName="total"
            mode="investCost"
            width={208}
            curVal={totalInvested}
            changeVal={props.changeVal}
          />

          <div className="title neces">*대표 관심 분야</div>
          <SelectBtn
            cName="tech"
            mode="tech"
            width={186}
            curVal={interedtedTechnology}
            changeVal={props.changeVal}
          />

          <div className="title">홈페이지</div>
          <StInputBox
            className="homepage"
            type="text"
            placeholder="홈페이지 URL"
            value={homepage}
            onChange={props.changeVal}
          />
        </StFormWrap>

        <StButtonWrap onClick={props.submit}>기본정보 임시 저장</StButtonWrap>
      </StFormCont>
    </StBICont>
  );
};

export default BaseInfo;

const StBICont = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;

  margin-bottom: 120px;
`;

const StFormCont = styled.div`
  width: 572px;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
`;

const StLogoCont = styled.div`
  position: relative;

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

  .img-label {
    margin-bottom: 16px;
    font-size: 18px;
    font-weight: bold;
  }

  display: flex;
  flex-direction: column;

  & > .scd {
    align-self: center;
    font-size: 13px;
    color: #898989;
    margin: 8px 0;
  }
`;

const StLogoWrap = styled.div<{ logo: string }>`
  cursor: pointer;
  width: 500px;
  height: 500px;
  border: solid 1px #cdcdcd;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .camera {
    display: block;
    width: 72px;
  }

  .txt {
    font-size: 13px;
    color: #898989;

    &.fir {
      margin-top: 24px;
      margin-bottom: 12px;
    }
  }

  ${(props) =>
    props.logo !== "" &&
    css`
      background-image: url(${props.logo});
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center;

      * {
        visibility: collapse;
      }
    `}
`;

const StFormWrap = styled.div`
  .title {
    font-size: 18px;
    font-weight: bold;
    margin-top: 24px;
    margin-bottom: 16px;
    &.neces::before {
      content: "*";
      position: absolute;
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
  border: 1px solid #d8d8d8;
  border-radius: 6px;
  &::placeholder {
    color: #d8d8d8;
  }

  &.partner-name {
    width: 442px;

    font-size: 28px;
    font-weight: bold;

    &::placeholder {
      font-size: 20px;
    }
  }

  &.count {
    width: 150px;

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
  background: #5541ed;
  border-radius: 5px;

  margin-top: 24px;

  color: white;
  font-size: 18px;
  font-weight: bold;

  text-align: center;
  vertical-align: middle;
`;
