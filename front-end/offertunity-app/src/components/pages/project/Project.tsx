import React, { useState, useEffect } from "react";
import * as St from "styles/styledComp";
import ProjectPrsnt from "./ProjectPrsnt";

const Project: React.FC<any> = ({ data, page }) => {
  // const [tags, setTags] = useState<JSX.Element[]>([]);
  // const [like, setLike] = useState<boolean>(data.like);

  // useEffect(() => {
  //   setTags(
  //     data.tag?.map((el: string, idx: number) => (
  //       <St.Tag key={idx}>{el}</St.Tag>
  //     ))
  //   );
  // }, []);

  // const clickLike = (e: React.MouseEvent<HTMLDivElement>) => {
  //   setLike(!like);
  // };

  return <ProjectPrsnt page={page} data={data} />;
};
export default Project;
