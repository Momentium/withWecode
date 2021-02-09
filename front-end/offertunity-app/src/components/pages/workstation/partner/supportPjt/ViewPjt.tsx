import React, { useState,  } from 'react';
import styled, { css } from 'styled-components';
import BasicBtn from 'components/common/button/BasicBtn';
import InputBox from '../../common/InputBox';
import SelectBtn from '../../common/SelectBtn';

const ViewPjt:React.FC<any> = ({ handleSubmit }) => {
  const [img, setImg] = useState<any>();
  const [logo, setLogo] = useState<any>();
  const [name, setName] = useState<string>("");
  const [rep, setRep] = useState<string>("");
  const [estDate, setEstDate] = useState<string>("");
  const [homepage, setHompage] = useState<string>("");
  const [sector, setSector] = useState<string>("플랫폼");
  const [tech, setTech] = useState<string>("블록체인");
  const [service, setService] = useState<string>("블록체인");
  const [corp, setCorp] = useState<string>("개인");
  const [employees, setEmployees] = useState<string>("1 - 10명");

  const changeVal = (e:any) => {
    const _target = e.currentTarget;
    console.log(_target)
    switch(_target.className.split(" ")[2]) {
      case 'startup-name':
        setName(_target.value);
        break;
      case 'ceo-name':
        setRep(_target.value);
        break;
      case 'establish':
        setEstDate(_target.value);
        break;
      case 'homepage':
        setHompage(_target.value);
        break;
      case 'sector':
        setSector(_target.textContent);
        break;
      case 'tech':
        setTech(_target.textContent);
        break;
      case 'service':
        setService(_target.textContent);
        break;
      case 'corp':
        setCorp(_target.textContent);
        break;
      case 'employees':
        setEmployees(_target.textContent);
        break;
    }
  }
  return (
    <StCont>
      <StLogoCont>
        {/* <img src="" alt=""/> */}
        <div className="img-wrap">이미지를 등록해 주세요</div>
        <StBtn onClick={handleSubmit}>제출 정보 편집</StBtn>
      </StLogoCont>

      <StFormCont>
        <div className="form-cont">
          <div>
            <StFormWrap>
              <div className="label">기업명</div>
            </StFormWrap>

            <StFormWrap>
              <div className="label">대표자명</div>
            </StFormWrap>
            
            <StFormWrap>
              <div className="label">대표자연락처</div>
            </StFormWrap>

            <StFormWrap>
              <div className="label">기업 주소</div>
            </StFormWrap>

            <StFormWrap dir>
              <div className="label">산업 영역</div>
            </StFormWrap>
            
            <StFormWrap dir>
              <div className="label">기술</div>
            </StFormWrap>

            <StFormWrap dir>
              <div className="label">서비스 형태</div>
            </StFormWrap>
          </div>

          <div>
            <StFormWrap dir>
              <div className="label">사업자 구분</div>
            </StFormWrap>

            <StFormWrap>
              <div className="label">사업자 등록 번호</div>
            </StFormWrap>

            <StFormWrap>
              <div className="label">대표 이메일</div>
            </StFormWrap>

            <StFormWrap dir>
              <div className="label">직원 수</div>
            </StFormWrap>

            <StFormWrap>
              <div className="label">홈페이지</div>
            </StFormWrap>

            <StFormWrap>
              <div className="label">인스타그램</div>
            </StFormWrap>
            
            <StFormWrap>
              <div className="label">페이스북</div>
            </StFormWrap>
          </div>
        </div>
        
      </StFormCont>
    </StCont>
  );
}
export default ViewPjt;

const StCont = styled.div`
  margin-bottom: 96px;

  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const StLogoCont = styled.div`
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

    background: #f2f2f2;

    margin: 48px 0;
  }
`;

const StBtn = styled.span`
  cursor: pointer;
  user-select:none;
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

  ${props => props.dir ? 
  css`
    width: 314px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  `
  :
  css`
    .label {
      margin-bottom: 8px;
    }
  `  
  }
`;

