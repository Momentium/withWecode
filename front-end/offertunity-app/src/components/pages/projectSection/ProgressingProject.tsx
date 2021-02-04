import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import ProgressingCard from "./ProgressingCard";

const ProgressingProject = () => {
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    axios.get("/data/progressing.json").then((res) => {
      const _resData = res.data;
      setProjectData(_resData.projecting);
    });
  }, []);

  return (
    <Progessing>
      {projectData.map((el: any, idx: number) => {
        return <ProgressingCard key={idx} data={el} index={idx} />;
      })}
    </Progessing>
  );
};

export default ProgressingProject;

const Progessing = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
