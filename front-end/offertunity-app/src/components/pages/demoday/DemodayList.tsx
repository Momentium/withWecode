import React, { useState, useEffect } from "react";
import axios from "axios";
import * as St from "components/styles/styledComp";
import Demoday from "./Deomoday";
import BeltBanner from "components/common/banner/BeltBanner";

const DemodayList = () => {
  const [pjts, setPjts] = useState<JSX.Element[]>([]);

  useEffect(() => {
    axios.get("/data/demodayData.json").then((res) => {
      const _resData = res.data;
      setPjts(
        _resData.map((el: {}, idx: number) => <Demoday key={idx} data={el} />)
      );
    });
  }, []);

  console.log(pjts.length < 10);

  return (
    <>
      <St.Section>{pjts.slice(0, 5)}</St.Section>

      {pjts.length < 10 ? null : <BeltBanner curPage={"projectPage"} />}

      <St.Section>{pjts.slice(5)}</St.Section>
    </>
  );
};

export default DemodayList;