import React from "react";
import styled from "styled-components";

const Labels = ({ label, detailName }: any) => {
  return (
    <LabelWrapper className={detailName}>
      {label.map((category: string, idx: any) => {
        return (
          <span key={idx} className={detailName}>
            {category}
          </span>
        );
      })}
    </LabelWrapper>
  );
};

export default Labels;

const LabelWrapper = styled.div`
  width: 100%;
  padding-bottom: 0.625rem;
  display: flex;
  flex-wrap: wrap;

  &.detailLabels {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  span {
    margin: 0.3rem 0.6rem 0.3rem 0;
    height: 1.4rem;
    display: inline-block;
    border: 1px solid #c3bdf4;
    padding: 0.3rem 0.375rem;
    color: #c3bdf4;
    font-size: 0.688rem;

    &.detailLabels {
      margin: 0 0.25rem 0.5rem 0;
    }
  }
`;
