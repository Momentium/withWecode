import styled from "styled-components";

const CheckBtn: React.FC<any> = ({ _id, label, checked, click }) => {
  return (
    <StBtnCont>
      <input
        id={_id}
        type="checkbox"
        value={label}
        checked={checked}
        onClick={click}
      />
      <label htmlFor={_id}>
        <div></div>
      </label>
      {label}
    </StBtnCont>
  );
};
export default CheckBtn;

const StBtnCont = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  margin-bottom: 24px;

  input {
    display: none;
  }

  input[type=${"checkbox"}] + label {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    border: solid 1px #c2bdf0;
    border-radius: 50%;
    background-color: white;
    width: 20px;
    height: 20px;
    margin-right: 16px;

    div {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: white;
    }
  }

  input[type=${"checkbox"}]:checked + label {
    div {
      background-color: #5541ed;
    }
  }
`;
