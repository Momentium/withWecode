import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as St from 'components/styles/styledComp';

const Project:React.FC<any> = ({ data }) => {
  const [tags, setTags] = useState<JSX.Element[]>([]);
  useEffect(() => {
    setTags(data.tag.map((el:string, idx:number) => 
      <St.Tag key={idx}>{el}</St.Tag>
    ));
  }, []);

  return (
    <StPjtWrap>

      <StImgWrap imgUrl={data.img}/>

      <StContentsCont>
        <div className="up-wrap">
          <span className="name">{data.name}</span>
          <span>{}</span>
        </div>
        <div className="mid-wrap">
          <p>
            {data.explain}
          </p>
        </div>
        <div className="bot-wrap">
          {tags}
        </div>
      </StContentsCont>

      <StInfoCont>
        <StInfoTable>
          <tr>
            <th>주최</th>
            <td>{data.host}</td>
          </tr>
          <tr>
            <th>지원분야</th>
            <td>{data.field}</td>
          </tr>
          <tr>
            <th>지원대상</th>
            <td>{data.target}</td>
          </tr>
          <tr>
            <th>마감일</th>
            <td>{data.deadline}</td>
          </tr>
        </StInfoTable>
      </StInfoCont>

    </StPjtWrap>
  );
};
export default Project;

const StPjtWrap = styled(St.FlexDiv)`
  justify-content: space-between;
  /* justify-content: flex-start; */
  width: 100%;
  height: 12.938em;
  margin-bottom: 40px;

  & > div{
    height: 100%;
  }
`;

const StImgWrap = styled.div<{imgUrl:string|undefined}>`
  width: 19.438em;

  background-image: url(${props => props.imgUrl});
  background-size: cover;
`;

const StContentsCont = styled.div`
  width: 39.375em;
  margin: 0 32px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  * {
    text-align: left;
    letter-spacing: 0px;
    color: #000000;
    opacity: 1;
  }

  .up-wrap {
    margin-bottom: 16px;
    font: normal normal bold 21px/32px Spoqa Han Sans Neo;
  }

  .mid-wrap {
    font: normal normal normal 15px/20px Spoqa Han Sans Neo;
    
    display: flex;
    align-items: center;

    p {
      width: 100%;

      overflow: hidden; 
      text-overflow: ellipsis;

      white-space: normal; 
      text-align: left; 
      word-wrap: break-word; 
      display: -webkit-box; 
      -webkit-line-clamp: 5; 
      -webkit-box-orient: vertical;
    }
  }

  .bot-wrap {
    margin-top: 32px;
    display: flex;
  }
`;

const StInfoCont = styled(St.FlexDiv)`
  display: flex;
  justify-content: flex-start;

  padding-left: 32px;
  border-left: dotted 2px #cccccc;
`;

const StInfoTable = styled.table`

  th, td {
    text-align: left;
    font-size: 18px/20px;
  }
  
  th {
    white-space: nowrap;
    font-weight: bold;
    padding: 8px 32px 8px 0;
  }

  td {
    width: 8.813em;
  }

`;