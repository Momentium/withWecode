import React from "react";
import styled from "styled-components";

type Props = {
  success: any;
};

const ProgressBar: React.FC<Props> = ({ success }) => {
  return (
    <Wrap>
      <Percentage>
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </Percentage>
      <Bar>
        <span style={{ width: `${success}%` }}></span>
      </Bar>
    </Wrap>
  );
};

export default ProgressBar;

const Wrap = styled.div`
  margin-top: 4rem;
`;

const Percentage = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Bar = styled.div`
  width: 100%;
  height: 0.875rem;
  background: #fbfaff 0% 0% no-repeat padding-box;
  border-radius: 0.5rem;
  span {
    display: inline-block;
    height: 100%;
    background: transparent linear-gradient(90deg, #c2bdf0 0%, #5541ed 100%) 0%
      0% no-repeat padding-box;
    border-radius: 0.5rem;
  }
`;
