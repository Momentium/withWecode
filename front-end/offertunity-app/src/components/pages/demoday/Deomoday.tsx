import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as St from "styles/styledComp";
import DemodayPrsnt from "./DemodayPrsnt";

const Demoday: React.FC<any> = ({ data }) => {
  const [tags, setTags] = useState<JSX.Element[]>([]);

  useEffect(() => {
    setTags(
      data.tag.map((el: string, idx: number) => <St.Tag key={idx}>{el}</St.Tag>)
    );
  }, []);

  return <DemodayPrsnt data={data} tags={tags} />;
};
export default Demoday;
