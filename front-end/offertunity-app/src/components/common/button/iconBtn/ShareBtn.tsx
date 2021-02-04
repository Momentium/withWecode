import styled from 'styled-components';
import { ShareSvg, UnShareSvg} from 'assets/icons/ShareSvg';

const ShareBtn = () => {
  return (
    <StBtnWrap>
      <div style={{position:"relative"}}>
        <UnShareSvg/>
        <div className="abs" style={{position:"absolute", top: 0}}>
          <ShareSvg/>
        </div>
      </div>
    </StBtnWrap>
  )
};
export default ShareBtn;

const StBtnWrap = styled.div`
  * {
    display: flex;
  }

  svg {
    width: 30px;
    height: 30px;
  }

  .abs > svg {
    opacity: 0;
  }

  &:hover {
    cursor: pointer;
    .abs > svg {
      animation: fadeIn 0.3s forwards;
    }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to{ opacity: 1; }
  }
`;