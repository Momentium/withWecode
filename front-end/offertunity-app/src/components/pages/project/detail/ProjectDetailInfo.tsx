import React from "react";
import styled from "styled-components";
import StButton from "./StButton";

const ProjectDetailInfo: React.FC<any> = ({ data }) => {
  return (
    <DetailInfoCont>
      <PjInformation>
        <Title>
          <h2>지원사업 안내</h2>
        </Title>
        <Content>
          <p>
            ㈜업드림코리아는 서울시사회적경제지원센터와 함께 사회적경제기업의
            코로나19 대응 및 지속가능한 성장을 지원하고자 「서울시 사회적경제
            온라인 유통채널 지원사업」에 참여할 기업을 모집하오니 많은 관심과
            참여를 바랍니다.
          </p>
        </Content>
      </PjInformation>
      <PjContents>
        <Title>
          <h2>지원 내용</h2>
        </Title>
        <Description>
          <p>
            온라인 채널별 교육·멘토링, 채널 개설 및 마케팅 지원 ※ 선정된
            유통채널별 맞춤형 지원 스마트스토어 - 스마트스토어 역량강화 교육,
            1:1 멘토링(스마트스토어 운영, 콘텐츠 기획, 홍보방법 등) -
            스마트스토어 촬영지원, 콘텐츠 제작 등 마케팅 지원 - 스마트스토어
            오픈 - 상품 배송, 물류지원 오픈마켓 - 11번가 기획전 입점 지원 및 1:1
            멘토링 - 11번가 기획전 기획~상세페이지 제작 및 마케팅 지원 - 11번가
            기획전 콘텐츠 제작 등 마케팅 지원 - 11번가 기획전 오픈 - 상품 배송,
            물류지원 크라우드펀딩 - 크라우드펀딩 역량강화 교육, 1:1 멘토링(펀딩
            스토리 작성, 펀딩 전략수립 등) - 크라우드펀딩 리워드 기획, 콘텐츠
            제작 등 마케팅 지원 - 크라우드펀딩 오픈 - 상품 배송, 물류지원
            라이브커머스 - 라이브커머스 역량강화 교육, 1:1 멘토링(라이브커머스
            이해, 촬영기법, 콘텐츠 기획 등) - 라이브커머스 시나리오, 콘텐츠 제작
            등 마케팅 지원 - 라이브커머스 방송 진행 - 상품 배송비와 물류지원
          </p>
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
              2020.12.31 (목) 00:00 ~ 2021.01.08 (금) 18:00 까지
            </div>
          </div>
          <div className="wrapper">
            <div className="title">
              <span>신청방법</span>
            </div>
            <div className="content">
              admin@careertour.co.kr (방문 및 우편접수 불가) ※ 이메일 접수 후,
              회신 메일로 신청 접수 여부 확인 신청대상서울시 소재
              사회적경제조직, 소상공인 골목상권 활성화 사업 참여 소상공인 ※
              서울시 소재 여부는 사업자등록증상 본점을 기준으로 합니다. ※
              사회적경제조직의 경우 아래 2가지 요건 중 하나는 필수적으로
              갖추어야 지원 가능합니다. - 예비(사회적기업), (사회적)협동조합),
              마을기업, 자활기업 - 소셜벤처 등 사회혁신조직 (정관 상 소셜 미션이
              기재되어 있어야 함, 정관 제출 필수)
            </div>
          </div>
        </GridContainer>
      </PjRequest>
      <PjSummaryInfo>
        <div className="information">
          <div className="title">제출 서류</div>
          <div className="content">
            <span>사업계획서</span>
            <span>사업자등록 사본</span>
            <span>대표자 주민등록증(운전면허증)</span>
          </div>
        </div>
        <div className="information">
          <div className="title">유의사항</div>
          <div className="content">
            <span>
              * 제출된 서류는 선정 여부에 관계없이 일체 반환하지 않습니다. *
              제출된 서류의 내용이 사실과 다를 경우 선정이 취소될 수 있습니다.
            </span>
          </div>
        </div>
        <div className="information">
          <div className="title">문의처</div>
          <div className="content">
            <span>온라인 유통채널 운영사무국</span>
            <span>연락처:02-ㅅ6954-2272</span>
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
  background-color: #fbfaff;
  p {
    width: 70%;
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

    .title {
      width: 8.125rem;
      margin-right: 5.938rem;
      padding-left: 1.875rem;
      font-size: 1.563rem;
      font-weight: bold;
    }
  }

  .information:last-child {
    border-bottom: 2px solid #cdcdcd;
  }
`;
