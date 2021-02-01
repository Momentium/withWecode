import styled from 'styled-components';

export const FlexDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FlexColDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Section = styled.div`
  ${({ theme }) => theme.conWidth}
`;

export const SectionTitle = styled.h1`
  margin-bottom: 8px;
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.titleSize};
`;

export const Tag = styled.div`
  margin-right:0.37rem;
  padding:0.3rem;
  font-size:0.68rem;
  color: #C3BDF4;
  border: 1px solid #C3BDF4;
`;