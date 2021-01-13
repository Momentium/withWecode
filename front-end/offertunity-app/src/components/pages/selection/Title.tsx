import React from 'react'
import styled from 'styled-components'

interface Props {
  title: string
}

const Title: React.FC<Props> = ({ title }) => {
  return <SectionTitle>{title}</SectionTitle>
}

export default Title

const SectionTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.titleSize};
`
