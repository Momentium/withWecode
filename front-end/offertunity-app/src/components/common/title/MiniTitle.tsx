import React from "react";
import styled from "styled-components";

interface Props {
  title: string;
}

const MiniTitle: React.FC<Props> = ({ title }) => {
  return <SectionTitle>{title}</SectionTitle>;
};

export default MiniTitle;

const SectionTitle = styled.h1`
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.base};
`;
