import React from "react";
import styled from "styled-components";

const Title = ({ title }: any) => {
  return <SectionTitle>{title}</SectionTitle>;
};

export default Title;

const SectionTitle = styled.div`
  width: 100%;
  margin-bottom: 1.125rem;
  font-size: 1.25rem;
  font-weight: bold;
`;
