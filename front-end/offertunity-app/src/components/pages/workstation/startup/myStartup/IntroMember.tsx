import styled from 'styled-components';
import InputBox from '../../InputBox';

const IntroMember = () => {
  return (
    <StCont>
      <tbody>
        <tr>
          <th></th>
          <td>
            <StImgCont>
              <img src="/images/icons/camera.svg" alt="camera-logo"/>
              <div className="guide msg">이미지 등록</div>
              <div className="msg">400x400 px</div>
            </StImgCont>
          </td>
        </tr>
        <tr>
          <th>이름</th>
          <td>
            <InputBox
              className="member-name"
              value={""}
              onChange={() => {}}
              
              type="text" 
              placeholder="이름을 입력해주세요"
              width={160}
              height={38}
              fSize={15}
              fWeight={'normal'}
            />
          </td>
        </tr>
        <tr className="margin-tr"></tr>
        <tr>
          <th>직책</th>
          <td>
          <InputBox
              cName="member-name"
              type="text" 
              placeholder="직책을 입력해주세요"
    
              width={160}
              height={38}
              fSize={15}
              fWeight={'normal'}
    
              value={""}
              changeVal={() => {}}
            />
          </td>
        </tr>
        <tr>
          <th></th>
          <td>
            <StBtn>구성원 등록</StBtn>
          </td>
        </tr>
      </tbody>
    </StCont>
  );
}
export default IntroMember;

const StCont = styled.table`
  display: inline-block;
  line-height: 100%;
  padding: 0 16px;

  tr.margin-tr {
    height: 8px;
  }

  th {
    vertical-align: middle;
    font-size: 18px;
    padding-right: 16px;
  }

  td {
    display: flex;
    justify-content: center;
  }
`;

const StImgCont = styled.div`
  cursor: pointer;

  width: 134px;
  height: 134px;
  background: #F9F8FA;
  border-radius: 50%;
  margin-bottom: 12px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 30px;
  }

  .msg {
    font-size: 11px;
    color: #898989;
  }
  .guide {
    margin: 8px 0;
    font-size: 13px;
  }
`;

const StBtn = styled.span`
  cursor: pointer;
  display: inline-block;
  width: 135px;
  line-height: 40px;
  background: #C3BDF4;
  border-radius: 5px;

  margin-top: 24px;

  color: white;
  font-size: 15px;
  font-weight: bold;

  text-align: center;
  vertical-align: middle;
`;