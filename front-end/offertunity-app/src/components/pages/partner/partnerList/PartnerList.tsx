import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Title from "../../../common/title/Title";
import Card from "./components/Card";
import PaginationCmp from "../../../common/pagination/PaginationCmp";
import axios from "axios";

const PartnerList = () => {
  const [partnerList, setPartnerList] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalLength, setTotalLength] = useState(0);
  const itemsPerPage = 12;

  useEffect(() => {
    const LIMIT = 12;
    axios
      .get(
        `${process.env.REACT_APP_URL}/companies/list/partner?offset=${page}&limit=${LIMIT}`
      )
      .then((res) => {
        setPartnerList(res.data.companies);
        setTotalLength(res.data.num);
      });
  }, [page]);

  const handleClickPage = (event: any, value: any) => {
    setPage(value);
  };

  return (
    <PartnerListCon>
      <Title title={"투자 파트너스"} />
      <PartnerCompanyList dataLength={partnerList.length}>
        <Card data={partnerList} />
      </PartnerCompanyList>
      <PaginationBox>
        <PaginationCmp
          onChange={handleClickPage}
          listLength={partnerList.length}
          page={page}
          itemsPerPage={itemsPerPage}
          totalLength={totalLength}
          currPage={"partner"}
        />
      </PaginationBox>
    </PartnerListCon>
  );
};

export default PartnerList;

const PartnerListCon = styled.section`
  ${({ theme }) => theme.conWidth}
`;

const PartnerCompanyList = styled.div<{ dataLength: number }>`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  ${(props) => css`
    grid-template-rows: repeat(1fr, props.dataLength % 3);
  `}

  column-gap: 10rem;
  row-gap: 2rem;
  width: 100%;
  height: 100%;
  margin-top: 3.5rem;
  overflow: hidden;
`;

const PaginationBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
