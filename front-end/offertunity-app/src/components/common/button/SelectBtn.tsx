import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import SelectBtnPrsnt from "./SelectBtnPrsnt";
import SelectItem from "./SelectItem";

interface Props {
  curPage: string;
  category: string;
}

const SelectBtn: React.FC<Props> = ({ curPage, category, }) => {
  // const [selectList, setSelectList] = useState<string[]>([]);
  // let _selectList: string[];
  const [selected, setSelected] = useState<string|null>("");
  const [compList, setCompList] = useState<any[]>([]);

  useEffect(() => {
    axios.get("data/selectData.json").then((res) => {
      console.log(selected)
      const _data = res.data[curPage];
      const _selectList = _data[category];

      setSelected(selected === "" ? _selectList[0] : selected);
      setCompList(_selectList.map((el: string, idx: number) => 
        el !== selected &&
        <SelectItem key={idx}
          value={el}
          changeSelect={changeSelect}
        />  
      ));
    });
  }, [selected]);

  const changeSelect = (e: React.MouseEvent<HTMLElement>) => {
    // console.log(e.currentTarget.textContent)
    setSelected(e.currentTarget.textContent);
  }
  
  const [popList, setPopList] = useState<boolean>(false);

  const popSelectList = () => {
    setPopList(!popList);
  }

  return (
    <>
      <SelectBtnPrsnt 
        popList={popList} 
        popSelectList={popSelectList}
        value={selected}
        compList={compList}
      />
    </>
  );
};
export default SelectBtn;