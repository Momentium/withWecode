import styled  from "styled-components";

const InputBox:React.FC<any> = ( {cName, type, placeholder, width, height, fSize, fWeight, value, changeVal} ) => {
  return (
    <StInputBox 
      // className={cName}
      type={type}
      placeholder={placeholder}
      width={width}
      height={height}
      fSize={fSize}
      fWeight={fWeight}
      // value={value}
      // onChange={changeVal}
    />
  );
};
export default InputBox;

const StInputBox = styled.input<{width:number, height:number, fSize:number, fWeight:string} >`
  display: inline-block;

  width: ${props => `${props.width}px`};
  line-height: ${props => `${props.height - 2}px`};
  font-size: ${props => `${props.fSize}px`};
  font-weight: ${props => `${props.fWeight}px`};

  box-sizing: border-box;
  vertical-align: center;

  padding: 0 15px;
  border: 1px solid #D8D8D8;
  border-radius:6px;

  &::placeholder{
    color:#D8D8D8;
  }  
`;