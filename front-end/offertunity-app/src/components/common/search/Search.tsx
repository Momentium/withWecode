import React, { useRef } from "react";
import styled from "styled-components";

const Search = ({ onKeyPress, onChange }: any) => (
  <SearchBox>
    <input type="text" onKeyPress={onKeyPress} onChange={onChange} />
    <i className="fas fa-search" />
  </SearchBox>
);

export default Search;

const SearchBox = styled.div`
  display: inline-block;
  position: relative;
  margin-right: 10px;

  input {
    width: 11.75rem;
    height: 2rem;
    border-radius: 5px;
    border: 1px solid #d8d8d8;
    box-sizing: border-box;
    padding: 4px 6px 4px 30px;
    /* &:focus {
      outline: none;
    } */
  }

  i {
    position: absolute;
    top: 0.5rem;
    left: 0.62rem;
    color: #707070;
  }
`;
