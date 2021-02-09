import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import NewCard from "./NewCard";

const NewProject = () => {
  const [newProject, setNewProject] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/projects/published`).then((res) => {
      const _resData = res.data.cleanedProjectList;
      const slice = _resData.slice(0, 6);
      setNewProject(slice);
    });
  }, []);

  return (
    <New>
      {newProject.map((el: any, idx: number) => {
        return <NewCard key={idx} data={el} index={idx} />;
      })}
    </New>
  );
};

export default NewProject;

const New = styled.div`
  display: inline-block;
`;
