import React, { useState, useEffect } from "react";
import axios from 'axios';
import { withRouter, Link, useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import * as St from "styles/styledComp";
import * as Mt from 'api/methods'
import AddPjt from "./AddPjt";
import EditPjt from "./EditPjt";
import PjtList from './PjtList';

const PartnerPjt:React.FC<any> = ({ match }) => {
  const _params = match.params;
  const _userInfo = Mt.getUserInfo();
  const [pjtList, setPjtList] = useState<any[]>([]);

  useEffect(() => {
    // console.log(_userInfo.company_id)
    console.log(_params)
    axios.get(`${process.env.REACT_APP_URL}/projects`,
      {
        headers: {
          Authorization: `Basic ${_userInfo.token}`
        }
      }
    )
    .then((res) => {
      const _resData:any = res.data.projectList;
      console.log(_resData)
      setPjtList(_resData.map((el:any, idx:number) => 
        <Link to={`/project/${el.id}`} key={idx}>
          <StADWrap img={el.project_images.length !== 0 ? el.project_images[0].img_url : null}>
            <PjtList
              data={el}
            />
          </StADWrap>
        </Link>
      ))
    })
  }, [match])


  return (
    <>
      {_params.addon ? (
        <>
        {
          _params.addon === 'addPjt'?
          <AddPjt />
          :
          <EditPjt id={_params.id}/>
        }
        </>
      ) : (
        <>
          <St.SectionTitle>지원사업 관리</St.SectionTitle>
          <StADCont>
            <Link to={"/workstation/myproject/addPjt"}>
              <StADWrap>
                <div className="plus">+</div>
                <div className="msg">지원사업 공고 등록</div>
              </StADWrap>
            </Link>
            
            {pjtList}

          </StADCont>
        </>
      )}
    </>
  );
};
export default withRouter(PartnerPjt);

const StADCont = styled.div`
  display: flex;
  flex-wrap: wrap;

  justify-content: space-between;

  background: white;
`;

const StADWrap = styled.div<any>`
  position: relative;

  cursor: pointer;
  user-select: none;

  margin: 24px 0;

  width: 600px;
  height: 400px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.img &&
    css`
      background-image: url(${props.img});
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    `}

  border: 1px solid #CDCDCD;

  .plus {
    font-size: 60px;
    color: #b7b7b7;
  }

  .msg {
    margin-top: 24px;
    color: #b7b7b7;
    font-size: 18px;
  }
`;

