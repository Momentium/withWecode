import React from "react";
import styled from "styled-components";

const InputForm = ({ txt, changeVal, className }: any) => {
  console.log(txt);
  return (
    <>
      <TextArea
        onChange={changeVal}
        value={txt}
        className={className}
        placeholder="텍스트를 작성해주세요"
      />
      <CurrText>{`${txt ? txt.length : 0} / 1000자`}</CurrText>
    </>
  );
};

export default InputForm;

const TextArea = styled.textarea`
  height: 19.5rem;
  border: 1px solid #d4d1d8;
  padding: 1.5rem;
  resize: none;

  /* &:focus {
    outline: none !important;
  } */
`;

const CurrText = styled.p`
  margin-top: 1rem;
  font-size: 1.125rem;
  text-align: right;
  color: #5b5b5b;
`;
