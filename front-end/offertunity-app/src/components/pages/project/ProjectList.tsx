import React, { useState, useEffect } from 'react';
import Project from './Project';

const ProjectList = () => {

  const [pjts, setPjts] = useState<any>([]);

  useEffect(() => {
    setPjts(pjts.map((el:{}, idx:number) => 
      <Project key={idx} el={el}/>
    ));
  }, []);

  return (
    <>
      {pjts}
    </>
  );
};

export default ProjectList;