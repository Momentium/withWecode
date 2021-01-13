import React, { MouseEvent, useEffect, useState } from 'react'
import styled from 'styled-components'
import Title from './Title'
import Tabs from './Tabs'
import Cards from './Cards'

const Selection = () => {
  const [companyData, setCompanyData] = useState<any[]>([])

  useEffect(() => {
    selectionData()
  }, [])

  const selectionData = () => {
    fetch('/data/selection.json')
      .then((res) => res.json())
      .then((res) => setCompanyData(res.platform))
  }

  const clickHandler = () => {
    console.log('hello')
  }

  return (
    <Selections>
      <Title title={'스타트업 셀렉션'} />
      <Tabs clickHandler={clickHandler} />
      <>
        {companyData &&
          companyData.map((el: any, idx: number) => (
            <Cards data={el} key={idx} />
          ))}
      </>
    </Selections>
  )
}

export default Selection

const Selections = styled.section`
  ${({ theme }) => theme.ConWidth}
`
