import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

interface Props {
  txt: string;
  toLink: string;
}

const MoreBtn: React.FC<Props> = ({ txt, toLink }) => {
  return (
    <StBtnWrap
      to={toLink}
      isNewsLetter={!txt.includes("더")}
      flexDir={txt === "더보기"}
    >
      <div className="txt">{txt}</div>
      {txt.includes("더") ? (
        <img
          className="arrow"
          src="/images/icons/more-arrow.svg"
          alt="more-arrow"
        />
      ) : (
        <img
          className="arrow"
          src="/images/icons/long-arrow.svg"
          alt="long-arrow"
        />
      )}
    </StBtnWrap>
  );
};

export default MoreBtn;

const StBtnWrap = styled(Link)<{ flexDir: boolean; isNewsLetter: boolean }>`
  display: flex;
  ${(props) =>
    props.flexDir
      ? css`
          flex-direction: column;
        `
      : css`
          align-items: baseline;
          align-self: flex-end;
        `};

  cursor: pointer;

  .txt {
    font-size: 0.8rem;
    font-weight: normal;
  }

  .arrow {
    ${(props) =>
      props.isNewsLetter
        ? css`
            width: 14.38rem;
          `
        : css`
            width: 5rem;
            margin-left: ${props.flexDir ? 0 : "1.625rem"};
          `}
  }
`;
