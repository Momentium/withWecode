import React, { useState, useEffect } from "react";
import * as St from "styles/styledComp";
import ProjectPrsnt from "./ProjectPrsnt";

const Project: React.FC<any> = ({ data, page, token }) => {
  const [isLogin, setIsLogin] = useState<boolean>();
  useEffect(() => {
    token ? setIsLogin(true) : setIsLogin(false);
  }, []);

  return (
    <ProjectPrsnt page={page} data={data} token={token} isLogin={isLogin} />
  );
};
export default Project;
