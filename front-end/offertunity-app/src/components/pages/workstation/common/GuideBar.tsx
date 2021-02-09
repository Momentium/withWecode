import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface Props {
  curType: number;
  curTab: string;
}

const GuideBar:React.FC<Props> = ({ curType, curTab }) => {
  const [txt, setTxt] = useState<{title:string, msg:string}>({
    title: "마이 스타트업",
    msg: "*입력된 모든 정보는 실제 페이지에 반영됩니다. 해당 영역을 클릭하면 정보 수정이 가능합니다.",
  });

  useEffect(() => {
    switch(curTab) {
      case "mystartup":
        setTxt({
          title: "마이 스타트업",
          msg: "*입력된 모든 정보는 실제 페이지에 반영됩니다. 해당 영역을 클릭하면 정보 수정이 가능합니다.",
        })
        break;
      case "myproject":
        if(curType === 1){
          setTxt({
            title: "지원사업 프로젝트",
            msg: "*지원사업에 필요한 기본 등록 정보와 관심 지원사업을 한꺼번에 관리할 수 있습니다.",
          })
        }
        else {
          setTxt({
            title: "지원사업 관리",
            msg: "*지원사업을 관리할 수 있습니다.",
          })
        }
        break;
      case "myrequest":
        setTxt({
          title: "IR 자료 요청 관리",
          msg: "*지원사업에 필요한 기본 등록 정보와 관심 지원사업을 한꺼번에 관리할 수 있습니다.",
        })
        break;
      case "mydocument":
        setTxt({
          title: "IR 자료 및 지원서류 관리",
          msg: "*지원사업 및 투자 유치에 필요한 모든 서류를 version별로 관리할 수 있습니다.",
        })
        break;

      case "mypartner":
        setTxt({
          title: "파트너 기관 관리",
          msg: "*입력된 모든 정보는 실제 페이지에 반영됩니다. 해당 영역을 클릭하면 정보 수정이 가능합니다.",
        })
        break;
    }
  }, [curType, curTab])

  return (
    <StCont>
      <span className="g-title">{txt.title}</span>
      <span className="g-msg">{txt.msg}</span>
      <span className="g-title" style={{visibility: "hidden"}}>{txt.title}</span>
    </StCont>
  );
}

export default GuideBar;

const StCont = styled.span`
  user-select: none;
  display: inline-flex;

  width: 100%;
  line-height: 64px;
  padding: 0 72px;
  margin-top: 32px;
  margin-bottom: 80px;

  background: #5541ED;

  box-shadow: 0px 10px 40px #352D7417;
  border-radius: 10px;

  color: white;

  .g-title {
    font-size: 18px;
    font-weight: bold;
    margin-right: 112px;
    width: 160px;
  }

  .g-msg {
    font-size: 15px;
  }

 `;
