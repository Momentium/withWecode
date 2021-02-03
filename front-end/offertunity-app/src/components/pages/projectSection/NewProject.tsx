import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import NewCard from './NewCard';

const NewProject = () => {

  const [newProject,setNewProject] = useState([]);

  useEffect(()=>{
    axios.get("/data/newproject.json")
    .then(res => {
      const _resData = res.data
      setNewProject(_resData.new);
    })
  },[])

  return(
    <New>
      {newProject.map((el:any , idx: number) =>{
        return(<NewCard key={idx} data={el}  index={idx}/>)
      })}
    </New>
  )
};

export default NewProject;

const New =styled.div`
  display: inline-block;
 
`;