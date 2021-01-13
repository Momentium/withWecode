import React from 'react'
import styled from 'styled-components'

const Cards = ({ data }: any) => {
  const { title, image, logo, label } = data
  return (
    <>
      <CardContainer>
        <img src={image} />
        <p>{title}</p>
        {label.map((category: string) => {
          return <span>{category}</span>
        })}
      </CardContainer>
    </>
  )
}

export default Cards

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;

  span {
    display: inline-block;
    margin-right: 5px;
  }
`
