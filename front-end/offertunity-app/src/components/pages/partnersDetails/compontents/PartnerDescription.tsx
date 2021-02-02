import React from "react";
import Description from "../../../common/detail/description/Description";

const PartnerDescription = ({ data }: any) => {
  const { introduce } = data;

  const introduceDatas = [
    {
      title: "투자 파트너 소개",
      description: introduce,
    },
  ];

  return <Description data={data} introduceDatas={introduceDatas} />;
};

export default PartnerDescription;
