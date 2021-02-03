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
  const itemsPerPage = 1;
  const LIMIT = 1;

  useEffect(() => {
    getData();
  }, [page]);

  useEffect(() => {
    getLength();
  }, []);

  const getData = () => {
    axios
      .get(
        `http://10.0.1.44:3000/companies/list/partner?offset=${page}&limit=${LIMIT}`
      )
      .then((res) => {
        setPartnerList(res.data.companies);
        setTotalLength(res.data.num);
      });
  };

  const getLength = () => {
    axios.get(`http://10.0.1.44:3000/companies/list/partner`).then((res) => {
      setTotalLength(res.data.companies.length);
    });
  };

  const handleClickPage = (event: any, value: any) => {
    setPage(value);
  };

  console.log(partnerList);

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
