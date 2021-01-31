import React from "react";
import Card from "../../../common/detail/card/Card";

const PartnerCard = ({ data, type }: any) => {
  const { birth, total, totalPrice, field, homepage } = data;

  const detailInfo = [
    {
      title: "설립일",
      content: birth,
    },
    {
      title: "투자 집행 건수",
      content: total,
    },
    {
      title: "총 투자액",
      content: totalPrice,
    },
    {
      title: "대표관심분야",
      content: field,
    },
    {
      title: "홈페이지",
      content: homepage,
    },
  ];

  return <Card data={data} detailInfo={detailInfo} type={type} />;
};

export default PartnerCard;
