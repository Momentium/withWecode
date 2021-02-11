import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import * as St from "styles/styledComp";
import * as Mt from "api/methods";
import DocCard from './DocCard';

const SelectDoc:React.FC<any> = ({ mode, label, checkedDoc, selectedIdx }) => {
  const _userInfo = Mt.getUserInfo();
  const SIZE_LIMIT = 209715200;
  const [fileList, setFileList] = useState<any[]>([]);
  const [checkIdx, setCheckIdx] = useState<{}>({});

  useEffect(() => {
    getFiles();
  }, []);

  const handleCheck = (_idx:number) => {
    setCheckIdx(_idx);
    selectedIdx({
      id: fileList[_idx].id, 
      name: fileList[_idx].name, 
      url: fileList[_idx].download,
      type: fileList[_idx].fileType,
    });
  }

  const uploadFile = (e: any) => {
    e.preventDefault();
    const _file = e.target.files[0];

    if (_file.size > SIZE_LIMIT) {
      alert("파일 사이즈가 너무 큽니다.");
      return;
    }

    const _reader = new FileReader();
    _reader.onload = (e: any) => {
      const _formData = new FormData();
      _formData.append("docType", label);
      _formData.append(
        "document",
        Mt.dataURLtoFile(e.target.result, _file.name)
      );
      axios
        .post(`${process.env.REACT_APP_URL}/doc/upload`, _formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Basic ${_userInfo.token}`,
          },
        })
        .then((res) => {
          alert("파일 저장 성공");
          getFiles();
        })
        .catch((err) => {
          alert("파일 저장 실패");
        });
    };
    _reader.readAsDataURL(_file);
  };

  const getFiles = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/doc/list/type/${mode}`, {
        headers: {
          Authorization: `Basic ${_userInfo.token}`,
        },
      })
      .then((res) => {
        const _resData = res.data.documents;
        console.log(_resData);
        setFileList(_resData);
      });
  };

  return (
    <>
    <StTopCont>
        <St.SectionTitle>{label}</St.SectionTitle>
        <div className="btn-cont"></div>
      </StTopCont>
      <StCardCont>
        <StCardWrap>
          <input
            id={mode}
            type="file"
            accept=".pdf, .pptx, .ppt, .zip"
            onChange={uploadFile}
          />
          <label htmlFor={mode}>
            <div className="card-wrap">
              <div className="plus">+</div>
              <div className="label">자료 등록</div>
            </div>
          </label>
          <div className="guide">파일형식 : pptx, pdf, zip / 200M 이하</div>
        </StCardWrap>

        <StScrollCont>
        {fileList.map((el: any, idx: number) => {
          const _date = new Date(el.updateDate).toLocaleDateString("ko-KR");
          return (
            <StCardWrap key={idx} isCheck={idx === checkIdx}>
              <DocCard data={el} isCheck={idx === checkIdx} idx={idx} handleCheck={handleCheck}/>
              <StTable>
                <tbody>
                  <tr>
                    <th>제목</th>
                    <td>{el.name}</td>
                  </tr>
                  <tr>
                    <th>파일 형식</th>
                    <td>{el.fileType}</td>
                  </tr>
                  <tr>
                    <th className="last-child">업로드 날짜</th>
                    <td>{_date}</td>
                  </tr>
                </tbody>
              </StTable>
            </StCardWrap>
          );
        })}
        </StScrollCont>
      </StCardCont>
    </>
  );
};
export default SelectDoc;

const StTopCont = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StScrollCont = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;

  /* width: 80%; */
  /* height: 100%; */
`;

const StCardCont = styled.div`
  width: 100%;
  display: flex;

  input {
    display: none;
  }
`;

const StCardWrap = styled.div<any>`
  
  margin-right: 28px;

  .guide {
    color: #898989;
    font-size: 13px;
  }

  .card-wrap {
    cursor: pointer;
    user-select: none;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    transition: all 0.1s linear;

    width: 300px;
    height: 200px;
    border: solid 1px ${
      props => props.isCheck ?
      '#5541ee'
      :
      '#cdcdcd'
    };
    margin: 16px 0;

    .plus {
      color: #b7b7b7;
      font-size: 48px;
    }

    .label {
      margin-top: 16px;
      color: #b7b7b7;
      font-size: 18px;
    }

    & > .data-cont {
      width: 100%;
      height: 100%;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
`;

const StTable = styled.table`
  font-size: 18px;
  th {
    color: #898989;
    padding-right: 15px;
    padding-bottom: 8px;
    text-align: left;

    &.last-child {
      padding-bottom: 0;
    }
  }
  td {
    max-width: 160px;

    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;