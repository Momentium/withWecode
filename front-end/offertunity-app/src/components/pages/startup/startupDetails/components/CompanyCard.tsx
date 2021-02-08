import React from "react";
import Card from "../../../../common/detail/card/Card";

const CompanyCard = ({ data, type, isLogin }: any) => {
  const detailInfo = [
    {
      title: "대표자명",
      content: data.startups[0].rep,
    },
    {
      title: "설립일",
      content: data.established_date.slice(0, 10),
    },
    {
      title: "산업분야",
      content: data.startups[0].sector,
    },
    {
      title: "활용기술",
      content: data.startups[0].core_technology,
    },
    {
      title: "홈페이지",
      content: data.homepage,
    },
  ];

  return (
    <Card data={data} detailInfo={detailInfo} type={type} isLogin={isLogin} />
  );
};

export default CompanyCard;
