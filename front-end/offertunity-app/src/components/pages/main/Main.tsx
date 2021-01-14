import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Banner from '../banner/Banner'
import Selection from '../selection/Selection'
import ProjectSection from '../projectSection/ProjectSection'


const Main = () => {
  return (
    <StMainCont>
      <div className="banner-cont">
        <Banner />
      </div>
      <div className='projects-cont'>
      <ProjectSection />
        <div className='progress'></div>
        <div className='new'></div>
      </div>
      <div className='projects-banner'></div>
      <div className='invest-cont'></div>
      <div className='startup-cont'>
        <Selection />
      </div>
      <div className='newsletter-cont'></div>
    </StMainCont>
  )
}
export default Main

const StMainCont = styled.div``
