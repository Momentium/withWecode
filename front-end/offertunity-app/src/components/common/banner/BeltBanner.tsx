import styled from "styled-components";

interface Props {
  curPage: string;
}

const BeltBanner: React.FC<Props> = ({ curPage }) => {
  return (
    <StBBCont>
      <img src={`/images/${curPage}/beltBanner.png`} alt="" />
    </StBBCont>
  );
};
export default BeltBanner;

const StBBCont = styled.div`
  width: 100%;
  height: 240px;
  margin: 120px 0;

  display: flex;
  justify-content: center;
  overflow: hidden;

  img {
    width: auto;
    height: 100%;
  }
`;
