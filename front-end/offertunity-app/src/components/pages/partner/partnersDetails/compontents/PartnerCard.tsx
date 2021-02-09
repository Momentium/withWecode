import React from "react";
import Card from "../../../../common/detail/card/Card";

const PartnerCard = ({ data, type, isLogin, token }: any) => {
  const detailInfo = [
    {
      title: "설립일",
      content: data.established_date.slice(0, 10),
    },
    {
      title: "투자 집행 건수",
      content: data.partners[0].invested_counts,
    },
    {
      title: "총 투자액",
      content: data.partners[0].investment_total,
    },
    {
      title: "대표관심분야",
      content: data.partners[0].interst_technology,
    },
    {
      title: "홈페이지",
      content: data.homepage,
    },
  ];

  return (
    <Card
      data={data}
      detailInfo={detailInfo}
      type={type}
      isLogin={isLogin}
      token={token}
    />
  );
};

export default PartnerCard;
