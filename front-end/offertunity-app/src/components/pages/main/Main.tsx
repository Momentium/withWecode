import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Selection from '../selection/Selection'
import InvestList from '../investList/InvestList'


const Main = () => {
  return (
    <StMainCont>
      <div className='projects-cont'>
        <div className='progress'></div>
        <div className='new'></div>
      </div>
      <div className='projects-banner'></div>
      <div className='invest-cont'>
        <InvestList />
      </div>
      <div className='startup-cont'>
        <Selection />
      </div>
      <div className='newsletter-cont'></div>
    </StMainCont>
  )
}
export default Main


const StMainCont = styled.div`
  color: black;
`;
