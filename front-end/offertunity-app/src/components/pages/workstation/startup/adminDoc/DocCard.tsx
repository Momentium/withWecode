import React, { useState, useEffect } from 'react';
import axios from "axios";
import * as Mt from 'api/methods';
import styled from "styled-components";
import { Close } from "@material-ui/icons";

const DocCard: React.FC<any> = ({ data, deleteFile }) => {

  const viewFile = () => {

  }
  const downloadFile = () => {
    window.open(data.download, '_blank');
  }

  return (
    <div className="card-wrap">
      <StCont className="data-cont">
        <div className="close-btn" onClick={() => { deleteFile(data.id) }}><Close/></div>
        {data.name}
        <div className="btn-cont">
          <StBtn onClick={viewFile}>미리보기</StBtn>
          <StBtn onClick={downloadFile}>다운로드</StBtn>
        </div>
      </StCont>
    </div>
  );
};

export default DocCard;

const StCont = styled.div`
  word-break: break-all;

  font-size: 21px;
  padding: 30px;

  position: relative;

  color: black;
  background-color: white;

  &, * {
    transition: all 0.1s linear;
  }

  .close-btn {
    position: absolute;
    top: 8px;
    right: 8px;
    
    color: white;
  }

  .btn-cont {
    display: flex;
    justify-content: space-evenly;
    width: 100%;

    height: 0px;
    overflow: hidden;

    /* transition: all 0.1s linear; */
  }

  :hover {
    color: white;
    background-color: gray;

    .btn-cont {
      height: auto;
      margin-top: 24px;
    }
  }
`;

const StBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  width: 77px;
  height: 32px;

  font-size: 13px;

  border: 1px solid #C2BDF0;
  border-radius: 20px;
  background: white;
  color: #5541ed;

  /* transition: all 0.1s linear; */

  &:hover {
    border-color: #5541ee;
    background: #5541ed;
    color: white;
  }
`;