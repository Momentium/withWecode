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
  ]);
  await InitialService.createDatas("investment_funds", [
    "1천만원 ~ 5천만원",
    "6천만원 ~ 1억원",
    "1억원 ~ 2억원",
    "3억원 ~ 5억원",
    "6억원 이상",
  ]);
  await InitialService.createDatas("investment_series", [
    "엔젤투자",
    "시드투자",
    "프리 시리즈A",
    "시리즈A",
  ]);
  await InitialService.createDatas("sectors", [
    "플랫폼",
    "디자인",
    "마케팅",
    "제품",
  ]);
  await InitialService.createDatas("service_types", [
    "블록체인",
    "AI",
    "플랫폼",
    "임베디드",
  ]);
  await InitialService.createDatas("signup_methods", [
    "email",
    "google",
    "kakao",
    "naver",
  ]);
<<<<<<< HEAD
  await InitialService.createDatas("technologies", [
    "블록체인",
    "AI",
    "플랫폼",
    "임베디드",
  ]);
=======
>>>>>>> back-end
  await InitialService.createDatas("eligibilities", [
    "업력 무관",
    "3년 미만",
    "7년 미만",
  ]);
  res.status(201).json({
    message: "data created",
  });
});

module.exports = {
  InitialDataSetting,
};
