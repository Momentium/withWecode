import styled from 'styled-components';
import DocCardList from './DocCardList';

const AdminDoc = () => {
  return (
    <>
      <DocCardList mode={"ir"} label={"IR 자료"}/>
      <StMargin/>
      <DocCardList mode={"plan"} label={"사업계획서"}/>
      <StMargin/>
      <DocCardList mode={"etc"} label={"기타서류"}/>
    </>
  );
};

export default AdminDoc;

const StMargin = styled.div`
  width: 100%;
  height: 120px;
`;
