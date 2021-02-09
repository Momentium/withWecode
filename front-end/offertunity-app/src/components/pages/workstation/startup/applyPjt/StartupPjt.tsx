import { Link, withRouter } from 'react-router-dom';
import styled, { css } from 'styled-components';
import * as St from 'styles/styledComp';
import BasicBtn from 'components/common/button/BasicBtn';
import InputPjt from './EditInfo';
import ViewInfo from './ViewInfo';

const StartupPjt:React.FC<any> = ({ match }) => {
  const _params = match.params;

  return (
    <StCont curMode={_params.addon !== "editInfo"}>
      <St.SectionTitle>지원사업 제출 정보</St.SectionTitle>
      {
        _params.addon !== "editInfo" ? 
        <>
          <ViewInfo/>

          <div className="line"/>
          <StBotCont>
            <div>
              <div>마이페이지는 프로필 관리와 간략한 프로젝트 현황 정보를 포함하고 있습니다.</div>
              <div>스타트업 정보, 지원사업, 투자 관리 등은 [워크스테이션]을 이용해 주세요!</div>
            </div>
            <div>
              <Link to={`/workstation/mystartup`}>
                <BasicBtn
                  width={335}
                  height={56}
                  fSize={18}
                  fWeight={'bold'}
                  txt={"워크스테이션 바로가기"}
                />
              </Link>
            </div>
          </StBotCont>
        </>
        :
        <InputPjt/>
      }
    </StCont>
  );
};
export default withRouter(StartupPjt);

const StCont = styled.div<{curMode:boolean}>`
  padding: 0 56px;

  .line {
    margin: 120px 0;
    height: 1px;
    background: black;
    width: 100%;
  }

  .label {
    font-size: 18px;
    ${
      props => props.curMode ?
      css`
        color: black;
      `
      :
      css`
        color: #898989;
        font-weight: bold;
      `
    }
  }
`;

const StBotCont = styled.div`
  width: 100%;
  height: 100px;

  padding: 0 72px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;