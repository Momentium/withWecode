import React from "react";
import Description from "../../../../common/detail/description/Description";

const CompanyDescription = ({ data }: any) => {
  const { introduce, itemIntroduce } = data;

  const introduceDatas = [
    {
      title: "스타트업 소개",
      description: introduce,
    },
    {
      title: "아이템 소개",
      description: itemIntroduce,
    },
  ];

  return <Description data={data} introduceDatas={introduceDatas} />;
};

export default CompanyDescription;
