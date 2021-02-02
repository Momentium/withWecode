import styled from 'styled-components';

const Necessary:React.FC<any> = ({ mode }) => {
  return (
    <StMsgWrap>
      * {!mode && `은`} 필수 입력 정보입니다.
    </StMsgWrap>
  )
}
export default Necessary;

const StMsgWrap = styled.span`
  color: red;
  font-size: 13px;
  font-weight: normal;
`;