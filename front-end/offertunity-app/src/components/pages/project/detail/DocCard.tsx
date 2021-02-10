import styled, { css } from "styled-components";
import { Check } from "@material-ui/icons";

const DocCard: React.FC<any> = ({ data, isCheck, idx, handleCheck }) => {
  const selectFile = () => {
    if(isCheck) {
      handleCheck(-1);
    }
    else {
      handleCheck(idx)
    }
  };

  return (
    <div className="card-wrap">
      <StCont className="data-cont" isCheck={isCheck}>
        <div
          className="check-cont"
        >
          {
            isCheck && <Check />
          }
        </div>
        {data.name}
        <div className="btn-cont">
          <StBtn onClick={selectFile} isCheck={isCheck}>{isCheck ? "해제" : "선택"}</StBtn>
        </div>
      </StCont>
    </div>
  );
};

export default DocCard;

const StCont = styled.div<any>`
  word-break: break-all;

  font-size: 21px;
  padding: 30px;

  position: relative;

  color: black;
  background-color: white;
 
  &, * {
    transition: all 0.1s linear;
  }

  .check-cont {
    position: absolute;
    top: 8px;
    right: 8px;

    color: #5541ed;

    ${
      props => props.isCheck ?
      css`
        
        opacity: 1;
      `
      :
      css`
        opacity: 0;
      `
    };
  }

  .btn-cont {
    display: flex;
    justify-content: space-evenly;
    width: 100%;

    height: 0px;
    overflow: hidden;
  }

  :hover {
    color: white;
    
    ${
      props => props.isCheck ?
      css`
        background-color: #5541ed;
      `
      :
      css`
        background-color: gray;
      `
    };

    .btn-cont {
      height: auto;
      margin-top: 24px;
    }

    .check-cont {
      color: white;
    }
  }
`;

const StBtn = styled.div<any>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 77px;
  height: 32px;

  font-size: 13px;

  border: 1px solid #c2bdf0;
  border-radius: 20px;

  ${
    props => props.isCheck ?
    css`
      color: white;
      background: #C3BDF4;
      
    `
    :
    css`
      color: #5541ed;
      background: white;
    `
  };
  

  &:hover {
    border-color: #5541ee;

    ${
        props => props.isCheck ?
        css`
          color: #5541ee;
          background: white;
          
        `
        :
        css`
          color: white; 
          background: #5541ed;
        `
      };
  }
`;
