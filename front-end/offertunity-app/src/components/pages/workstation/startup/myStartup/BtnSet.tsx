import styled from 'styled-components';
import BasicBtn from 'components/common/button/BasicBtn';

const BtnSet = () => {
  return (
    <StCont>
      <BasicBtn
        width={275}
        height={56}
        backColor={"white"}
        fSize={18}
        fWeight={"bold"}
        txt={"미리보기"}
      />

      <BasicBtn
        width={275}
        height={56}
        backColor={"white"}
        fSize={18}
        fWeight={"bold"}
        txt={"임시저장"}
      />

      <BasicBtn
        width={275}
        height={56}
        fSize={18}
        fWeight={"bold"}
        txt={"저장하기"}
      />
    </StCont>
  );
};
export default BtnSet;

const StCont = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;