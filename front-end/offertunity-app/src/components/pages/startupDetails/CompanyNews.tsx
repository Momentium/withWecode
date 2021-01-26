import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import News from "../../common/detail/news/News";

const CompanyNews = ({ data }: any) => {
  return <News data={data} />;
};

export default CompanyNews;
