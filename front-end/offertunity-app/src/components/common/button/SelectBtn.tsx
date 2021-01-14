import React, { useState, useEffect } from 'react';
import SelectBtnPrsnt from './SelectBtnPrsnt';
import axios from 'axios';

interface Props {
  category: string;
}

const SelectBtn:React.FC<Props> = ({ category }) => {
  const [selectList, setSelectList] = useState<string[]>([]);
  const [selected, setSelected] = useState<string>("");

  useEffect(() => {
   axios.get('data/')
   .then(() => {
     setSelectList();
   }) 
  });

  return (
    <SelectBtnPrsnt value={""}/>
  );
};
export default SelectBtn;


