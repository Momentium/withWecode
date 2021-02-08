import React, { useState, useEffect } from "react";
import axios from "axios";
import * as St from "styles/styledComp";
import Project from "./Project";
import BeltBanner from "components/common/banner/BeltBanner";

const DemodayList = () => {
  const [pjts, setPjts] = useState<JSX.Element[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/projects`)
      .then((res) => {
        const _resData = res.data.projectList;
        setPjts(
          _resData.map((el: {}, idx: number) => (
            <Project key={idx} data={el} page={"list"} />
          ))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(pjts.length < 10);

  return (
    <>
      <St.Section>{pjts}</St.Section>

      {pjts.length < 10 ? null : <BeltBanner curPage={"projectPage"} />}
    </>
  );
};

export default DemodayList;
