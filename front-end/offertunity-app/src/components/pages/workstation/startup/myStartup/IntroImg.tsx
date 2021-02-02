import styled from 'styled-components';

const IntroImg:React.FC<any> = () => {
  return (
    <>
      <StTitleDiv>소개 이미지 등록</StTitleDiv>
      <StGuideDiv>이미지 최대 5장 업로드 가능합니다.</StGuideDiv>
      <StImgWrap>
        <div className="img-cont">
          <div className="logo-cont">
            <input id="imgUpload" type="file" name="img"/>
            <label htmlFor="imgUpload">
              <img className="camera" src="/images/icons/camera.svg" alt="camera-logo"/>
            </label>
            <div className="txt">이미지 사이즈 600x400 px</div>
          </div>
        </div>
      </StImgWrap>
    </>
  );
};
export default IntroImg;


const StTitleDiv = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const StGuideDiv = styled.div`
  margin: 24px 0;
  font-size: 15px;
  color: #9F9F9F;
`;


const StImgWrap = styled.div`

  .img-title {
    margin-bottom: 16px;
    font-size: 18px;
    font-weight: bold;
  }
  .img-cont {
    width: 633px;
    height: 422px;
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
        margin-top: 16px;
      }
    }
  }

`;