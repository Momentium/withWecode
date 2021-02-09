import styled from 'styled-components';
import * as St from 'styles/styledComp';
import InputBox from '../../common/InputBox';
import IntroMember from './IntroMember';

const IntroTeam:React.FC<any> = () => {
  return (
    <StCont>
      <St.SectionTitle>소속 파트너 소개</St.SectionTitle>
      <StSimpleIntroDiv>
        <div className="title">한 줄 소개</div>
        <InputBox
          cName="team-intro"
          type="text" 
          placeholder="최대 100자 입니다."

          width={628}
          height={44}
          fSize={18}
          fWeight={'normal'}

          // value={""}
          changeVal={() => {}}
        />
      </StSimpleIntroDiv>
      
      <StBotCont>
        <StPopulationWrap>
          <div>
            <div className="title">팀원 수</div>
          </div>
          <div className="mid-cont">
            <div className="input-wrap">
              <InputBox
                cName="team-popul"
                type="text" 
                placeholder=""

                width={71}
                height={44}
                fSize={18}
                fWeight={'normal'}

                value={""}
                changeVal={() => {}}
              />
              <div className="popul">명</div>
            </div>
            <div className="guide-msg">숫자만 입력해주세요.</div>
          </div>

          

          <div style={{visibility: "hidden"}}>
            <div className="title">팀원 수</div>
          </div>

        </StPopulationWrap>

        <StMemberCont>
          <div className="title">팀원 소개</div>
          <div className="mem-list">
            <div className="overflow-div">
            {
              <>
              <IntroMember/>
              </>
            }
            </div>
          </div>
        </StMemberCont>
      </StBotCont>
    </StCont>
  );
}
export default IntroTeam;

const StCont = styled.div`
  .title{
    font-weight: bold;
    font-size: 21px;
  }
`;

const StSimpleIntroDiv = styled.div`
  width: 100%;
  height: 88px;
  border: 1px solid #D9D9D9;
  border-radius: 6px;

  margin: 24px 0;
  padding: 0 40px;

  display: flex;
  align-items: center;

  input {
    margin-left: 72px;
  }
`;

const StBotCont = styled.div`
  display: flex;
  height: 408px;

  & > div {
    border: 1px solid #D9D9D9;
    border-radius: 6px;
    padding: 32px 40px; 
    height: 100%;
  }
`;

const StPopulationWrap = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  margin-right: 24px;

  .mid-cont {
    display: flex;
    flex-direction: column;
    align-items: center;

    .input-wrap {
      display: flex;
      justify-content: center;
      align-items: flex-end;

      .popul {
        margin-left: 16px;
      }
    }

    .guide-msg {
      color: #B7B7B7;
      font-size: 13px;
      margin-top: 16px;
    }
  }
`;

const StMemberCont = styled.div`
  flex: 8;

  .mem-list {
    height: 100%;
    overflow-x: scroll;
    display: flex;
    align-items: center;

    .overflow-div {
      flex-shrink: 0;
    }

  }
`;
