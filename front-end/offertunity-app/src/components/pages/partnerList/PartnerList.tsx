import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Title from "../../common/title/Title";
import Card from "./components/Card";
import PaginationCmp from "../../common/pagination/PaginationCmp";
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
        `http://localhost:3001/data/partnerData/offset=${page}&limit=${LIMIT}.json`
      )
      .then((res) => {
        setPartnerList(res.data.data);
        setTotalLength(res.data.data.length);
      });
  }, [page]);

  const handleClickPage = (event: any, value: any) => {
    setPage(value);
  };

  return (
    <PartnerListCon>
      <Title title={"투자 파트너스"} />
      <PartnerCompanyList>
        <Card data={partnerList} />
      </PartnerCompanyList>
      <PaginationBox>
        <PaginationCmp
          onChange={handleClickPage}
          listLength={partnerList.length}
          page={page}
          itemsPerPage={itemsPerPage}
          totalLength={totalLength}
        />
      </PaginationBox>
    </PartnerListCon>
  );
};

export default PartnerList;

const PartnerListCon = styled.section`
  ${({ theme }) => theme.conWidth}
`;

const PartnerCompanyList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
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
