import React from "react";
import styled from "styled-components";
import StButton from "./StButton";

const ProjectDetailInfo: React.FC<any> = ({ data }) => {
  const {
    outline,
    detail,
    created_at,
    deleted_at,
    application_method,
    caution,
    contact,
    document,
  } = data;
  return (
    <DetailInfoCont>
      <PjInformation>
        <Title>
          <h2>지원사업 안내</h2>
        </Title>
        <Content>
          <p>{outline}</p>
        </Content>
      </PjInformation>
      <PjContents>
        <Title>
          <h2>지원 내용</h2>
        </Title>
        <Description>
          <p>{detail}</p>
        </Description>
      </PjContents>
      <PjRequest>
        <Title>
          <h2>신청방법 및 대상</h2>
        </Title>
        <GridContainer>
          <div className="wrapper">
            <div className="title">
              <span>신청기간</span>
            </div>
            <div className="content">
              {/* {created_at}~{deleted_at} */}
              {created_at.slice(0, 10)}~{deleted_at.slice(0, 10)}
            </div>
          </div>
          <div className="wrapper">
            <div className="title">
              <span>신청방법</span>
            </div>
            <div className="content">{application_method}</div>
          </div>
        </GridContainer>
      </PjRequest>
      <PjSummaryInfo>
        <div className="information">
          <div className="title">제출 서류</div>
          <div className="content">
            {/* {document.map((el: string, idx: number) => {
              return <span key={idx}>{el}</span>;
            })} */}
          </div>
        </div>
        <div className="information">
          <div className="title">유의사항</div>
          <div className="content">
            <span>{caution}</span>
          </div>
        </div>
        <div className="information">
          <div className="title">문의처</div>
          <div className="content">
            <span>{contact}</span>
          </div>
        </div>
      </PjSummaryInfo>
    </DetailInfoCont>
  );
};
export default ProjectDetailInfo;

const DetailInfoCont = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 7.5rem;
`;

const Title = styled.div`
  margin-bottom: 3rem;
  font-weight: bold;
  font-size: 1.75rem;
`;

const PjInformation = styled.div`
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fbfaff;
  white-space: pre-line;
  line-height: 2rem;
  p {
    padding: 3.125rem 0;
    margin: 0 auto;
  }
`;

const PjContents = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10.75rem;
`;

const Description = styled.div`
  width: 40.188rem;
  white-space: pre-line;
  line-height: 2rem;
`;

const PjRequest = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 10.75rem;
`;

const GridContainer = styled.div`
  display: grid;

  .wrapper {
    display: flex;
  }

  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20%;
    border: 1px solid #d8d8d8;
    color: white;
    background-color: #9f9f9f;
    font-size: 1.25rem;
    font-weight: bold;
  }

  .content {
    width: 80%;
    padding: 1.25rem 3.75rem;
    background-color: #f9f8fa;
    border: 1px solid #d8d8d8;
    letter-spacing: 0.2px;
    white-space: pre-line;
    line-height: 2rem;
  }
`;

const PjSummaryInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10rem;

  .information {
    display: flex;
    align-items: center;
    padding: 3rem 0;
    border-top: 2px solid #cdcdcd;
    white-space: pre-line;
    line-height: 2rem;

    .title {
      width: 8.125rem;
      margin-right: 5.938rem;
      padding-left: 1.875rem;
      font-size: 1.563rem;
      font-weight: bold;
    }

    .content {
      span {
        margin-right: 4.375rem;
      }
    }
  }

  .information:last-child {
    border-bottom: 2px solid #cdcdcd;
  }
`;
