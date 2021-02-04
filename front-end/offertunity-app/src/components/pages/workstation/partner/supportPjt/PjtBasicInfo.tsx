import styled, { css } from "styled-components";
import SelectBtn from "../../SelectBtn";
import InputBox from "../../InputBox";

const PjtBasicInfo: React.FC<any> = (props) => {
  const {
    host,
    due_date,
    sectors,
    eligibilities,
    name,
    introduction,
  } = props.basicInfo;

  const uploadImg = (e: any) => {
    e.preventDefault();
    const _imgFile = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      props.setImg(e.target.result);
    };
    reader.readAsDataURL(_imgFile);
  };

  return (
    <StBICont>
      <StTopCont>
        <StImgCont>
          <label htmlFor="imgUpload">
            <StImgWrap img={props.img}>
              <img
                className="camera"
                src="/images/icons/camera.svg"
                alt="camera-logo"
              />
              <div className="fir txt">공고 포스터 등록</div>
              <div className="scd txt">이미지 600x400 px</div>
            </StImgWrap>
          </label>
          <input id="imgUpload" type="file" name="img" onChange={uploadImg} />
        </StImgCont>

        <StFormCont>
          <StFormWrap>
            <div className="title fir">주최기관</div>
            <InputBox
              cName="host-name"
              type="text"
              placeholder="주최기관을 입력해주세요."
              width={478}
              height={48}
              fSize={28}
              fWeight={"bold"}
              value={host}
              changeVal={props.changeVal}
            />

            <div className="title">마감일</div>
            <InputBox
              cName="due-date"
              type="date"
              width={478}
              height={48}
              fSize={18}
              fWeight={"normal"}
              value={due_date}
              changeVal={props.changeVal}
            />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <div className="title">지원분야</div>
                <SelectBtn
                  cName="field"
                  mode="supportField"
                  width={186}
                  curVal={sectors}
                  changeVal={props.changeVal}
                />
              </div>

              <div>
                <div className="title">지원대상</div>
                <SelectBtn
                  cName="eligibility"
                  mode="eligibility"
                  width={186}
                  curVal={eligibilities}
                  changeVal={props.changeVal}
                />
              </div>
            </div>
          </StFormWrap>

          <div>
            <StButtonWrap onClick={props.submit}>
              기본정보 임시 저장
            </StButtonWrap>
          </div>
        </StFormCont>
      </StTopCont>

      <div>
        <div className="title">지원사업 이름</div>
        <InputBox
          cName="project-name"
          type="text"
          placeholder="지원사업 이름을 작성해 주세요"
          width={600}
          height={48}
          fSize={21}
          fWeight={"bold"}
          value={name}
          changeVal={props.changeVal}
        />

        <div className="title">지원사업 개요</div>
        <StTxtArea
          className="introduction"
          placeholder="지원사업 개요를 작성해 주세요"
          value={introduction}
          onChange={props.changeVal}
        />
      </div>
    </StBICont>
  );
};

export default PjtBasicInfo;

const StBICont = styled.div`
  width: 100%;
  margin-bottom: 120px;

  .title {
    font-size: 18px;
    font-weight: bold;
    margin-top: 24px;
    &.fir {
      margin-top: 0;
    }
    margin-bottom: 16px;
  }
`;

const StTopCont = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
`;

const StFormCont = styled.div`
  width: 572px;
  padding-right: 80px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
`;

const StImgCont = styled.div`
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

const StImgWrap = styled.div<{ img: string }>`
  cursor: pointer;
  width: 600px;
  height: 400px;
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
    props.img !== "" &&
    css`
      background-image: url(${props.img});
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center;

      * {
        visibility: collapse;
      }
    `}
`;

const StFormWrap = styled.div`
  /* .title {
    font-size: 18px;
    font-weight: bold;
    margin-top: 24px;
    &:first-child {
      margin-top: 0;
    }
    margin-bottom: 16px;
    &.neces::before {
      content: "*";
      position: absolute;
      color: red;
      text-shadow: 0 0 1px red;
    }
  } */

  .name-guide {
    margin-left: 24px;
    font-size: 13px;
    color: #898989;
  }
`;

const StButtonWrap = styled.span`
  cursor: pointer;
  display: inline-block;
  width: 275px;
  line-height: 56px;
  background: #5541ed;
  border-radius: 5px;

  margin-top: 32px;

  color: white;
  font-size: 18px;
  font-weight: bold;

  text-align: center;
  vertical-align: middle;
`;

const StTxtArea = styled.textarea`
  width: 1280px;
  height: 96px;

  padding: 20px;

  border: 1px solid #CDCDCD;
  border-radius: 6px;

  font-size: 18px;

  &::placeholder {
    color: #d8d8d8;
  }
`;