import styled from 'styled-components';
import * as St from 'styles/styledComp';
import InputBox from '../../InputBox';
import BasicBtn from 'components/common/button/BasicBtn';

const News = () => {
  return (
    <StCont>
      <St.SectionTitle>주요뉴스</St.SectionTitle>
      <StInputCont>
        <div className="top-cont">
          <div className="title">뉴스 URL</div>
          <InputBox
            type={"text"}
            placeholder={"최대 100자 입니다."}
            width={1000}
            height={44}
            fSize={18}
            fWeight={"normal"}
          />
          
        </div>

        <div className="bot-cont">
          <BasicBtn
            width={275}
            height={56}
            fSize={18}
            fWeight={"bold"}
            txt={"등록하기"}
          />
        </div>
      </StInputCont>
    </StCont>
  );
}
export default News;

const StCont = styled.div`
  margin: 120px 0;
`;

const StInputCont = styled.div`
  width: 100%;
  border: 1px solid #D9D9D9;
  border-radius: 6px;

  margin-top: 12px;

  display: flex;
  flex-direction: column;

  padding: 40px 108px 40px 56px;

  .top-cont {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32px;

    .title {
      font-size: 21px;
      font-weight: bold;
    }
  }
  .bot-cont {
    display: flex;
    justify-content: flex-end;
    height: 100
  }
`;