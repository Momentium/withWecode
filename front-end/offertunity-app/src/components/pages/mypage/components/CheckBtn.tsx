import React from "react";
import styled from "styled-components";

type Props = {
  data: any;
  key: number;
  index: number;
};

const CheckBtn: React.FC<Props> = ({ data, key, index }) => {
  console.log(data.name);
  const { name, check } = data;
  return (
    <Btn key={index}>
      <i className="far fa-circle" />
      {name}
    </Btn>
  );
};

export default CheckBtn;

const Btn = styled.div`
  position: relative;
  display: inline-block;
  width: 15.5rem;
  height: 3rem;
  line-height: 3rem;
  font-size: 0.9rem;
  border-radius: 2rem;
  border: 1px solid #c2bdf0;
  text-align: center;
  margin: 0 9.8rem 1.5rem 0;
  i {
    position: absolute;
    top: 0.7rem;
    left: 1rem;
    color: #c2bdf0;
    font-size: 1.5rem;
  }
  &:nth-child(3n) {
    margin-right: 0;
  }
`;
