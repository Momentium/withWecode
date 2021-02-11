import styled, { css } from "styled-components";

interface Props {
  width: number;
  height: number;
  backColor: string;
  fSize: number;
  fWeight: string;
}

const BasicBtn: React.FC<any> = ({
  width,
  height,
  backColor,
  fSize,
  fWeight,
  txt,
  click,
}) => {
  return (
    <StBtn
      width={width}
      height={height}
      backColor={backColor}
      fSize={fSize}
      fWeight={fWeight}
      onClick={click}
    >
      {txt}
    </StBtn>
  );
};
export default BasicBtn;

const StBtn = styled.span<Props>`
  cursor: pointer;
  user-select: none;
  display: inline-block;

  border-radius: 5px;
  text-align: center;
  vertical-align: middle;

  width: ${(props) => `${props.width}px`};
  line-height: ${(props) => `${props.height - 2}px`};

  ${(props) =>
    props.backColor === "white"
      ? css`
          background: white;
          color: #5541ed;
          border: 1px solid #5541ee;
        `
      : css`
          background: #5541ed;
          color: white;
          border: 1px solid #5541ed;
        `}

  font-size: ${(props) => `${props.fSize}px`};
  font-weight: ${(props) => props.fWeight};
`;
