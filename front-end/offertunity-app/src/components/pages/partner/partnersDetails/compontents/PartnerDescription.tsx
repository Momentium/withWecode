import React from "react";
import Description from "../../../../common/detail/description/Description";

const PartnerDescription = ({ data }: any) => {
  const { description } = data;

  const introduceDatas = [
    {
      title: "투자 파트너 소개",
      description: description,
    },
  ];

  return (
    <Description data={data} introduceDatas={introduceDatas} type={"partner"} />
  );
};

export default PartnerDescription;
