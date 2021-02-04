const { InitialService } = require("../services");
const { errorWrapper, errorGenerator } = require("../errors");

const InitialDataSetting = errorWrapper(async (req, res) => {
  await InitialService.createDatas("business_types", ["개인", "법인"]);
  
  await InitialService.createDatas("company_types", [
    "스타트업",
    "파트너",
    "admin",
  ]);
  await InitialService.createDatas("document_types", [
    "사업계획서",
    "사업자등록 사본",
    "대표자 주민등록증(운전면허증)",
    "IR 자료",
    "기타"
  ]);
  await InitialService.createDatas("investment_funds", [
    "1천만원 - 5천만원",
    "6천만원 - 1억원",
    "2억원 - 5억원",
    "6억원 - 10억원",
    "11억원 - 50억원",
    "51억원 이상"
  ]);
  await InitialService.createDatas("investment_series", [
    "엔젤투자",
    "시드투자",
    "프리 시리즈 A",
    "시리즈 A",
    "시리즈 B",
    "시리즈 C"
  ]);
  await InitialService.createDatas("sectors", [
    "라이프스타일",
    "커머스",
    "식품",
    "뷰티",
    "반려동물",
    "서비스",
    "금융",
    "모빌리티",
    "바이오/헬스케어",
    "교육",
    "패션",
    "여행",
    "스포츠",
    "게임",
    "농축수산업",
    "방송/통신",
    "기타"
  ]);
  await InitialService.createDatas("service_types", [
    "빅데이터",
    "AI",
    "블록체인",
    "로봇/드론",
    "전자상거래",
    "클라우드",
    "IoT",
    "AR/VR",
    "플랫폼",
    "데이터솔루션",
    "기타"
  ]);
  await InitialService.createDatas("signup_methods", [
    "email",
    "google",
    "kakao",
    "naver",
  ]);

  await InitialService.createDatas("eligibilities", [
    "업력 무관",
    "3년 미만",
    "7년 미만",
  ]);
  await InitialService.createDatas("company_types", [
    "스타트업",
    "파트너",
  ]);
  await InitialService.createTerms([
    {
      name: "service",
      content: "",
      required: true
    },
    {
      name: "personal_info",
      content: "",
      required: true
    },
    {
      name: "marketing",
      content: "",
      required: false
    },

  ])

  res.status(201).json({
    message: "data created",
  });
});

module.exports = {
  InitialDataSetting,
};
