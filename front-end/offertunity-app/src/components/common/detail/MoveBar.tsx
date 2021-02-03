import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const MoveBar = ({ data }: any) => {
  const [prevUrl, setPrevUrl] = useState("");
  const [prevPage, setPrevPage] = useState("");

  useEffect(() => {
    if (window.location.pathname.includes("/partner")) {
      setPrevPage("지원/투자 파트너스");
      setPrevUrl("/partner");
    } else if (window.location.pathname.includes("/startup")) {
      setPrevPage("스타트업");
      setPrevUrl("/startup");
    } else if (window.location.pathname.includes("/project")) {
      setPrevPage("지원사업");
      setPrevUrl("/project");
    }
  }, []);

  return (
    <InformationCompany>
      {prevPage && (
        <>
          <Link to="/">홈 &nbsp;</Link>
          &gt; &nbsp;
          <Link to={prevUrl}>{prevPage} &nbsp;</Link>
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
