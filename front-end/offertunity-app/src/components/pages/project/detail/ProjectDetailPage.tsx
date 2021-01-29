import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import * as St from 'components/styles/styledComp';


const ProjectDetailPage:React.FC<any> = ({ match }) => {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    console.log(match.params.id)
    axios.get('/data/projectData.json')
    .then((res) => {
      const _resData = res.data[match.params.id];
      setData(_resData);
    })

  },[])

  return (
    <StPjtDetailCont>
      <StRootWrap>{`홈  >  지원사업  >  ${data.name}`}</StRootWrap>
      <StOverviewCont>
        <img src={`${data.img}`} alt="project-img"/>
        <StRightCont>
          <div className="name">{data.name}</div>
          <div className="explain">{data.explain}</div>
          <StInfoTable>
          <tbody>
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
          </tbody>
          </StInfoTable>
          <StButtonWrap><div>지원하기</div></StButtonWrap>
        </StRightCont>
      </StOverviewCont>

    </StPjtDetailCont>
  );
}

export default ProjectDetailPage;

const StPjtDetailCont = styled(St.Section)`
  display: flex;
  flex-direction: column;
`;

const StRootWrap = styled.div`
  margin-top: 40px;
  margin-bottom: 64px;
`;

const StOverviewCont = styled.div`
  display: flex;
  justify-content: space-between;

  img {
    width: 672px;
  }
  
  & > div {
    width: 568px;
  }
`;

const StRightCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  .name {
    font-size: 28px;
    font-weight: bold ;
    
  }
  .explain {
    font-size: 18px;
    margin: 24px 0;
  }
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

  margin-bottom: 44px;
`;

const StButtonWrap = styled.div`
  cursor: pointer;
  width: 300px;
  height: 56px;
  background: #5541ED;
  border-radius: 5px;

  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    color: white;
  }

  
`;