
import styled, { css } from 'styled-components';
import LikeBtn from 'components/common/button/iconBtn/LikeBtn';
import ShareBtn from 'components/common/button/iconBtn/ShareBtn';

const IconBtns:React.FC<any> = ({ page, like, clickLike }) => {
  return (
    <StBtnCont page={page}>
      <LikeBtn isLike={like} clickLike={clickLike}/>
      <ShareBtn/>
    </StBtnCont>
  );
};
export default IconBtns;

const StBtnCont = styled.div<{page: string}>`
  ${ props => props.page === 'list' &&
    css`
      flex: 3;
    `
  }

  display: flex;
  justify-content: flex-end;
  align-items: center;

  ${ props => props.page === 'list' ?
    css`
      & > div {
        margin-left: 24px;
      }
    `
    :
    css`
      & > div:first-child {
        margin-left: 40px;
      }
      & > div:last-child {
        margin-left: 32px;
      }
    `
  }

  
`;