import React, { useState, useEffect } from 'react';
import * as St from 'components/styles/styledComp';
import ProjectOverview from './ProjectOverview';

const Project:React.FC<any> = ({ data, page }) => {
  const [tags, setTags] = useState<JSX.Element[]>([]);
  const [like, setLike] = useState<boolean>(data.like);

  useEffect(() => {
    setTags(data.tag?.map((el:string, idx:number) => 
      <St.Tag key={idx}>{el}</St.Tag>
    ));
  }, []);

  const clickLike = (e: React.MouseEvent<HTMLDivElement>) => {
    setLike(!like);
  }

  return (
    <ProjectOverview 
      page={page}
      data={data}
      tags={tags}
      like={like}
      clickLike={clickLike}
    />
  );
};
export default Project;