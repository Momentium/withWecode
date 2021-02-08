import React from "react";
import Card from "../../../../common/detail/card/Card";

const CompanyCard = ({ data, type }: any) => {
  const { ceo, birth, field, technique, homepage } = data;

  const detailInfo = [
    {
      title: "대표자명",
      content: ceo,
    },
    {
      title: "설립일",
      content: birth,
    },
    {
      title: "산업분야",
      content: field.join(","),
    },
    {
      title: "활용기술",
      content: technique.join(","),
    },
    {
      title: "홈페이지",
      content: homepage,
    },
  ];

  return <Card data={data} detailInfo={detailInfo} type={type} />;
};

export default CompanyCard;
