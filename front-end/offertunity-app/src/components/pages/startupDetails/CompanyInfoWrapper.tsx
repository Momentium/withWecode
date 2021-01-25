import React from "react";
import styled from "styled-components";

const CompanyInfoWrapper = ({ info }: any) => {
  return (
    <Wrapper>
      <span>{info}</span>
    </Wrapper>
  );
};

export default CompanyInfoWrapper;

const Wrapper = styled.div`
  display: flex;
`;
