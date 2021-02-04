import React from "react";
import Description from "../../../common/detail/description/Description";

const CompanyDescription = ({ data }: any) => {
  const introduceDatas = [
    {
      title: "스타트업 소개",
      description: data.description,
    },
    {
      title: "아이템 소개",
      description: data.startups[0].item_description,
    },
  ];

  return (
    <Description data={data} introduceDatas={introduceDatas} type={"startup"} />
  );
};

export default CompanyDescription;
