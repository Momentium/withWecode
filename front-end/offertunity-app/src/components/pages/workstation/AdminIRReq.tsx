import styled from 'styled-components';
import * as St from 'styles/styledComp';

const AdminIRReq = () => {
  return (
    <>
      <StStateDiv>
        <StStateTable>
          <tbody>
            <tr>
              <th>IR 자료 등록 현황</th>
              <th>보낸 IR 자료 검토 요청</th>
              <th>받은 IR 자료 요청 건</th>
            </tr>
            <tr>
              <td>{1}&nbsp;개</td>
              <td>{15}&nbsp;회</td>
              <td>{1}&nbsp;회</td>
            </tr>
          </tbody>
        </StStateTable>
      </StStateDiv>
    </>
  );
}
export default AdminIRReq;

const StStateDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StStateTable = styled.table`
  width: 1020px;
  th {
    background: #F9F8FA;
    padding: 24px 80px;
  }
  td {
    font-size: 46px;

    &:nth-child(2) {
     border-left: 1px solid #CDCDCD;
     border-right: 1px solid #CDCDCD;
    }
  }
`;