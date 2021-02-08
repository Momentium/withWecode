import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import * as St from "styles/styledComp";
import * as Mt from 'api/methods'
import GuideBar from "./common/GuideBar";
import MyStartup from "./startup/myStartup/MyStartup";
import SupportPjt from "./startup/supportPjt/SupportPjt";
import AdminIRReq from "./AdminIRReq";
import MyPartner from "./partner/myPartner/MyPartner";
import PartnerPjt from "./partner/supportPjt/PartnerPjt";

const WSPage: React.FC<any> = ({ match }) => {
  const _userInfo = Mt.getUserInfo();
  const _curType: number = _userInfo.type_id;
  const _curTab: string = match.params.tab;
  const navi: any =
    _curType === 1
      ? {
          mystartup: "마이 스타트업",
          myproject: "지원사업 프로젝트",
          myrequest: "IR 자료 요청 관리",
          mydocument: "IR 자료 및 지원서류 관리",
        }
      : {
          mypartner: "파트너 기관 관리",
          myproject: "지원사업 관리",
          myrequest: "IR 자료 요청 관리",
        };

  return (
    <StWSCont>
      <StRootWrap>{`홈  >  지원사업  >  ${navi[_curTab]}`}</StRootWrap>

      <StTabCont>
        <St.SectionTitle style={{ margin: 0 }}>워크 스테이션</St.SectionTitle>

        {_curType === 1 ? (
          <>
            <StTabWrap isChecked={_curTab === "mystartup"}>
              <Link to="/workstation/mystartup">{navi["mystartup"]}</Link>
            </StTabWrap>
            <StTabWrap isChecked={_curTab === "myproject"}>
              <Link to="/workstation/myproject">{navi["myproject"]}</Link>
            </StTabWrap>
            <StTabWrap isChecked={_curTab === "myrequest"}>
              <Link to="/workstation/myrequest">{navi["myrequest"]}</Link>
            </StTabWrap>
            <StTabWrap isChecked={_curTab === "mydocument"}>
              <Link to="/workstation/mydocument">{navi["mydocument"]}</Link>
            </StTabWrap>
          </>
        ) : (
          <>
            <StTabWrap isChecked={_curTab === "mypartner"}>
              <Link to="/workstation/mypartner">{navi["mypartner"]}</Link>
            </StTabWrap>
            <StTabWrap isChecked={_curTab === "myproject"}>
              <Link to="/workstation/myproject">{navi["myproject"]}</Link>
            </StTabWrap>
            <StTabWrap isChecked={_curTab === "myrequest"}>
              <Link to="/workstation/myrequest">{navi["myrequest"]}</Link>
            </StTabWrap>
            <StTabWrap
              isChecked={_curTab === "myrequest"}
              style={{ visibility: "hidden" }}
            >
              IR 자료 및 지원서류 관리
            </StTabWrap>
          </>
        )}
      </StTabCont>

      <GuideBar curType={_curType} curTab={_curTab} />

      {_curType === 1 ? (
        <>
          {_curTab === "mystartup" && <MyStartup />}
          {_curTab === "myproject" && <SupportPjt />}
          {_curTab === "myrequest" && <AdminIRReq />}
          {_curTab === "mydocument" && <></>}
        </>
      ) : (
        <>
          {_curTab === "mypartner" && <MyPartner />}
          {_curTab === "myproject" && <PartnerPjt />}
          {_curTab === "myrequest" && <></>}
        </>
      )}
    </StWSCont>
  );
};
export default WSPage;

const StWSCont = styled(St.Section)`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
`;

const StRootWrap = styled.div`
  margin-top: 40px;
  margin-bottom: 64px;
`;

const StTabCont = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  height: 120px;

  padding: 0 72px;
  align-items: center;

  * {
    /* -ms-user-select: none; 
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none; */
    user-select: none;
  }
`;

const StTabWrap = styled.span<{ isChecked: boolean }>`
  cursor: pointer;
  display: inline-block;
  text-align: center;

  font-weight: bold;
  font-size: 15px;
  letter-spacing: 0px;

  a {
    ${(props) =>
      props.isChecked
        ? css`
            color: #5541ed;
          `
        : css`
            color: #000000;
          `}
    transition: all 0.1s linear;
  }
`;
