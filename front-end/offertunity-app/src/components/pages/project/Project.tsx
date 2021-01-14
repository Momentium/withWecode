import React from 'react';
import styled from 'styled-components';

interface Props {
  el: {}
}

const Project:React.FC<Props> = ({el}) => {
  return (
    <StPjtWrap>

    </StPjtWrap>
  );
};
export default Project;

const StPjtWrap = styled.div`
  width: 100%;
  border: 2px solid green;
`;