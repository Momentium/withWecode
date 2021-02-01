import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const MoveBar = ({ data }: any) => {
  const [prevPage, setPrevPage] = useState("");
  const [currPage, setCurrPage] = useState<boolean>();

  console.log(data);

  useEffect(() => {
    if (window.location.pathname.includes("/partner")) {
      setPrevPage("지원/투자 파트너스");
      setCurrPage(false);
    } else {
      setPrevPage("스타트업");
      setCurrPage(true);
    }
  }, []);

  return (
    <InformationCompany>
      {currPage ? (
        <>
          <Link to="/">홈 &nbsp;</Link>
          &gt; &nbsp;
          <Link to="/list">스타트업 &nbsp;</Link>
          &gt; &nbsp;{data?.name}
        </>
      ) : (
        <>
          <Link to="/">홈 &nbsp;</Link>
          &gt; &nbsp;
          <Link to="/partner">지원/투자 파트너스 &nbsp;</Link>
          &gt; &nbsp;{data?.name}
        </>
      )}
    </InformationCompany>
  );
};

export default MoveBar;

const InformationCompany = styled.div`
  margin-top: 2.5rem;
  margin-bottom: 4rem;
`;
