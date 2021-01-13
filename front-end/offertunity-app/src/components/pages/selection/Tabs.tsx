import React, { FunctionComponent, MouseEvent } from 'react'

const CATEGORY_ARR = [
  '플랫폼',
  '마감임박',
  'IR자료 업로드',
  '예비창업자',
  '개발자구함',
]

interface Props {
  clickHandler: () => void
}

const Tabs: React.FC<Props> = (props) => {
  return (
    <>
      {CATEGORY_ARR.map((category, idx) => {
        return (
          <li key={idx} onClick={props.clickHandler}>
            {category}
          </li>
        )
      })}
    </>
  )
}
export default Tabs
