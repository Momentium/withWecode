import React from "react";
import Invest from "../../../common/detail/invest/Invest";

const PartnerInvest = ({ data }: any) => {
  const { attractInvestment } = data.investInfo;
  console.log(attractInvestment);
  return (
    // <Invest
    //   data={data}
    //   attractInvestment={attractInvestment}
    //   containerTitle={"투자 정보"}
    // />
    <h1>hello</h1>
  );
};

export default PartnerInvest;
