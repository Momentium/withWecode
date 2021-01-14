import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProgressingCard from './ProgressingCard'

 

 const ProgressingProject = () => {

  const [projectData,setProjectData] = useState([]);

  useEffect(() => {
    fetch("/data/progressing.json")
    .then(res =>res.json())
    .then(res =>{
      setProjectData(res.projecting)
      console.log(projectData)
    })
  },[])

  return(
    <Progessing>

     {projectData.map((el: any, idx: number)=>{
       return(
       <ProgressingCard data = {el} key={idx}/>
       )  
     })}

    </Progessing>
  )
};

export default ProgressingProject;

const Progessing =styled.div`
  display: inline-block;
  
`;