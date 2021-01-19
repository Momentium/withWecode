import React, { useState, useEffect } from 'react';
import axios from 'axios'
import * as St from 'components/styles/styledComp';
import Project from './Project';
import BeltBanner from 'components/common/banner/BeltBanner';

const ProjectList = () => {
  const [pjts, setPjts] = useState<JSX.Element[]>([]);

  useEffect(() => {
    axios.get('data/projectData.json')
    .then((res) => {
      const _resData = res.data;
      setPjts(_resData.map((el:{}, idx:number) => 
        <Project key={idx} data={el}/>
      ));
    })
  }, []);

  return (
    <>
      <St.Section>
        {pjts.slice(0, 5)}
      </St.Section>

      <BeltBanner curPage={"projectPage"}/>
      
      <St.Section>
        {pjts.slice(5)}
      </St.Section>

    </>
  );
};

export default ProjectList;