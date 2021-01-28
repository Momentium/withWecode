import styled from 'styled-components';
import AutoSlider from './bannerUI'


const InvestList = () => {
  return (
    <StSlideCont>
      <AutoSlider />  
    </StSlideCont>
  )
};

export default InvestList;

const StSlideCont = styled.div`
  margin-bottom: 7.5rem;
`;