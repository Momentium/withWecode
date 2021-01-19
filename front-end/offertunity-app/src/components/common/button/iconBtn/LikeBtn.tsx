import React, { useState, } from 'react';
import styled, { css } from 'styled-components';
import { LikeSvg, UnLikeSvg } from 'assets/icons/LikeSvg';

interface Props {
  isLike: boolean;
  clickLike: (e: React.MouseEvent<HTMLDivElement> ) => void;
}

const LikeBtn:React.FC<Props> = ({ isLike, clickLike }) => {
  const [prevLike, setPrevLike] = useState<boolean>(isLike);
  const handleMout = () => {
    setPrevLike(!isLike);
  }

  return (
    <StBtnWrap isLike={isLike} prevLike={prevLike} onClick={clickLike} onMouseOut={handleMout}>
      {
        isLike ?
        <LikeSvg/>
        :
        <div style={{position:"relative"}}>
          <UnLikeSvg/>
          <div className="abs" style={{position:"absolute", top: 0}}>
            <LikeSvg/>
          </div>
        </div>
      }
    </StBtnWrap>
  )
};
export default LikeBtn;

const StBtnWrap = styled.div<{isLike: boolean, prevLike: boolean}>`
  svg {
    width: 32px;
    height: 32px;
  }
  .abs > svg {
    opacity: 0;
  }

  &:hover {
    cursor: pointer;
    .abs > svg {
      ${props => ((!props.isLike) && (props.isLike !== props.prevLike)) && css`animation: fadeIn 0.3s forwards;`};
    }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to{ opacity: 1; }
  }

`;