import React from "react";
import styled from "styled-components";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";

const Footer = () => {
  return (
    <FooterSection>
      <div className="left">
        <div className="top">
          <span className="companyTitle">
            <span className="point">OFFER</span>TUNITY
          </span>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span>MOMENTIUM</span>
        </div>
        <div className="bottom">
          <span className="info">
            대표이사 백양제 조원선 | 사업자번호 654-87-01239 |
            help@momentium.co.kr
          </span>
          <span className="info">
            서울특별시 강남구 강남대로 327 대륭서초타워 16층
          </span>
        </div>
        <div></div>
      </div>
      <div className="right">
        <InstagramIcon fontSize="large" />
        <FacebookIcon fontSize="large" />
      </div>
    </FooterSection>
  );
};

export default Footer;

const FooterSection = styled.footer`
  display: flex;
  justify-content: space-between;
  ${({ theme }) => theme.conWidth}
  padding-top: 4.563rem;
  height: 14.438rem;

  .left {
    .top {
      span {
        font-size: 1.25rem;
        font-weight: bold;
      }

      .point {
        color: #5541ed;
      }
    }

    .bottom {
      display: flex;
      flex-direction: column;
      .info {
        display: inline-block;
        font-size: 0.688rem;

        &:first-child {
          margin-top: 1.563rem;
          margin-bottom: 0.938rem;
        }
      }
    }
  }

  .right {
    svg {
      margin-right: 1.438rem;
      cursor: pointer;
    }
  }
`;
