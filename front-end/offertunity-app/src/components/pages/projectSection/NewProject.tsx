import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NewCard from './NewCard'

const NewProject = () => {

  const [newProject,setNewProject] = useState([]);

  useEffect(()=>{
    fetch("/data/newProject.json")
    .then(res => res.json())
    .then(res=>{
      setNewProject(res.new);
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