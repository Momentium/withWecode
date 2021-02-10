import React, { useState, useEffect } from "react";
import axios from "axios";
import * as St from "styles/styledComp";
import * as Mt from "api/methods";
import Project from "./Project";
import BeltBanner from "components/common/banner/BeltBanner";

const DemodayList = () => {
  const [pjts, setPjts] = useState<JSX.Element[]>([]);
  const _token = Mt.getUserInfo().token;

  useEffect(() => {
    let config = {};
    if (_token) {
      config = {
        Accept: "application/json",
        Authorization: `${_token}`,
      };
    }
    axios
      // .get(`http://10.0.1.29:3000/projects/published`, {
      .get(`${process.env.REACT_APP_URL}/projects/published`, {
        headers: config,
      })
      .then((res) => {
        const _resData = res.data.cleanedProjectList;
        setPjts(
          _resData.map((el: {}, idx: number) => (
            <Project key={idx} data={el} page={"list"} token={_token} />
          ))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <St.Section>{pjts}</St.Section>

      {pjts.length < 10 ? null : <BeltBanner curPage={"projectPage"} />}
    </>
  );
};

export default DemodayList;
